'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserDto, UpdateUserSchema, UserDetail } from '@/types/user';
import { useUpdateUser } from '@/features/user';
import { AvatarUpload, DateOfBirthPicker } from '@/components/shared';
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
import { getInitials } from '@/lib/utils';
import { SettingsSection } from './SettingsSection';

interface IdentityFormProps {
  user: UserDetail;
}

export const IdentityForm = ({ user }: IdentityFormProps) => {
  const { mutate, isPending } = useUpdateUser();

  const form = useForm<UpdateUserDto>({
    resolver: zodResolver(UpdateUserSchema),
    mode: 'onChange',
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      tagline: user.tagline ?? '',
      date_of_birth: user.date_of_birth ?? undefined,
    },
  });

  const onSubmit = (data: UpdateUserDto) => mutate(data);

  const initials = getInitials([user.first_name, user.last_name]) || getInitials([user.username]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SettingsSection title="Identity">
          <div className="flex items-start gap-4">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="shrink-0">
                  <FormControl>
                    <AvatarUpload
                      size="sm"
                      value={field.value}
                      onChange={field.onChange}
                      initials={initials}
                      currentUrl={user.avatar}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-xs font-normal">
                      First name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-xs font-normal">
                      Last name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground text-xs font-normal">Tagline</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} placeholder="Slow down..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground text-xs font-normal">
                  Date of birth
                </FormLabel>
                <FormControl>
                  <DateOfBirthPicker
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
