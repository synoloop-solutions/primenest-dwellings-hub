import { z } from "zod";

const name = z.string().trim().min(2, "Please enter your name").max(100);
const email = z.string().trim().email("Enter a valid email").max(255);
const phone = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(25, "Phone number is too long");

export const contactSchema = z.object({
  name,
  email,
  phone: phone.optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please add a short message").max(1000),
});
export type ContactValues = z.infer<typeof contactSchema>;

export const inquirySchema = z.object({
  name,
  email,
  phone,
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});
export type InquiryValues = z.infer<typeof inquirySchema>;

export const viewingSchema = z.object({
  name,
  email,
  phone,
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
});
export type ViewingValues = z.infer<typeof viewingSchema>;

export const preQualSchema = z.object({
  name,
  email,
  phone,
  loanAmount: z.coerce.number().min(1, "Enter an amount").max(100000000),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});
export type PreQualValues = z.infer<typeof preQualSchema>;

export const newsletterSchema = z.object({ email });
export type NewsletterValues = z.infer<typeof newsletterSchema>;
