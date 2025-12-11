import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: 'text' | 'password' | 'email';
  placeholder: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`bg-(--color-custom-gray-50) h-11 rounded-(--radius-small) font-medium text-[16px] leading-5 focus:outline-none placeholder:text-(--color-custom-gray-300) px-(--spacing-16) py-(--spacing-12) ${
          className || ''
        }`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
