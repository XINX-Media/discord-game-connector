import { isNodeEnv } from "@/utils/enviornmentHelpers";
import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(isNodeEnv("development") ? 4 : 8)
      .max(20),
    confirmPassword: z.string().min(isNodeEnv("development") ? 4 : 8),
    firstName: z.string(),
    lastName: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
  });

export type RegisterSchemaData = z.infer<typeof registerSchema>;
