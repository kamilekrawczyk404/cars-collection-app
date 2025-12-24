import { z } from "zod";

export const userRegisterSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  displayName: z
    .string()
    .nonempty("Display name is required")
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name cannot exceed 50 characters"),
  userName: z
    .string()
    .nonempty("Username is required")
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username cannot exceed 30 characters")
    .refine((s) => !s.includes(" "), "Username cannot contain spaces")
    .refine(
      (s) => /^[a-zA-Z0-9_]+$/.test(s),
      "Username can only contain letters, numbers, and underscores",
    ),
  bio: z.string().max(160, "Bio cannot exceed 160 characters").optional(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters")
    .refine(
      (s) => !/(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/.test(s),
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
  confirmPassword: z.string().nonempty("Please confirm your password"),
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z.string().nonempty("Password is required"),
});

export type UserRegisterValues = z.infer<typeof userRegisterSchema>;
export type UserLoginValues = z.infer<typeof userLoginSchema>;
