'use client';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  closeOnClickOutside?: boolean;
  showBackdrop?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className,
  closeOnClickOutside = true,
  showBackdrop = true,
}: ModalProps) {
  if (!isOpen) return null;

  const content = (
    <div
      className={`bg-white rounded-(--radius-large) ${
        className || 'py-(--spacing-16) px-(--spacing-8)'
      }`}
      onClick={(e) => e.stopPropagation()}
      style={{
        boxShadow: '0 8px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      {children}
    </div>
  );

  if (!showBackdrop) {
    return content;
  }

  return (
    <div
      className='fixed inset-0 z-50 bg-black/50'
      onClick={closeOnClickOutside ? onClose : undefined}
    >
      {content}
    </div>
  );
}
