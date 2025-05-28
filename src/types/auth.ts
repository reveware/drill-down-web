import { z } from 'zod';

export const LoginCredentialsSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegisterCredentialsSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const LoginResultSchema = z.object({
  token: z.string(),
});

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    message: z.string().optional(),
    success: z.boolean().optional(),
  });

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type RegisterCredentials = z.infer<typeof RegisterCredentialsSchema>;
export type LoginResult = z.infer<typeof LoginResultSchema>;

export type ApiResponse<T> = {
  data: T;
  message?: string;
  success?: boolean;
};

export interface JWTPayload {
  sub: string; // user id
  email: string;
  iat: number;
  exp: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: JWTPayload | null;
  isLoading: boolean;
}
