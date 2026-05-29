import { CreateUserDto, LoginDto, SetPasswordDto } from '@/types/auth';
import { mockUser } from './user';
import { sleep } from '@/lib/utils';

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

export const mockSetPassword = async (payload: SetPasswordDto): Promise<void> => {
  console.log('mockSetPassword', { has_old: !!payload.old_password });
  await sleep(150);
};

export const mockJWTPayload = {
  user: mockUser,
  iat: Date.now(),
  exp: Date.now() + 1000 * 60 * 60 * 24,
};
