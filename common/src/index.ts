import { ZodString, z } from "zod";

export const signUpInput = z.object({
  email: z.string().min(1).max(20),
  password: z.string().min(1).max(15),
});

export type SignUpParams = z.infer<typeof signUpInput>;

export const signInInput = z.object({
  email: z.string().min(1).max(20),
  password: z.string().min(1).max(15),
});
export type signInInParams = z.infer<typeof signInInput>;

export interface IData {
  _id: string;
  name: string;
  email: string;
  mobile: number;
  address: string;
  password: string;
  conPassword: string;
  date: Date;
}

export interface RegesterData {
  name: string;
  email: string;
  mobile: string;
  address: string;
  password: string;
  conPassword: string;
}
