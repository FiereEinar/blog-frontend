import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password must not be empty'),
});

export const userCommentSchema = z.object({
  text: z.string().min(3, 'Comment must be atleast 3 characters.'),
});

export const userSignInSchema = z.object({
  firstName: z.string().min(1, 'Fill up the first name'),
  lastName: z.string().min(1, 'Fill up the last name'),
  email: z.string().email(),
  password: z.string().min(1, 'Fill up the password'),
  confirmPassword: z.string().min(1, 'Fill up the password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords must match.',
  path: ['confirmPassword']
});
