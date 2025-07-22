'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, Upload, User } from '@/components/shared/Icons';
import Link from 'next/link';
import { RegisterFormSchema, RegisterDto } from '@/types/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { useAvatarUpload } from '../hooks/useAvatarUpload';
import { Label } from '@/components/ui/label';
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

  useEffect(() => {
    form.trigger('avatar');
  }, [form]);

  const { preview, handleChange } = useAvatarUpload(form.setValue);
  const firstName = form.watch('first_name');
  const lastName = form.watch('last_name');
  const initials = useMemo(
    () => `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase(),
    [firstName, lastName]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
        {/* Avatar Upload */}
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Label htmlFor="avatar" className="block cursor-pointer">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={preview || undefined} className="object-cover" />
                    <AvatarFallback className="bg-secondary text-on-primary text-lg">
                      {preview ? null : initials || <User className="h-10 w-10" />}
                    </AvatarFallback>
                  </Avatar>
                </Label>
                <Label
                  htmlFor="avatar"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 absolute right-0 bottom-0 cursor-pointer rounded-full p-2 transition-colors"
                >
                  <Upload className="h-4 w-4" />
                </Label>
              </div>
              <div className="space-y-2 text-center">
                <FormControl>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleChange(e);
                      field.onChange(file);
                    }}
                  />
                </FormControl>

                {form.formState.isDirty && (
                  <FormMessage className="min-h-[1rem] text-xs font-light" />
                )}
              </div>
            </FormItem>
          )}
        />

        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username*</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormMessage className="min-h-[1rem] text-xs font-light" />
            </FormItem>
          )}
        />

        {/* First Name & Last Name */}
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
                <FormMessage className="min-h-[1rem] text-xs font-light" />
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
                <FormMessage className="min-h-[1rem] text-xs font-light" />
              </FormItem>
            )}
          />
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage className="min-h-[1rem] text-xs font-light" />
            </FormItem>
          )}
        />

        {/* Password & Confirm Password */}
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
                <FormMessage className="min-h-[1rem] text-xs font-light" />
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
                <FormMessage className="min-h-[1rem] text-xs font-light" />
              </FormItem>
            )}
          />
        </div>

        {/* Date of Birth & Tagline */}
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
                <FormMessage className="min-h-[1rem] text-xs font-light" />
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
                <FormMessage className="min-h-[1rem] text-xs font-light" />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={!form.formState.isValid || isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        {/* Login Link */}
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
