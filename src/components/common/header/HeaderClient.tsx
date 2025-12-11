'use client';

import { useState } from 'react';
import DefaultProfile from '@/assets/icons/default-profile.svg';
import HeaderModal from './HeaderModal';

export default function HeaderClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='relative'>
      <div
        className='flex items-center gap-(--spacing-12) cursor-pointer'
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        <DefaultProfile width={40} height={40} />
        <p className='font-bold text-[16px] leading-5 text-(--color-secondary-indigo)'>
          DevTime
        </p>
      </div>
      {isModalOpen && <HeaderModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
