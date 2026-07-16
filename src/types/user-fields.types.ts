import { z } from 'zod';
import { differenceInYears } from 'date-fns';

const MIN_AGE = 18;

const isAdult = (value: string): boolean => {
  const dob = new Date(value);
  if (Number.isNaN(dob.getTime())) {
    return false;
  }
  return differenceInYears(new Date(), dob) >= MIN_AGE;
};

export const UserFieldsSchema = z.object({
  username: z.string().min(3, 'must be at least 3 characters').max(20, 'too long'),
  first_name: z.string().min(2, 'must be at least 2 characters').max(20, 'too long'),
  last_name: z.string().min(2, 'must be at least 2 characters').max(20, 'too long'),
  tagline: z.string().max(100, 'too long').optional(),
  avatar: z.instanceof(File, { message: 'Please select an avatar image' }).optional(),
  date_of_birth: z.string().refine(isAdult, 'must be at least 18 years old'),
});
