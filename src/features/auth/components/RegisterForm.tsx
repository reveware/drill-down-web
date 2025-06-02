import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff, Upload, User } from '@/components/shared/Icons';
import Link from 'next/link';
import { RegisterFormSchema, RegisterDto } from '@/types/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, Input } from '@/components/shared';
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
  }, []);

  const { preview, handleChange } = useAvatarUpload(form.setValue);
  const firstName = form.watch('first_name');
  const lastName = form.watch('last_name');
  const initials = useMemo(
    () => `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase(),
    [firstName, lastName]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Avatar Upload */}
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Label htmlFor="avatar" className="cursor-pointer block">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={preview || undefined} className="object-cover" />
                    <AvatarFallback className="text-lg bg-secondary text-on-primary">
                      {preview ? null : initials || <User className="w-10 h-10" />}
                    </AvatarFallback>
                  </Avatar>
                </Label>
                <Label
                  htmlFor="avatar"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Upload className="w-4 h-4" />
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
                {form.formState.errors.avatar?.message && (
                  <Label
                    htmlFor="avatar"
                    className="text-xs font-light text-muted cursor-pointer hover:text-foreground"
                  >
                    Click to upload avatar
                  </Label>
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
              <FormLabel className="font-light text-muted text-xs">Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
              </FormControl>
              <FormMessage className="font-light text-xs min-h-[1rem]" />
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
                <FormLabel className="font-light text-muted text-xs">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage className="font-light text-xs min-h-[1rem]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-light text-muted text-xs">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage className="font-light text-xs min-h-[1rem]" />
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
              <FormLabel className="font-light text-muted text-xs">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage className="font-light text-xs min-h-[1rem]" />
            </FormItem>
          )}
        />

        {/* Password & Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-light text-muted text-xs">Password</FormLabel>
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
                      className="absolute right-0 top-0 h-full px-3 py-2 bg-zinc-300"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="font-light text-xs min-h-[1rem]" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-light text-muted text-xs">Confirm Password</FormLabel>
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
                </FormControl>
                <FormMessage className="font-light text-xs min-h-[1rem]" />
              </FormItem>
            )}
          />
        </div>

        {/* Date of Birth & Tagline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-light text-muted text-xs">Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage className="font-light text-xs min-h-[1rem]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-light text-muted text-xs">Tagline (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Slow down..." {...field} />
                </FormControl>
                <FormMessage className="font-light text-xs min-h-[1rem]" />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          block
          disabled={!form.formState.isValid || isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        {/* Login Link */}
        <div className="text-center text-sm mt-4">
          <span className="text-muted">Already have an account? </span>
          <span className="text-info font-medium">
            <Link href="/login">Sign in</Link>
          </span>
        </div>
      </form>
    </Form>
  );
};
