import Image from 'next/image';
import logo from '@/assets/images/logo.svg';

export default function Header() {
  return (
    <header className='flex justify-between mt-[16px]'>
      <div className='flex items-center gap-(--spacing-48)'>
        <Image src={logo} alt='logo' width={148} height={40} />
        <div className='flex items-center gap-(--spacing-36)'>
          <nav className='font-semibold leading-[20px] text-(--color-secondary-indigo)'>
            대시보드
          </nav>
          <nav className='font-semibold leading-[20px] text-(--color-secondary-indigo)'>
            랭킹
          </nav>
        </div>
      </div>
      <div className='flex items-center gap-(--spacing-36)'>
        <nav className='font-semibold leading-[20px] text-(--color-secondary-indigo)'>
          로그인
        </nav>
        <nav className='font-semibold leading-[20px] text-(--color-secondary-indigo)'>
          회원가입
        </nav>
      </div>
    </header>
  );
}
