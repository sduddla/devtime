import AgreementCheckbox from './AgreementCheckbox';
import { TERMS_CONTENT } from './terms';

interface TermsSectionProps {
  onAgreementChange: (checked: boolean) => void;
}

export default function TermsSection({ onAgreementChange }: TermsSectionProps) {
  return (
    <div className='flex flex-col gap-(--spacing-8) mb-(--spacing-36)'>
      <div className='flex justify-between items-center'>
        <label className='font-medium text-[14px] leading-[18px] text-(--color-custom-gray-600)'>
          이용 약관
        </label>
        <AgreementCheckbox onAgreementChange={onAgreementChange} />
      </div>
      <div className='bg-(--color-custom-gray-50) w-[420px] h-[110px] rounded-(--radius-small) py-(--spacing-12) px-(--spacing-16) overflow-y-auto'>
        <div className='flex flex-col gap-(--spacing-12) text-(--color-custom-gray-600) text-[14px] leading-[18px]'>
          {TERMS_CONTENT.map((term, index) => (
            <div key={index} className='flex flex-col'>
              <span className='font-bold'>{term.title}</span>
              <span>{term.content}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
