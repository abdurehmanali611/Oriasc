import { z } from "zod";

export const login = z.object({
  Email: z.email("Please Enter Your Email"),
  Password: z.string().min(6, "Please Enter a valid Password"),
});

export const HeroValidation = z.object({
  Title: z.string().min(2, "Please Insert a Title for your hero section"),
  Body: z.string().min(2, "Please Insert a body for a hero section"),
  ImageUrl: z.string().min(2, "Please provide an Image"),
  startDate: z
    .union([z.date(), z.undefined()])
    .refine((val) => val !== undefined, {
      message: "Please Enter the Starting Date",
    }),
  endDate: z
    .union([z.date(), z.undefined()])
    .refine((val) => val !== undefined, {
      message: "Please Enter the End Date",
    }),
});

export const ActivityValidation = z.object({
  Title: z.string().min(2, "Please Insert a Title for your hero section"),
  Description: z.string().min(2, "Please Insert a body for a hero section"),
  Stat: z.number().optional().or(z.literal(null)),
  DateTime: z
    .union([z.date(), z.undefined()])
    .refine((val) => val !== undefined)
    .optional()
    .or(z.literal(null)),
});

export const EventValidation = z.object({
  Title: z.string().min(2, "Please Insert a Title for the Event"),
  Description: z.string().min(2, "Please Insert a description for the Event"),
  Slug: z.string().min(2, "Please Enter a slug for your Events"),
  ImageUrl: z.string().min(2, "Please provide an Image"),
  StartDate: z
    .union([z.date(), z.undefined()])
    .refine((val) => val !== undefined, {
      message: "Please Select the Events Starting Date",
    }),
  EndDate: z
    .union([z.date(), z.undefined()])
    .refine((val) => val !== undefined, {
      message: "Please Select the Events End Date",
    }),
});

export const BlogValidation = z.object({
  Title: z.string().min(2, "Please Insert a Title for the Event"),
  Description: z.string().min(2, "Please Insert a description for the Event"),
  Slug: z.string().min(2, "Please Enter a slug for your Events"),
  ImageUrl: z.string().min(2, "Please provide an Image"),
  Author: z.string().min(2, "Please enter the Author Name"),
});

export const SermonValidation = z.object({
  Title: z.string().min(2, "Please Insert a Title for the Event"),
  Description: z.string().min(2, "Please Insert a description for the Event"),
  Slug: z.string().min(2, "Please Enter a slug for your Events"),
  ImageVideoUrl: z.string().min(2, "Please provide an Image/Video"),
  Speaker: z.string().min(2, "Please enter the Speaker Name"),
});

export const TeamValidation = z.object({
  Name: z.string().min(2, "Please Enter the Name"),
  Position: z.string().min(2, "Please Enter the Position"),
  ImageUrl: z.string().min(2, "Please provide an image to be uploaded"),
  Facebook: z.string().optional().or(z.literal(null)),
  Instagram: z.string().optional().or(z.literal(null)),
  LinkedIn: z.string().optional().or(z.literal(null)),
});

export const TestimonialValidation = z.object({
  Name: z.string().min(2, "Please Enter the Name"),
  Proffession: z.string().min(2, "Please Enter his/her Proffession"),
  Content: z.string().min(2, "Please Enter his/her Idea/Recognition"),
  ImageUrl: z.string().min(2, "Please provide an image to be uploaded"),
   Rating: z.coerce 
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating cannot exceed 5")
    .or(z.literal(0)),
});
