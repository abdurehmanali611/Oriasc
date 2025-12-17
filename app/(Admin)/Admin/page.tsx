"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { AuthAdmin } from "@/lib/actions";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

export default function AdminAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof login>>({
    resolver: zodResolver(login),
    defaultValues: {
      UserName: "",
      Password: "",
    },
  });

  if (error) {
    return (
      <Alert className="bg-red-200 flex flex-col gap-3 items-center w-full justify-center">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Admin Login Page</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-5 w-64"
              onSubmit={form.handleSubmit((values) =>
                AuthAdmin(values, setIsLoading, setError, router)
              )}
            >
              <FormField
                name="UserName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UserName:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="abdurehmanali611"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="Password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="your password"
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="cursor-pointer">
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
