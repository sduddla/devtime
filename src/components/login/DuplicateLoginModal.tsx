'use client';

import { createPortal } from 'react-dom';
import Button from '../common/Button';
import Modal from '../common/Modal';

interface DuplicateLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DuplicateLoginModal({
  isOpen,
  onClose,
}: DuplicateLoginModalProps) {
  const modalContent = (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-(--spacing-24) flex flex-col items-center gap-(--spacing-12) w-[328px] h-56'
      closeOnClickOutside={false}
    >
      <div className='flex flex-col gap-(--spacing-12)'>
        <p className='text-(--color-custom-gray-800) text-[20px] leading-4 font-bold'>
          중복 로그인이 불가능합니다.
        </p>
        <span className='text-(--color-custom-gray-600) text-[16px] leading-5'>
          다른 기기에 중복 로그인 된 상태입니다.[확인] 버튼을 누르면 다른
          기기에서 강제 로그아웃되며, 진행중이던 타이머가 있다면 기록이 자동
          삭제됩니다.
        </span>
      </div>

      <Button
        onClick={onClose}
        className='w-16 h-12 bg-(--color-primary-color1) text-white font-semibold text-[18px] leading-[22px] rounded-(--radius-large) cursor-pointer self-end'
      >
        확인
      </Button>
    </Modal>
  );

  return typeof window !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}
