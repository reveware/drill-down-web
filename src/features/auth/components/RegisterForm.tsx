'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { Eye, EyeOff } from '@/components/shared/Icons';
import Link from 'next/link';
import { RegisterFormSchema, RegisterDto } from '@/types/auth';
import { AvatarUpload } from '@/components/shared';
import { getInitials } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { format } from 'date-fns';

interface RegisterFormProps {
  onSubmit: (data: RegisterDto) => void;
  isLoading: boolean;
}

export const RegisterForm = ({ onSubmit, isLoading = false }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(RegisterFormSchema),
    mode: 'onChange',
  });

  const firstName = form.watch('first_name');
  const lastName = form.watch('last_name');
  const initials = useMemo(() => getInitials([firstName, lastName]), [firstName, lastName]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center space-y-2">
              <AvatarUpload value={field.value} onChange={field.onChange} initials={initials} />
              <div className="min-h-[1rem] text-xs font-light">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username*</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <div className="min-h-[1rem] text-xs font-light">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name*</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <div className="min-h-[1rem] text-xs font-light">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <div className="min-h-[1rem] text-xs font-light">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <div className="min-h-[1rem] text-xs font-light">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password*</FormLabel>
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
                      size="sm"
                      variant="ghost"
                      className="bg-input text-muted-foreground absolute top-0 right-0 h-full rounded-l-none rounded-r-md"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <div className="min-h-[1rem] text-xs font-light">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="bg-input text-muted-foreground absolute top-0 right-0 h-full rounded-l-none rounded-r-md"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <div className="min-h-[1rem] text-xs font-light">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth*</FormLabel>
                <FormControl>
                  <Input type="date" {...field} max={format(new Date(), 'yyyy-MM-dd')} />
                </FormControl>
                <div className="min-h-[1rem] text-xs font-light">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tagline</FormLabel>
                <FormControl>
                  <Input placeholder="Slow down..." {...field} />
                </FormControl>
                <div className="min-h-[1rem] text-xs font-light">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={!form.formState.isValid || isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <div className="mt-4 text-center text-sm">
          <span className="text-muted">Already have an account? </span>
          <span className="text-info font-medium">
            <Link href="/login">Sign in</Link>
          </span>
        </div>
      </form>
    </Form>
  );
};
