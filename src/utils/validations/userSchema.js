import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const userCommentSchema = z.object({
  text: z.string().min(3, 'Comment must be atleast 3 characters.'),
});
