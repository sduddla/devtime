export interface SignupFormErrors {
  email?: string;
  nickname?: string;
  password?: string;
  confirmPassword?: string;
  agreement?: string;
}

// 아이디 유효성 검증
export function validateEmail(email: string): string | null {
  if (!email || email.trim() === '') {
    return '이메일 형식으로 작성해 주세요.';
  }

  if (email.includes(' ')) {
    return '이메일 형식으로 작성해 주세요.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '이메일 형식으로 작성해 주세요.';
  }

  return null;
}

// 닉네임 유효성 검증
export function validateNickname(nickname: string): string | null {
  if (!nickname || nickname.trim() === '') {
    return '닉네임을 입력해 주세요.';
  }

  if (nickname.includes(' ')) {
    return '닉네임을 입력해 주세요.';
  }

  return null;
}

// 비밀번호 유효성 검증
export function validatePassword(password: string): string | null {
  if (!password || password.trim() === '') {
    return '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.';
  }

  if (password.includes(' ')) {
    return '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.';
  }

  if (password.length < 8) {
    return '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.';
  }

  const hasEng = /[a-zA-Z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  if (!hasEng || !hasNum) {
    return '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.';
  }

  return null;
}

// 비밀번호 확인 유효성 검증
export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string | null {
  if (!confirmPassword || confirmPassword.trim() === '') {
    return '비밀번호가 일치하지 않습니다.';
  }

  if (confirmPassword.includes(' ')) {
    return '비밀번호가 일치하지 않습니다.';
  }

  if (password !== confirmPassword) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return null;
}
