import { useForm, UseFormSetValue } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { Eye, EyeOff, Upload, User } from '@/components/shared/icons';
import Link from 'next/link';
import { RegisterFormSchema, RegisterDto } from '@/types/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, Input } from '@/components/shared';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAvatarUpload } from '../hooks/useAvatarUpload';

const FormField = ({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error: any;
  children: React.ReactNode;
}) => (
  <div className="space-y-1 text-foreground ">
    <Label className="font-light text-muted text-xs" htmlFor={id}>
      {label}
    </Label>
    {children}
    <p className="font-light text-xs text-destructive min-h-[1rem]">{error?.message || ''}</p>
  </div>
);

interface RegisterFormProps {
  onSubmit: (data: RegisterDto) => void;
  isLoading: boolean;
}

export const RegisterForm = ({ onSubmit, isLoading = false }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(RegisterFormSchema),
    mode: 'onChange',
  });

  const { preview, handleChange } = useAvatarUpload(setValue);
  const firstName = watch('first_name');
  const lastName = watch('last_name');
  const initials = useMemo(
    () => `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase(),
    [firstName, lastName]
  );

  return (
    <Card className="w-full border-none shadow-none p-6">
      <CardHeader className="text-center">
        <CardTitle className="font-title text-2xl font-bold">Register</CardTitle>
        <CardDescription className="text-sm text-accent">Join our community today</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={preview || undefined} />
                <AvatarFallback className="text-lg bg-muted text-on-primary">
                  {preview ? null : initials || <User className="w-10 h-10" />}
                </AvatarFallback>
              </Avatar>
              <Label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
              >
                <Upload className="w-4 h-4" />
              </Label>
            </div>
            <div className="space-y-2 text-center">
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
              <Label
                htmlFor="avatar"
                className="text-xs font-light text-muted cursor-pointer hover:text-foreground"
              >
                Click to upload avatar
              </Label>
              {errors.avatar && (
                <p className="text-sm text-destructive">{errors.avatar.message?.toString()}</p>
              )}
            </div>
          </div>

          <FormField id="username" label="Username" error={errors.username}>
            <Input id="username" placeholder="johndoe" {...register('username')} />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField id="first_name" label="First Name" error={errors.first_name}>
              <Input id="first_name" placeholder="John" {...register('first_name')} />
            </FormField>
            <FormField id="last_name" label="Last Name" error={errors.last_name}>
              <Input id="last_name" placeholder="Doe" {...register('last_name')} />
            </FormField>
          </div>

          <FormField id="email" label="Email" error={errors.email}>
            <Input id="email" type="email" placeholder="john@example.com" {...register('email')} />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField id="password" label="Password" error={errors.password}>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="accent"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 bg-zinc-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </FormField>

            <FormField id="confirmPassword" label="Confirm Password" error={errors.confirmPassword}>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="accent"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 bg-zinc-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField id="date_of_birth" label="Date of Birth" error={errors.date_of_birth}>
              <Input id="date_of_birth" type="date" {...register('date_of_birth')} />
            </FormField>
            <FormField id="tagline" label="Tagline (Optional)" error={errors.tagline}>
              <Input id="tagline" placeholder="Slow down..." {...register('tagline')} />
            </FormField>
          </div>

          <Button type="submit" variant="primary" block disabled={!isValid || isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <div className="text-center text-sm mt-4">
            <span className="text-muted">Already have an account? </span>
            <span className="text-info font-medium">
              <Link href="/login">Sign in</Link>
            </span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
