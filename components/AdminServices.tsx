"use client";
import { ServiceValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "./ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { Button } from "./ui/button";
import {
  GetService,
  PatchService,
  ServicePost,
  DeleteService,
  handleCloudinary,
} from "@/lib/actions";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { SquarePen, Trash2 } from "lucide-react";
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
} from "./ui/alert-dialog";
import Image from "next/image";

const AdminServices = () => {
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof ServiceValidation>>({
    resolver: zodResolver(ServiceValidation),
    defaultValues: {
      Title: "",
      Description: "",
      ImageUrl: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await GetService();

        // Handle null/undefined responses
        if (data === null || data === undefined) {
          console.warn("API returned null/undefined, treating as empty array");
          setServiceList([]);
        } else if (Array.isArray(data)) {
          setServiceList(data);
        } else {
          console.error("API returned non-array data:", data);
          setError("Received invalid data format");
          setServiceList([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch activities:", err);
        setError(err.message || "Failed to load activities. Please try again.");
        setServiceList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePost = async (values: z.infer<typeof ServiceValidation>) => {
    if (isEditing && editingItem) {
      await PatchService(values, editingItem.id);

      const updatedItem = {
        ...editingItem,
        ...values,
      };

      setServiceList((prev: any) =>
        prev.map((item: any) =>
          item.id === editingItem.id ? updatedItem : item
        )
      );

      toast.success("Service updated successfully!");
      setIsEditing(false);
      setEditingItem(null);
    } else {
      await ServicePost(values);

      const newServiceItem = {
        ...values,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      toast.success("Service posted successfully!");
      setServiceList((prev: any) => [newServiceItem, ...prev]);
    }

    form.reset();
  };

  const handleDelete = async (id: any) => {
    try {
      await DeleteService(id);
      setServiceList((prev: any) => prev.filter((item: any) => item.id !== id));
      toast.success("Service deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete Service");
    }
  };

  const handleEdit = (item: any) => {
    setIsEditing(true);
    setEditingItem(item);

    form.reset({
      Title: item.Title,
      Description: item.Description,
      ImageUrl: item.ImageUrl,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingItem(null);
    form.reset();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10b982]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-neutral-50">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error Loading Data</p>
          <p className="text-sm">{error}</p>
        </div>
        <Button
          onClick={() => window.location.reload()}
          className="bg-[#10b982] hover:bg-green-700"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 p-8 bg-neutral-50 min-h-screen">
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl border-2 border-[#10b982]/20">
        <CardHeader className="border-b pb-4 border-[#10b982]/50">
          <CardTitle className="text-3xl font-serif text-[#10b982]">
            {isEditing ? "Edit service" : "Service Creation"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isEditing
              ? "Update the service details below"
              : "Create entries for key organizational services."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePost)}
              className="flex flex-col gap-6"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <CustomFormField
                  name="Title"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Title"
                  placeholder="service title"
                />
                <CustomFormField
                  name="ImageUrl"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Select Image"
                  placeholder="select an Image"
                  previewUrl={previewUrl}
                  handleCloudinary={(result) =>
                    handleCloudinary(result, form, setPreviewUrl, "ImageUrl")
                  }
                />
              </div>
              <div className="grid md:grid-cols-1 gap-5 items-center">
                <CustomFormField
                  name="Description"
                  control={form.control}
                  fieldType={formFieldTypes.TEXTAREA}
                  label="Description:"
                  placeholder="describe your service"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-[#10b982] hover:bg-green-700 transition duration-300 mt-4 flex-1"
                >
                  {isEditing ? "Update Service" : "Submit Service"}
                </Button>
                {isEditing && (
                  <Button
                    type="button"
                    onClick={cancelEdit}
                    variant="outline"
                    className="mt-4"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
        {serviceList.map((item: any, idx: number) => (
          <Card
            key={idx}
            className="w-full sm:w-72 shadow-md hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden relative"
          >
            <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(item)}
                className="w-8 h-8 p-1 bg-white/80 hover:bg-white text-gray-600 hover:text-[#10b982]"
              >
                <SquarePen size={18} />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 p-1 bg-white/80 hover:bg-white text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Service</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this service? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(item.id || idx)}
                      className="bg-red-500 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <CardHeader className="bg-[#10b982]/10 border-b border-[#10b982]/30">
              <CardTitle className="text-xl font-serif text-[#10b982]">
                {item.Title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-4">
              <Image 
              src={item.ImageUrl}
              alt={item.Title}
              width={200}
              height={200}
              loading="eager"
              className="rounded-xl"
              />
              <p className="text-center font-normal text-gray-800 text-sm">
                {item.Description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
