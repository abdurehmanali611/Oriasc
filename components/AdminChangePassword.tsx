"use client";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import z from "zod";
import { PasswordChangeValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { UpdateCred } from "@/lib/actions";
import { Shield, Key, Lock, CheckCircle } from "lucide-react";
import { useState } from "react";

const AdminChangePassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState<string | null>(
    localStorage.getItem("Password")
  );

  const form = useForm<z.infer<typeof PasswordChangeValidation>>({
    resolver: zodResolver(PasswordChangeValidation),
    defaultValues: {
      Old_Password: "",
      New_Password: "",
      Confirm_Password: "",
    },
  });

  const handleSubmit = async (
    values: z.infer<typeof PasswordChangeValidation>
  ) => {
    if (!password) {
      toast.error("Session expired. Please login again.");
      form.reset();
      return;
    }

    if (values.Old_Password !== password) {
      toast.error("Please enter a valid old password");
      form.reset();
      return;
    }

    if (values.Confirm_Password !== values.New_Password) {
      toast.error("New password and confirmation do not match");
      form.reset();
      return;
    }

    setIsSubmitting(true);
    try {
      await UpdateCred(values);
      localStorage.removeItem("Password");
      setPassword(null);
      toast.success("Password updated successfully!", {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      });
      form.reset();
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
            <Shield className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Update Password
          </h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Secure your account with a new, strong password
          </p>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden">
          {/* Card Header with Gradient */}
          <div className="bg-linear-to-r from-emerald-600 to-emerald-500">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Key className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white">
                    Password Security
                  </CardTitle>
                  <CardDescription className="text-emerald-100">
                    Update your password credentials securely
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </div>

          {/* Card Content */}
          <CardContent className="p-8">
            {/* Security Tips */}
            <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Password Requirements
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      Minimum 6 characters long
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      Include uppercase and lowercase letters
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      Include at least one number or special character
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                {/* Form Fields Container */}
                <div className="space-y-6">
                  {/* Old Password Field */}
                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                      <label className="text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                    </div>
                    <CustomFormField
                      name="Old_Password"
                      control={form.control}
                      fieldType={formFieldTypes.INPUT}
                      placeholder="Enter your current password"
                      type="password"
                      inputClassName="h-fit py-2 px-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 w-[600px]"
                    />
                  </div>

                  {/* New Password Field */}
                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <label className="text-sm font-medium text-gray-700">
                        New Password
                      </label>
                    </div>
                    <CustomFormField
                      name="New_Password"
                      control={form.control}
                      fieldType={formFieldTypes.INPUT}
                      placeholder="Create a strong new password"
                      type="password"
                      inputClassName="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 w-[600px]"
                    />
                  </div>

                  {/* Confirm Password Field */}
                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <label className="text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                    </div>
                    <CustomFormField
                      name="Confirm_Password"
                      control={form.control}
                      fieldType={formFieldTypes.INPUT}
                      placeholder="Re-enter your new password"
                      type="password"
                      inputClassName="h-12 px-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 w-[600px]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-base font-medium rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Updating Password...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Lock className="h-5 w-5" />
                        Update Password
                      </div>
                    )}
                  </Button>

                  {/* Additional Info */}
                  <p className="text-xs text-center text-gray-500 mt-4">
                    Your password will be encrypted and stored securely. Make
                    sure to keep it confidential.
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminChangePassword;
