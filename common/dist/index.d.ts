import { ZodString, z } from "zod";
export declare const signUpInput: z.ZodObject<{
    email: ZodString;
    password: ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SignUpParams = z.infer<typeof signUpInput>;
export declare const signInInput: z.ZodObject<{
    email: ZodString;
    password: ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
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
