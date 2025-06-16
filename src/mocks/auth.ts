import { CreateUserDto, LoginDto } from '@/types/auth';
import { mockUser } from './user';

export const mockLogin = async (loginAttempt: LoginDto) => {
  console.log('mockLogin', loginAttempt);
  return {
    token: '1234567890',
    user: mockUser,
  };
};

export const mockRegister = async (user: CreateUserDto) => {
  console.log('mockRegister', user);
  return {
    token: '1234567890',
    user: mockUser,
  };
};

export const mockJWTPayload = {
  user: mockUser,
  iat: Date.now(),
  exp: Date.now() + 1000 * 60 * 60 * 24,
};
