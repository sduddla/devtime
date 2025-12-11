export default function ProfileImage() {
  return (
    <div className='flex items-end gap-(--spacing-12)'>
      <div className='w-[120px] h-[120px] rounded-(--radius-medium) border border-dotted border-(--color-primary-color1) flex items-center justify-center'>
        <svg
          width='36'
          height='36'
          viewBox='0 0 36 36'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M18.0001 6.0752C18.6214 6.0752 19.1251 6.57888 19.1251 7.2002V16.8752H28.8001C29.4214 16.8752 29.9251 17.3789 29.9251 18.0002C29.9251 18.6215 29.4214 19.1252 28.8001 19.1252H19.1251V28.8002C19.1251 29.4215 18.6214 29.9252 18.0001 29.9252C17.3788 29.9252 16.8751 29.4215 16.8751 28.8002L16.8751 19.1252H7.20007C6.57875 19.1252 6.07507 18.6215 6.07507 18.0002C6.07507 17.3789 6.57875 16.8752 7.20007 16.8752H16.8751L16.8751 7.2002C16.8751 6.57887 17.3788 6.0752 18.0001 6.0752Z'
            style={{ fill: 'var(--color-primary-color1)' }}
          />
        </svg>
      </div>
      <p className='font-medium text-[14px] leading-[18px] text-(--color-custom-gray-500)'>
        5MB 미만의 .png, .jpg 파일
      </p>
    </div>
  );
}
