import { z } from "zod";

export const contactFormSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email address"),
  title: z.string().min(1, "Title is required"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(4000, "Message must not exceed 4000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
