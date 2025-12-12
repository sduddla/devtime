'use client';

import Button from '../common/Button';
import Input from '../common/Input';
import {
  LoginFormErrors,
  validateEmail,
  validatePassword,
} from '@/libs/validation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/libs/api/auth';
import LoginModal from './LoginModal';
import DuplicateLoginModal from './DuplicateLoginModal';
import VerticalLogo from '@/assets/icons/vertical-logo.svg';

export default function LoginForm() {
  const router = useRouter();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDuplicateLoginModalOpen, setIsDuplicateLoginModalOpen] =
    useState(false);

  useEffect(() => {
    if (!isModalOpen && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isModalOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      return;
    }

    if (name === 'email') {
      const error = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: error || undefined }));
    } else if (name === 'password') {
      const error = validatePassword(value);
      setErrors((prev) => ({ ...prev, password: error || undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!value.trim()) {
      if (name === 'email') {
        setErrors((prev) => ({ ...prev, email: '이메일을 입력해 주세요.' }));
      } else if (name === 'password') {
        setErrors((prev) => ({
          ...prev,
          password: '비밀번호를 입력해 주세요.',
        }));
      }
    }
  };

  const isFormValid =
    formData.email && !errors.email && formData.password && !errors.password;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const response = await login(formData.email, formData.password);

      // console.log('로그인:', response.data);

      if (response.data.success) {
        const { isFirstLogin, isDuplicateLogin } = response.data;

        // 중복 로그인인 경우
        if (isDuplicateLogin) {
          setIsDuplicateLoginModalOpen(true);
          return;
        }

        // 중복 로그인이 아닌 경우
        if (isFirstLogin) {
          router.replace('/profile/setup');
        } else {
          router.replace('/');
        }
      } else {
        setIsModalOpen(true);
      }
    } catch {
      // console.error('로그인 실패:', error);
      setIsModalOpen(true);
    }
  };

  return (
    <div
      className='w-[500px] h-[598px] bg-white/50 rounded-[10px] px-[86px] pt-(--spacing-72) pb-(--spacing-64) flex flex-col items-center '
      style={{
        backdropFilter: 'blur(50px)',
        boxShadow: '0 40px 100px 40px rgba(3, 104, 255, 0.05)',
      }}
    >
      <div className='flex flex-col items-center mb-(--spacing-48)'>
        <VerticalLogo width={132} height={100} />
      </div>

      <form className='w-full flex flex-col' onSubmit={handleSubmit}>
        <div>
          <div className='flex flex-col gap-(--spacing-8)'>
            <label
              htmlFor='email'
              className='font-medium text-[14px] leading-[18px] text-(--color-custom-gray-600)'
            >
              아이디
            </label>
            <Input
              ref={emailInputRef}
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='이메일 주소를 입력해 주세요.'
              className={`w-full ${
                errors.email ? 'border border-(--color-secondary-negative)' : ''
              }`}
              autoComplete='email'
            />
          </div>
          <div className='h-4 mt-(--spacing-8) mb-(--spacing-12)'>
            {errors.email && (
              <span className='text-(--color-secondary-negative) text-[12px] leading-4'>
                {errors.email}
              </span>
            )}
          </div>
        </div>

        <div>
          <div className='flex flex-col gap-(--spacing-8)'>
            <label
              htmlFor='password'
              className='font-medium text-[14px] leading-[18px] text-(--color-custom-gray-600)'
            >
              비밀번호
            </label>
            <Input
              id='password'
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='비밀번호를 입력해 주세요.'
              className={`w-full ${
                errors.password
                  ? 'border border-(--color-secondary-negative)'
                  : ''
              }`}
              autoComplete='current-password'
            />
          </div>
          <div className='h-4 mt-(--spacing-8) mb-(--spacing-24)'>
            {errors.password && (
              <span className='text-(--color-secondary-negative) text-[12px] leading-4'>
                {errors.password}
              </span>
            )}
          </div>
        </div>

        <Button
          type='submit'
          className={`w-full h-12 text-white font-semibold text-[18px] leading-[22px] mb-(--spacing-24) ${
            isFormValid
              ? 'bg-(--color-primary-color1) cursor-pointer'
              : 'bg-(--color-custom-gray-400) cursor-not-allowed'
          }`}
          disabled={!isFormValid}
        >
          로그인
        </Button>
      </form>

      <Link
        href='/signup'
        className='text-(--color-primary-color1) font-medium text-[14px] leading-[18px]'
      >
        회원가입
      </Link>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DuplicateLoginModal
        isOpen={isDuplicateLoginModalOpen}
        onClose={() => {
          setIsDuplicateLoginModalOpen(false);
          router.replace('/');
        }}
      />
    </div>
  );
}
