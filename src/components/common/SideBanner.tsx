import verticalLogo from '@/assets/images/vertical-logo.svg';
import Image from 'next/image';

export default function SideBanner() {
  return (
    <div className='w-1/2 h-full bg-(--color-primary-color1) flex flex-col items-center justify-center gap-(--spacing-36)'>
      <Image
        src={verticalLogo}
        alt='vertical logo'
        width={264}
        height={200}
        className='brightness-0 invert'
        loading='eager'
      />
      <p className='text-white font-semibold text-[20px] leading-[24px]'>
        개발자를 위한 타이머
      </p>
    </div>
  );
}
