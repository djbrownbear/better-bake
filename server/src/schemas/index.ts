import { z } from 'zod';

// Auth schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  avatarURL: z.string().url('Invalid URL').optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Poll schemas
export const createPollSchema = z.object({
  optionOneText: z.string().min(1, 'Option one text is required'),
  optionOneBaker: z.string().min(1, 'Option one baker is required'),
  optionOneSeason: z.string().min(1, 'Option one season is required'),
  optionOneEpisode: z.string().min(1, 'Option one episode is required'),
  optionTwoText: z.string().min(1, 'Option two text is required'),
  optionTwoBaker: z.string().min(1, 'Option two baker is required'),
  optionTwoSeason: z.string().min(1, 'Option two season is required'),
  optionTwoEpisode: z.string().min(1, 'Option two episode is required'),
});

export const voteSchema = z.object({
  option: z.enum(['optionOne', 'optionTwo'], {
    message: 'Option must be either optionOne or optionTwo',
  }),
});

// Baker schema
export const createBakerSchema = z.object({
  id: z.string().min(1, 'Baker ID is required'),
  name: z.string().min(1, 'Baker name is required'),
  series: z.string().min(1, 'Series is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreatePollInput = z.infer<typeof createPollSchema>;
export type VoteInput = z.infer<typeof voteSchema>;
export type CreateBakerInput = z.infer<typeof createBakerSchema>;
