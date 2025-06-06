'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Eye, EyeOff } from '@/components/shared/Icons';
import Link from 'next/link';
import { LoginFormSchema, LoginDto } from '@/types/auth';
import { Button, Input } from '@/components/shared';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface LoginFormProps {
  onSubmit: (data: LoginDto) => void;
  isLoading: boolean;
}

export const LoginForm = ({ onSubmit, isLoading = false }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginDto>({
    resolver: zodResolver(LoginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted text-xs font-light">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage className="min-h-[1rem] text-xs font-light" />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted text-xs font-light">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pr-10"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="accent"
                    size="sm"
                    className="absolute top-0 right-0 h-full bg-zinc-300 px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="min-h-[1rem] text-xs font-light" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          block
          disabled={!form.formState.isValid || isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Register Link */}
        <div className="mt-4 text-center text-sm">
          <span className="text-muted">{`Don't have an account?`} </span>
          <span className="text-info font-medium">
            <Link href="/register">Sign up</Link>
          </span>
        </div>
      </form>
    </Form>
  );
};
