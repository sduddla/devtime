'use client';

import { createPortal } from 'react-dom';
import Button from '../common/Button';
import Modal from '../common/Modal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const modalContent = (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-(--spacing-24) flex flex-col items-center gap-(--spacing-24) min-w-[328px]'
      closeOnClickOutside={false}
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
    </Modal>
  );

  return typeof window !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}
