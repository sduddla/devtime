'use client';

import { useState } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  placeholder: string;
}

export default function Select({ options, placeholder }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  return (
    <div className='relative w-[420px] h-[44px] rounded-(--radius-small) bg-(--color-custom-gray-50)'>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className='h-full flex items-center gap-(--spacing-8) pl-(--spacing-16) py-[10px] pr-(--spacing-12)'
      >
        <div className='w-[360px] h-[20px] flex items-center'>
          <span
            className={`font-medium text-[16px] leading-[20px] ${
              selectedLabel
                ? 'text-(--color-custom-gray-600)'
                : 'text-(--color-custom-gray-300)'
            }`}
          >
            {selectedLabel || placeholder}
          </span>
        </div>
        {isOpen ? (
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='cursor-pointer'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M11.4705 8.96963C11.7634 8.67676 12.2383 8.6768 12.5312 8.96971L17.5304 13.9697C17.8232 14.2626 17.8232 14.7375 17.5303 15.0304C17.2374 15.3232 16.7625 15.3232 16.4696 15.0303L12.0007 10.5607L7.53029 15.0304C7.23737 15.3232 6.7625 15.3232 6.46963 15.0303C6.17676 14.7374 6.1768 14.2625 6.46971 13.9696L11.4705 8.96963Z'
              style={{ fill: 'var(--color-secondary-indigo)' }}
            />
          </svg>
        ) : (
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='cursor-pointer'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M6.46963 8.96971C6.7625 8.6768 7.23737 8.67676 7.53029 8.96963L12.0007 13.4393L16.4696 8.96971C16.7625 8.6768 17.2374 8.67676 17.5303 8.96963C17.8232 9.2625 17.8232 9.73737 17.5304 10.0303L12.5312 15.0303C12.2383 15.3232 11.7634 15.3232 11.4705 15.0304L6.46971 10.0304C6.1768 9.7375 6.17676 9.26263 6.46963 8.96971Z'
              style={{ fill: 'var(--color-secondary-indigo)' }}
            />
          </svg>
        )}
      </div>

      {isOpen && (
        <div className='absolute top-full left-0 w-full bg-white rounded-(--radius-small) border border-(--color-custom-gray-300) py-(--spacing-16) px-(--spacing-12) flex flex-col gap-(--spacing-16) mt-[8px] cursor-pointer'>
          {options.map((option, index) => (
            <div
              key={option.value}
              onClick={() => {
                setSelectedLabel(option.label);
                setIsOpen(false);
              }}
              className={`font-medium text-[16px] leading-[20px] ${
                index !== options.length - 1
                  ? 'border-b border-(--color-custom-gray-300) pb-(--spacing-16) w-[396px]'
                  : ''
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
