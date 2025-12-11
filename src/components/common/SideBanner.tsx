import VerticalLogoWhite from '@/assets/icons/vertical-logo-white.svg';
export default function SideBanner() {
  return (
    <div className='w-1/2 h-full bg-(--color-primary-color1) flex flex-col items-center justify-center gap-(--spacing-36)'>
      <VerticalLogoWhite width={264} height={200} />
      <p className='text-white font-semibold text-[20px] leading-[24px]'>
        개발자를 위한 타이머
      </p>
    </div>
  );
}
