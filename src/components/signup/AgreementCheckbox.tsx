'use client';

import { useState } from 'react';

interface AgreementCheckboxProps {
  onAgreementChange: (checked: boolean) => void;
  hasError?: boolean;
}

export default function AgreementCheckbox({
  onAgreementChange,
  hasError = false,
}: AgreementCheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleClick = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    setIsTouched(true);
    onAgreementChange(newChecked);
  };

  const showError = hasError || (isTouched && !isChecked);

  return (
    <div className='flex items-center gap-(--spacing-4)'>
      <span
        className={`text-(--color-primary-color1) text-[14px] leading-[18px] opacity-30 font-medium ${
          isChecked ? 'text-(--color-primary-color1) opacity-100' : ''
        }`}
      >
        동의함
      </span>
      <button
        type='button'
        onClick={handleClick}
        className='cursor-pointer focus:outline-none'
      >
        <svg
          width='18'
          height='18'
          viewBox='0 0 18 18'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M6 1.5H12C14.4853 1.5 16.5 3.51472 16.5 6V12C16.5 14.4853 14.4853 16.5 12 16.5H6C3.51472 16.5 1.5 14.4853 1.5 12V6C1.5 3.51472 3.51472 1.5 6 1.5Z'
            fill={isChecked ? 'var(--color-primary-color1)' : 'white'}
            fillOpacity={isChecked ? 0.1 : 1}
            stroke={
              showError
                ? 'var(--color-secondary-negative)'
                : 'var(--color-primary-color1)'
            }
            strokeWidth={showError ? '1' : '1'}
          />
          {isChecked && (
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12.5525 6.24555C12.7484 6.44026 12.7492 6.75684 12.5545 6.95265L7.78153 11.7527C7.68768 11.847 7.56007 11.9001 7.42698 11.9001C7.29388 11.9001 7.16628 11.847 7.07243 11.7527L5.44544 10.1165C5.25073 9.92065 5.25162 9.60407 5.44743 9.40936C5.64324 9.21465 5.95983 9.21554 6.15454 9.41135L7.42698 10.691L11.8454 6.24754C12.0401 6.05173 12.3567 6.05084 12.5525 6.24555Z'
              fill='var(--color-primary-color1)'
            />
          )}
        </svg>
      </button>
    </div>
  );
}
