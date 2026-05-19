import { z } from 'zod';

export const UserFieldsSchema = z.object({
  username: z.string().min(3, 'must be at least 3 characters').max(20, 'too long'),
  first_name: z.string().min(2, 'must be at least 2 characters').max(20, 'too long'),
  last_name: z.string().min(2, 'must be at least 2 characters').max(20, 'too long'),
  tagline: z.string().max(100, 'too long').optional(),
  avatar: z.instanceof(File, { message: 'Please select an avatar image' }).optional(),
  date_of_birth: z.string().refine((date) => {
    if (!date) {
      return false;
    }
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  }, 'must be at least 18 years old'),
});
