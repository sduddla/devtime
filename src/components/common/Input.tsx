import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password' | 'email';
  placeholder: string;
  className?: string;
}

export default function Input({
  type,
  placeholder,
  className,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`bg-(--color-custom-gray-50) h-[44px] rounded-(--radius-small) font-medium text-[16px] leading-[20px] focus:outline-none placeholder:text-(--color-custom-gray-300) px-(--spacing-16) py-(--spacing-12) ${
        className || ''
      }`}
      {...props}
    />
  );
}
