"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SectionHeader from "./SectionHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  contactFormSchema,
  ContactFormData,
} from "@/lib/schemas/contactSchema";
import { contactApi } from "@/lib/api/contactApi";
import { toast } from "sonner";
import axios from "axios";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      title: "",
      message: "",
    },
  });

  const messageValue = form.watch("message");
  const characterCount = messageValue?.length || 0;

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);

    try {
      await contactApi.submitContact(data);

      toast.success("Message sent successfully: look after your email");
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          toast.error("Unable to connect to server");
        } else if (error.response.status === 422) {
          const validationErrors = error.response.data?.errors;
          if (validationErrors) {
            Object.keys(validationErrors).forEach((key) => {
              toast.error(validationErrors[key][0]);
            });
          } else {
            toast.error("Validation error occurred");
          }
        } else if (error.response.status >= 500) {
          toast.error("Server error occurred. Please try again later.");
          console.error("Server error:", error);
        } else if (error.code === "ECONNABORTED") {
          toast.error("Request timed out, please try again");
        } else {
          toast.error(error.response.data?.message || "An error occurred");
        }
      } else {
        toast.error("An unexpected error occurred");
        console.error("Error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full py-5">
        <div className="container mx-auto px-4 py-5 flex flex-col gap-10">
          <SectionHeader
            subtitle="Get In Touch"
            title="Contact For Any Queries"
          />
          <Form {...form}>
            <form
              className="flex flex-col gap-5 w-[50%] self-center"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex justify-between items-center gap-5">
                <FormField
                  name="full_name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-1/2 flex flex-col gap-3">
                      <FormLabel>Full Name:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          className="bg-stone-300"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-1/2 flex flex-col gap-3">
                      <FormLabel>Email:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="john@example.com"
                          className="bg-stone-300"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Subject of your message"
                        className="bg-stone-300"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="message"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message:</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Your message here..."
                        maxLength={4000}
                        className="bg-stone-300 h-40"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="flex justify-between items-center">
                      <FormMessage />
                      <span className="text-sm text-gray-600">
                        {characterCount}/4000
                      </span>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="self-center px-8"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      {/* Contact Form End */}
    </>
  );
}
