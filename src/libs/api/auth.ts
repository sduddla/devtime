import axiosInstance from './axiosInstance';

export const signup = async (
  email: string,
  nickname: string,
  password: string,
  confirmPassword: string
) => {
  return axiosInstance.post('/api/signup', {
    email,
    nickname,
    password,
    confirmPassword,
  });
};

export const checkEmail = async (email: string) => {
  return axiosInstance.get('/api/signup/check-email', {
    params: { email },
  });
};

export const checkNickname = async (nickname: string) => {
  return axiosInstance.get('/api/signup/check-nickname', {
    params: { nickname },
  });
};
