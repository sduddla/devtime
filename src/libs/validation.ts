export interface SignupFormErrors {
  email?: string;
  nickname?: string;
  password?: string;
  confirmPassword?: string;
  agreement?: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
}

// 아이디 유효성 검증
export function validateEmail(email: string): string | null {
  if (
    !email ||
    email.includes(' ') ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return '이메일 형식으로 작성해 주세요.';
  }
  return null;
}

// 닉네임 유효성 검증
export function validateNickname(nickname: string): string | null {
  if (!nickname || nickname.includes(' ')) {
    return '닉네임을 입력해 주세요.';
  }

  return null;
}

// 비밀번호 유효성 검증
export function validatePassword(password: string): string | null {
  if (
    !password ||
    password.length < 8 ||
    password.includes(' ') ||
    !/[a-zA-Z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.';
  }

  return null;
}

// 비밀번호 확인 유효성 검증
export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string | null {
  if (
    !confirmPassword ||
    confirmPassword.includes(' ') ||
    password !== confirmPassword
  ) {
    return '비밀번호가 일치하지 않습니다.';
  }

  return null;
}
