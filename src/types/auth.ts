import { z } from 'zod';
import { UserDetail, UserRole } from './user';

const RegisterSchema = z.object({
  avatar: z.instanceof(File, { message: 'Please select an avatar image' }),
  username: z.string().min(3, 'must be at least 3 characters').max(20, 'too long'),
  first_name: z.string().min(2, 'must be at least 2 characters').max(20, 'too long'),
  last_name: z.string().min(2, 'must be at least 2 characters').max(20, 'too long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(9, 'must be at least 9 characters'),
  confirmPassword: z.string(),
  date_of_birth: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  }, 'must be at least 18 years old'),
  tagline: z.string().max(100, 'too long').optional(),
});

export const RegisterFormSchema = RegisterSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }
);

export const CreateUserDto = RegisterSchema.omit({
  confirmPassword: true,
});

export const LoginFormSchema = z.object({
  username: z.string().min(3, 'must be at least 3 characters').max(20, 'too long'),
  password: z.string().min(9, 'Password must be at least 9 characters'),
});

export const LoginResultSchema = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
    role: z.nativeEnum(UserRole.enum),
  }),
  token: z.string(),
});

export type RegisterDto = z.infer<typeof RegisterFormSchema>;
export type CreateUserDto = z.infer<typeof CreateUserDto>;
export type LoginDto = z.infer<typeof LoginFormSchema>;
export type LoginResult = z.infer<typeof LoginResultSchema>;

export const JWTPayloadSchema = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
    role: UserRole,
  }),
  iat: z.number(),
  exp: z.number(),
});

export type JWTPayload = z.infer<typeof JWTPayloadSchema>;

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserDetail | null;
  isLoading: boolean;
}
