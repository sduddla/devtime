'use client';

import Logout from '@/assets/icons/logout.svg';
import User from '@/assets/icons/user.svg';
import { logout } from '@/libs/api/auth';
import { useRouter } from 'next/navigation';

interface HeaderModalProps {
  onClose: () => void;
}

export default function HeaderModal({ onClose }: HeaderModalProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
      router.replace('/');
    } catch {
      // console.error('로그아웃 실패:', error);
      onClose();
    }
  };
  return (
    <div
      className='absolute top-[calc(100%+8px)] right-0 w-[130px] h-[104px] bg-white rounded-(--radius-medium) border border-[#CCD0D6]'
      style={{
        boxShadow: '0 8px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      <button
        className='w-full px-(--spacing-12) py-(--spacing-16) flex items-center gap-(--spacing-12)  cursor-pointer'
        onClick={() => onClose()}
      >
        <User width={20} height={20} fill='var(--color-custom-gray-800)' />
        <span className='font-medium text-[16px] leading-5 text-(--color-custom-gray-600)'>
          마이페이지
        </span>
      </button>

      <div className='h-px bg-[#CCD0D6] mx-(--spacing-12)'></div>

      <button
        className='w-full px-(--spacing-12) py-(--spacing-16) flex items-center gap-(--spacing-12) cursor-pointer'
        onClick={() => handleLogout()}
      >
        <Logout width={20} height={20} fill='var(--color-custom-gray-800)' />
        <span className='font-medium text-[16px] leading-5 text-(--color-custom-gray-600)'>
          로그아웃
        </span>
      </button>
    </div>
  );
}
