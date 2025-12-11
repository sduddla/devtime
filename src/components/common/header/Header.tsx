import { headers } from 'next/headers';
import Link from 'next/link';
import Logo from '@/assets/icons/logo.svg';
import HeaderClient from './HeaderClient';

export default async function Header() {
  const headersList = await headers();
  const isLoggedIn = headersList.get('isLoggedIn') === 'true';

  return (
    <header className='flex justify-between mt-4'>
      <div className='flex items-center gap-(--spacing-48)'>
        <Logo width={148} height={40} />
        <div className='flex items-center gap-(--spacing-36)'>
          <nav className='font-semibold leading-5 text-(--color-secondary-indigo)'>
            대시보드
          </nav>
          <nav className='font-semibold leading-5 text-(--color-secondary-indigo)'>
            랭킹
          </nav>
        </div>
      </div>

      {isLoggedIn ? (
        <HeaderClient />
      ) : (
        <div className='flex items-center gap-(--spacing-36)'>
          <Link
            href='/login'
            className='font-semibold leading-5 text-(--color-secondary-indigo) cursor-pointer'
          >
            로그인
          </Link>
          <Link
            href='/signup'
            className='font-semibold leading-5 text-(--color-secondary-indigo) cursor-pointer'
          >
            회원가입
          </Link>
        </div>
      )}
    </header>
  );
}
