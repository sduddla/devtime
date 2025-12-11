'use client';

import Button from '../common/Button';
import Input from '../common/Input';

interface DuplicateCheckFieldProps {
  label: string;
  name: 'email' | 'nickname';
  value: string;
  checked: boolean;
  checkMessage: string;
  placeholder: string;
  autoComplete: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheck: () => void;
  error?: string;
  inputWidth?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function DuplicateCheckField({
  label,
  name,
  value,
  checked,
  checkMessage,
  placeholder,
  autoComplete,
  onChange,
  onCheck,
  error,
  inputWidth = 'w-[324px]',
  onBlur,
}: DuplicateCheckFieldProps) {
  return (
    <div className='flex flex-col gap-(--spacing-8)'>
      <label
        htmlFor={name}
        className='font-medium text-[14px] leading-[18px] text-(--color-custom-gray-600)'
      >
        {label}
      </label>
      <div className='flex flex-col'>
        <div className='flex gap-(--spacing-12)'>
          <Input
            id={name}
            name={name}
            type={name === 'email' ? 'email' : 'text'}
            placeholder={placeholder}
            className={`${inputWidth} ${
              error ? 'border border-(--color-secondary-negative)' : ''
            }`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
          />
          <Button
            type='button'
            className={`bg-(--color-custom-gray-200) text-(--color-custom-gray-400) rounded-(--radius-small) px-(--spacing-16) py-[13px] text-[14px] leading-[18px] font-semibold cursor-not-allowed ${
              value && (error === '중복을 확인해 주세요.' || !error) && !checked
                ? 'bg-(--color-primary-color1)/10 text-(--color-primary-color1) cursor-pointer'
                : ''
            }`}
            onClick={onCheck}
            disabled={
              !value || (error && error !== '중복을 확인해 주세요.') || checked
            }
          >
            중복 확인
          </Button>
        </div>
        <div className='h-[16px] mt-(--spacing-8) mb-(--spacing-16)'>
          {error ? (
            <span className='text-(--color-secondary-negative) text-[12px] leading-[16px]'>
              {error}
            </span>
          ) : checked && checkMessage ? (
            <span className='text-(--color-secondary-positive) text-[12px] leading-[16px]'>
              {checkMessage}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
