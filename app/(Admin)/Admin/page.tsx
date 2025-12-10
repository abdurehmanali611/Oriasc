"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { AuthAdmin, CredFetch } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { AlertTriangle } from "lucide-react";

export default function AdminAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adminList, setAdminList] = useState<any[]>([]);
  const [passKey, setPassKey] = useState("");
  const [trialLimit, setTrialLimit] = useState(3);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof login>>({
    resolver: zodResolver(login),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  useEffect(() => {
    async function fetchAdmins() {
      const admins = await CredFetch();
      setAdminList(admins);
    }
    fetchAdmins();
  }, [CredFetch]);

  const handleOtpContinue = (type: "create" | "update") => {
    if (passKey === "oriasc") {
      setOtpError(null);
      setPassKey("");

      if (type === "create") {
        setCreateOpen(false);
        router.push("/CreateUpdate/create");
      } else {
        setUpdateOpen(false);
        router.push("/CreateUpdate/update");
      }
    } else {
      setTrialLimit((prev) => prev - 1);
      setOtpError(`Invalid OTP. ${trialLimit - 1} attempts remaining.`);

      setPassKey("");

      return;
    }
  };

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
                name="Email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="abdurehmanali611@gmail.com"
                        type="email"
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
          <CardFooter className="cursor-pointer pt-4 flex flex-col gap-2">
            {adminList.length === 0 ? (
              <AlertDialog open={createOpen} onOpenChange={setCreateOpen}>
                <AlertDialogTrigger
                  disabled={trialLimit === 0}
                  asChild
                  className="cursor-pointer self-end underline"
                >
                  <Button variant="ghost">Create Admin</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-fit">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Manager</AlertDialogTitle>
                    <AlertDialogDescription>
                      Do you have an auth to Create an Admin
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <InputOTP
                    maxLength={6}
                    value={passKey}
                    onChange={(text) => {
                      setPassKey(text);
                    }}
                  >
                    <InputOTPGroup className="bg-gray-200 text-black">
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                    <InputOTPGroup className="bg-gray-200 text-black">
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPGroup className="bg-gray-200 text-black">
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup className="bg-gray-200 text-black">
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPGroup className="bg-gray-200 text-black">
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                    <InputOTPGroup className="bg-gray-200 text-black">
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className="cursor-pointer"
                      onClick={() => {
                        setPassKey("");
                      }}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="cursor-pointer"
                      onClick={() => handleOtpContinue("create")}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog open={updateOpen} onOpenChange={setUpdateOpen}>
                <AlertDialogTrigger
                  disabled={trialLimit === 0}
                  asChild
                  className="cursor-pointer self-end underline"
                >
                  <Button variant="ghost">Update Admin</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-fit">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Manager</AlertDialogTitle>
                    <AlertDialogDescription>
                      Do you have an auth to Create an Admin
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <InputOTP
                    maxLength={6}
                    value={passKey}
                    onChange={(text) => {
                      setPassKey(text);
                    }}
                  >
                    <InputOTPGroup className="bg-gray-200 text-black">
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                    <InputOTPGroup className="bg-gray-200 text-black">
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPGroup className="bg-gray-200 text-black">
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup className="bg-gray-200 text-black">
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPGroup className="bg-gray-200 text-black">
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                    <InputOTPGroup className="bg-gray-200 text-black">
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      className="cursor-pointer"
                      onClick={() => {
                        setPassKey("");
                      }}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="cursor-pointer"
                      onClick={() => handleOtpContinue("update")}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <p className="text-red-600 font-serif text-lg">{otpError}</p>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
