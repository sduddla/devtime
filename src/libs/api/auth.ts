import axiosInstance, { apiClient } from './axiosInstance';

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

export const login = async (email: string, password: string) => {
  return apiClient.post('/api/auth/login', {
    email,
    password,
  });
};

export const logout = async () => {
  return apiClient.post('/api/auth/logout');
};

export const refreshToken = async () => {
  return apiClient.post('/api/auth/refresh');
};
