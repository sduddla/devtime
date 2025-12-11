'use client';

import { createPortal } from 'react-dom';
import Button from '../common/Button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  const modalContent = (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div
        className='bg-white rounded-(--radius-large) p-(--spacing-24) flex flex-col items-center gap-(--spacing-24) min-w-[328px]'
        style={{
          boxShadow: '0 8px 8px rgba(0, 0, 0, 0.05)',
        }}
      >
        <p className='text-(--color-custom-gray-800) text-[20px] leading-6 font-semibold text-center'>
          로그인 정보를 다시 확인해 주세요.
        </p>

        <Button
          onClick={onClose}
          className='w-full h-12 bg-(--color-primary-color1) text-white font-semibold text-[18px] leading-[22px] rounded-(--radius-large) cursor-pointer'
        >
          확인
        </Button>
      </div>
    </div>
  );

  return typeof window !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}
