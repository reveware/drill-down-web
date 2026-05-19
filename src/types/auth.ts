import { z } from 'zod';
import { UserDetail, UserRole } from './user';
import { UserFieldsSchema } from './user-fields';

const RegisterSchema = UserFieldsSchema.extend({
  email: z.string().email('Invalid email address'),
  password: z.string().min(9, 'must be at least 9 characters'),
  confirmPassword: z.string(),
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
  email: z.string().email('Invalid email address'),
  password: z.string().min(9, 'Password must be at least 9 characters'),
});

export const LoginResultSchema = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
    role: z.nativeEnum(UserRole),
    is_onboarded: z.boolean(),
  }),
  token: z.string(),
});

export const GoogleSsoSchema = z.object({
  id_token: z.string(),
  nonce: z.string(),
});

export type GoogleSsoDto = z.infer<typeof GoogleSsoSchema>;

export type RegisterDto = z.infer<typeof RegisterFormSchema>;
export type CreateUserDto = z.infer<typeof CreateUserDto>;
export type LoginDto = z.infer<typeof LoginFormSchema>;
export type LoginResult = z.infer<typeof LoginResultSchema>;

export const JWTPayloadSchema = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
    role: z.nativeEnum(UserRole),
  }),
  iat: z.number(),
  exp: z.number(),
});

export type JWTPayload = z.infer<typeof JWTPayloadSchema>;

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: UserDetail | null;
  isOnboarded: boolean;
  isLoading: boolean;
}
