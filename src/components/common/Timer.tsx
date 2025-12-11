import localFont from 'next/font/local';

const digitalNumbers = localFont({
  src: '../../../public/fonts/DigitalNumbers-Regular.woff',
  variable: '--font-digital-numbers',
  weight: '400',
  display: 'swap',
});

interface TimerProps {
  label: 'HOURS' | 'MINUTES' | 'SECONDS';
}

export default function Timer({ label }: TimerProps) {
  return (
    <div
      className={`${digitalNumbers.variable} w-[264px] h-[298px] rounded-(--radius-large) border border-(--color-primary-color1) text-(--color-primary-color1) flex items-center justify-center text-[154px] leading-[200px] pt-(--spacing-8) pr-(--spacing-8) pb-(--spacing-36) pl-(--spacing-8)`}
      style={{
        fontFamily: 'var(--font-digital-numbers)',
        background:
          'linear-gradient(to bottom, rgba(76, 121, 255, 0), rgba(76, 121, 255, 0.2))',
      }}
    >
      <div className='flex flex-col items-center justify-center gap-(--spacing-36)'>
        <div style={{ fontFamily: 'var(--font-digital-numbers)' }}>00</div>
        <p
          className='font-semibold text-[14px] leading-[18px]'
          style={{ fontFamily: 'var(--font-pretendard)' }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
