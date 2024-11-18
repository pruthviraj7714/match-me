import z from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" }),
    image: z.string(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
    bio: z.string(),
    gender: z.enum(["MALE", "FEMALE"]),
    country: z.string(),
    interests: z
      .array(z.string())
      .min(1, { message: "Select at least one interest" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], 
  });
