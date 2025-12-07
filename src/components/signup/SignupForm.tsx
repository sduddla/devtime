'use client';

import Button from '../common/Button';
import Input from '../common/Input';
import { useState } from 'react';
import DuplicateCheckField from './DuplicateCheckField';
import TermsSection from './TermsSection';
import {
  SignupFormErrors,
  validateEmail,
  validateNickname,
  validatePassword,
  validateConfirmPassword,
} from '@/libs/validation';
import { checkEmail, checkNickname, signup } from '@/libs/api/auth';
import { CheckEmailResponse, CheckNicknameResponse } from '@/types/auth';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    agreement: false,
  });
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState('');

  const handleDuplicateCheck = async <
    T extends CheckEmailResponse | CheckNicknameResponse
  >(
    checkFn: () => Promise<{ data: T }>,
    successMessage: string,
    defaultErrorMessage: string,
    field: 'email' | 'nickname',
    setChecked: (value: boolean) => void,
    setMessage: (value: string) => void
  ) => {
    try {
      const response = await checkFn();
      const data = response.data;

      if (data.success && data.available) {
        setChecked(true);
        setMessage(successMessage);
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      } else {
        setChecked(false);
        const errorMessage = data.message || defaultErrorMessage;
        setMessage(errorMessage);
        setErrors((prev) => ({ ...prev, [field]: errorMessage }));
      }
    } catch (error) {
      setChecked(false);
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || '중복 확인 중 오류가 발생했습니다.'
          : defaultErrorMessage;
      setMessage(errorMessage);
      setErrors((prev) => ({ ...prev, [field]: errorMessage }));
      console.error(error);
    }
  };

  const resetDuplicateCheck = (field: 'email' | 'nickname') => {
    if (field === 'email') {
      setEmailChecked(false);
      setEmailCheckMessage('');
    } else {
      setNicknameChecked(false);
      setNicknameCheckMessage('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const validationMap: Record<string, (value: string) => string | null> = {
      email: validateEmail,
      nickname: validateNickname,
      password: validatePassword,
    };

    const validator = validationMap[name];
    if (validator) {
      const error = validator(value);
      setErrors((prev) => ({ ...prev, [name]: error || undefined }));
    }

    if (name === 'email' || name === 'nickname') {
      resetDuplicateCheck(name);
    }

    if (name === 'confirmPassword') {
      const error = validateConfirmPassword(formData.password, value);
      setErrors((prev) => ({
        ...prev,
        confirmPassword: error || undefined,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email' || name === 'nickname') {
      const isChecked = name === 'email' ? emailChecked : nicknameChecked;
      // 값 있고, 유효성 통과 했는데, 중복 확인 하지 않은 경우
      if (value && !errors[name as 'email' | 'nickname'] && !isChecked) {
        setErrors((prev) => ({
          ...prev,
          [name]: '중복을 확인해 주세요.',
        }));
      }
    }
  };

  const handleCheckEmail = async () => {
    handleDuplicateCheck(
      () => checkEmail(formData.email),
      '사용 가능한 이메일입니다.',
      '이미 사용 중인 이메일입니다.',
      'email',
      setEmailChecked,
      setEmailCheckMessage
    );
  };

  const handleCheckNickname = async () => {
    handleDuplicateCheck(
      () => checkNickname(formData.nickname),
      '사용 가능한 닉네임입니다.',
      '이미 사용 중인 닉네임입니다.',
      'nickname',
      setNicknameChecked,
      setNicknameCheckMessage
    );
  };

  const handleAgreementChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreement: checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await signup(
        formData.email,
        formData.nickname,
        formData.password,
        formData.confirmPassword
      );

      if (response.data.success) {
        router.replace('/login');
      } else {
        const errorMessage = response.data.error?.message;
        console.log(errorMessage);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('회원가입 실패:', error.response?.data);
      } else {
        console.error('알 수 없는 오류:', error);
      }
    }
  };

  const isFormValid =
    formData.email &&
    !errors.email &&
    emailChecked &&
    formData.nickname &&
    !errors.nickname &&
    nicknameChecked &&
    formData.password &&
    !errors.password &&
    formData.confirmPassword &&
    !errors.confirmPassword &&
    formData.agreement;

  return (
    <form className='flex flex-col' onSubmit={handleSubmit}>
      <DuplicateCheckField
        label='아이디'
        name='email'
        value={formData.email}
        error={errors.email}
        checked={emailChecked}
        checkMessage={emailCheckMessage}
        placeholder='이메일 주소 형식으로 입력해 주세요.'
        autoComplete='email'
        onChange={handleChange}
        onBlur={handleBlur}
        onCheck={handleCheckEmail}
      />

      <DuplicateCheckField
        label='닉네임'
        name='nickname'
        value={formData.nickname}
        error={errors.nickname}
        checked={nicknameChecked}
        checkMessage={nicknameCheckMessage}
        placeholder='닉네임을 입력해 주세요.'
        autoComplete='nickname'
        onChange={handleChange}
        onBlur={handleBlur}
        onCheck={handleCheckNickname}
      />

      {/* 비밀번호 */}
      <div className='flex flex-col gap-(--spacing-8)'>
        <label
          htmlFor='password'
          className='font-medium text-[14px] leading-[18px] text-(--color-custom-gray-600)'
        >
          비밀번호
        </label>
        <div className='flex flex-col'>
          <Input
            id='password'
            name='password'
            type='password'
            placeholder='비밀번호를 입력해 주세요.'
            className={`w-[420px] ${
              errors.password
                ? 'border border-(--color-secondary-negative)'
                : ''
            }`}
            value={formData.password}
            onChange={handleChange}
            autoComplete='new-password'
          />
          <div className='h-[16px] mt-(--spacing-8) mb-(--spacing-16)'>
            {errors.password && (
              <span className='text-(--color-secondary-negative) text-[12px] leading-[16px]'>
                {errors.password}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 비밀번호 확인 */}
      <div className='flex flex-col gap-(--spacing-8)'>
        <label
          htmlFor='password-confirm'
          className='font-medium text-[14px] leading-[18px] text-(--color-custom-gray-600)'
        >
          비밀번호 확인
        </label>
        <div className='flex flex-col'>
          <Input
            id='password-confirm'
            name='confirmPassword'
            type='password'
            placeholder='비밀번호를 다시 입력해 주세요.'
            className={`w-[420px] ${
              errors.confirmPassword
                ? 'border border-(--color-secondary-negative)'
                : ''
            }`}
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete='new-password'
          />
          <div className='h-[16px] mt-(--spacing-8) mb-(--spacing-36)'>
            {errors.confirmPassword && (
              <span className='text-(--color-secondary-negative) text-[12px] leading-[16px]'>
                {errors.confirmPassword}
              </span>
            )}
          </div>
        </div>
      </div>

      <TermsSection onAgreementChange={handleAgreementChange} />

      <Button
        type='submit'
        className={`w-full h-[48px] text-[18px] leading-[22px] font-semibold mb-(--spacing-24) ${
          isFormValid
            ? 'bg-(--color-primary-color1) text-white cursor-pointer'
            : 'bg-(--color-custom-gray-400) text-(--color-custom-gray-300) cursor-not-allowed'
        }`}
        disabled={!isFormValid}
      >
        회원가입
      </Button>

      <p className='flex justify-center items-center gap-(--spacing-12) text-[16px] leading-[20px] text-(--color-primary-color1)'>
        <span>회원이신가요?</span>
        <span className='font-bold cursor-pointer'>로그인 바로가기</span>
      </p>
    </form>
  );
}
