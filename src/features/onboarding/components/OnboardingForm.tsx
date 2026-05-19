'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { OnboardingFormSchema, OnboardingDto } from '@/types/user';
import { AvatarUpload } from '@/components/shared';
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

interface OnboardingFormProps {
  onSubmit: (data: OnboardingDto) => void;
  isLoading: boolean;
}

export const OnboardingForm = ({ onSubmit, isLoading = false }: OnboardingFormProps) => {
  const form = useForm<OnboardingDto>({
    resolver: zodResolver(OnboardingFormSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      date_of_birth: '',
      tagline: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center space-y-2">
              <AvatarUpload value={field.value} onChange={field.onChange} />
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
                <Input placeholder="johndoe" autoComplete="username" {...field} />
              </FormControl>
              <div className="min-h-[1rem] text-xs font-light">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date_of_birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth*</FormLabel>
              <FormControl>
                <Input type="date" max={format(new Date(), 'yyyy-MM-dd')} {...field} />
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

        <Button type="submit" className="w-full" disabled={!form.formState.isValid || isLoading}>
          {isLoading ? 'Saving...' : 'Complete Profile'}
        </Button>
      </form>
    </Form>
  );
};
