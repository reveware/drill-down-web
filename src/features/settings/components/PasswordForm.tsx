'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SetPasswordFormDto, SetPasswordSchema } from '@/types/auth';
import { AUTH_PROVIDER_LABEL, AuthProvider } from '@/types/user';
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
import { PASSWORD_PLACEHOLDER } from '@/lib/utils';
import { useChangePassword } from '../hooks/useChangePassword';
import { SettingsSection } from './SettingsSection';

interface PasswordFormProps {
  hasPassword: boolean;
  ssoProviders: AuthProvider[];
}

export const PasswordForm = ({ hasPassword, ssoProviders }: PasswordFormProps) => {
  const { mutate, isPending } = useChangePassword();

  const form = useForm<SetPasswordFormDto>({
    resolver: zodResolver(SetPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const onSubmit = (data: SetPasswordFormDto) => {
    mutate(
      {
        old_password: hasPassword ? data.old_password : undefined,
        new_password: data.new_password,
      },
      {
        onSuccess: () => form.reset(),
      }
    );
  };

  const title = hasPassword ? 'Change password' : 'Set password';
  const providerLabel = ssoProviders[0] ? AUTH_PROVIDER_LABEL[ssoProviders[0]] : undefined;
  const description =
    hasPassword || !providerLabel
      ? undefined
      : `You signed in with ${providerLabel}. Set a password to also sign in with email.`;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SettingsSection title={title} description={description}>
          {hasPassword && (
            <FormField
              control={form.control}
              name="old_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-xs font-normal">
                    Current password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder={PASSWORD_PLACEHOLDER}
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-xs font-normal">
                    New password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-xs font-normal">
                    Confirm new password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="new-password"
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              disabled={!form.formState.isDirty || !form.formState.isValid || isPending}
            >
              {isPending ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </SettingsSection>
      </form>
    </Form>
  );
};
