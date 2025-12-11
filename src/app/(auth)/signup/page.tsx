import SideBanner from '@/components/common/SideBanner';
import SignupForm from '@/components/signup/SignupForm';

export default function SignupPage() {
  return (
    <div className='h-screen flex'>
      <SideBanner />
      <div className='w-1/2 h-full flex items-center justify-center'>
        <div className='flex flex-col'>
          <h1 className='text-(--color-primary-color1) text-[24px] leading-[30px] font-bold mb-(--spacing-36) text-center'>
            회원가입
          </h1>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
