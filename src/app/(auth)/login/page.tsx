import SymbolLogo from '@/assets/icons/symbol-logo.svg';
import LoginForm from '@/components/login/LoginForm';

export default function LoginPage() {
  return (
    <div className='h-screen flex items-center justify-center relative overflow-hidden'>
      <div className='absolute top-[60px] right-0'>
        <SymbolLogo width={872} height={530} />
      </div>

      <LoginForm />
    </div>
  );
}
