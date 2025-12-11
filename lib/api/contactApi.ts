import axios from "axios";
import { ContactFormData } from "@/lib/schemas/contactSchema";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://oriasc-backend.vercel.app/api";

export interface ContactSubmission {
  id: number;
  full_name: string;
  email: string;
  title: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export const contactApi = {
  submitContact: async (data: ContactFormData): Promise<ContactSubmission> => {
    const response = await axios.post(`${API_BASE_URL}/contacts`, data);
    return response.data;
  },

  getAllContacts: async (): Promise<ContactSubmission[]> => {
    const response = await axios.get(`${API_BASE_URL}/contacts`);
    return response.data;
  },

  deleteContact: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/contacts/${id}`);
  },
};
