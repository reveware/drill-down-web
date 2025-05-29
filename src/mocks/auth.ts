import { CreateUserDto, LoginDto } from '@/types/auth';
import { mockUser } from './user';

export const mockLogin = async (loginAttempt: LoginDto) => {
  console.log('loginAttempt', loginAttempt);
  return {
    data: {
      token: '1234567890',
      user: mockUser,
    },
  };
};

export const mockRegister = async (user: CreateUserDto) => {
  console.log('register', user);
  return { data: user };
};
