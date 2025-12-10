"use client";
import CustomFormField, { formFieldTypes } from "@/components/customFormField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { CreateCred, UpdateCred } from "@/lib/actions";
import { login } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface params {
  params: Promise<{
    roleKey: string;
  }>;
}
export default function CreateUpdate({ params }: params) {
  const [roleKey, setRoleKey] = useState<string>("");
  const router = useRouter()

  useEffect(() => {
    async function getParams() {
      const { roleKey } = await params;
      setRoleKey(roleKey);
    }
    getParams();
  }, [params]);

  const form = useForm<z.infer<typeof login>>({
    resolver: zodResolver(login),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  if (!roleKey) {
    <div className="flex flex-col gap-3 items-center h-screen justify-center text-center">
      <h2 className="font-serif text-red-500 font-semibold">Routing Error</h2>
      <p className="font-serif text-black font-normal">
        Role key parameter is missing from URL
      </p>
    </div>;
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center gap-3">
      <Card className="w-80 px-4">
        <CardHeader>
          <CardTitle>{roleKey} Admin</CardTitle>
          <CardDescription>Admin role for the institution</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-5 items-center"
              onSubmit={form.handleSubmit((values) => {
                roleKey === "create" ? CreateCred(values) : UpdateCred(values);
                toast.success(
                  `${
                    roleKey === "create"
                      ? "Admin Creation is successful"
                      : "Updating Admin is Successful"
                  }`
                );
                form.reset();
                router.back()
              })}
            >
              <CustomFormField
                name="Email"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Email:"
                placeholder="Admin Email"
                type="email"
              />
              <CustomFormField
                name="Password"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Password:"
                placeholder="Admin password"
                type="password"
              />
              <Button type="submit" className="cursor-pointer">
                {roleKey === "create" ? "Create" : "Update"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
