"use client";
import { TestimonialValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { useState, useEffect } from "react";
import {
  handleCloudinary,
  TestimonialPost,
  DeleteTestimonial,
  PatchTestimonial,
  GetTestimonial,
} from "@/lib/actions";
import { Button } from "./ui/button";
import Image from "next/image";
import { Star, SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";
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

const AdminTestimonial = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [testimonialList, setTestimonialList] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof TestimonialValidation>>({
    resolver: zodResolver(TestimonialValidation) as any,
    defaultValues: {
      Name: "",
      Proffession: "",
      ImageUrl: "",
      Content: "",
      Rating: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await GetTestimonial();

        if (data === null || data === undefined) {
          console.warn("API returned null/undefined, treating as empty array");
          setTestimonialList([]);
        } else if (Array.isArray(data)) {
          setTestimonialList(data);
        } else {
          console.error("API returned non-array data:", data);
          setError("Received invalid data format");
          setTestimonialList([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch hero data:", err);
        setError(err.message || "Failed to load data. Please try again.");
        setTestimonialList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePost = async (values: z.infer<typeof TestimonialValidation>) => {
    if (isEditing && editingItem) {
      await PatchTestimonial(values, editingItem.id);

      const updatedItem = {
        ...editingItem,
        ...values,
      };

      setTestimonialList((prev: any) =>
        prev.map((item: any) =>
          item.id === editingItem.id ? updatedItem : item
        )
      );

      toast.success("Testimonial updated successfully!");
      setIsEditing(false);
      setEditingItem(null);
    } else {
      await TestimonialPost(values);

      toast.success("Testimonial posted successfully!");
      setTestimonialList((prev: any) => [
        { ...values, id: Date.now(), createdAt: new Date().toISOString() },
        ...prev,
      ]);
    }

    form.reset();
    setPreviewUrl(null);
  };

  const handleDelete = async (id: any) => {
    try {
      await DeleteTestimonial(id);
      setTestimonialList((prev: any) =>
        prev.filter((item: any) => item.id !== id)
      );
      toast.success("Testimonial deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete testimonial");
    }
  };

  const handleEdit = (item: any) => {
    setIsEditing(true);
    setEditingItem(item);
    setPreviewUrl(item.ImageUrl);

    form.reset({
      Name: item.Name,
      Proffession: item.Proffession,
      ImageUrl: item.ImageUrl,
      Content: item.Content,
      Rating: item.Rating,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingItem(null);
    form.reset();
    setPreviewUrl(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10b982]"></div>
      </div>
    );
  }

  // Error state
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
    <div className="flex flex-col gap-10 items-center p-8 bg-neutral-50 min-h-screen">
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl border-2 border-[#10b982]/20">
        <CardHeader className="border-b pb-4 border-[#10b982]/50">
          <CardTitle className="text-3xl font-serif text-[#10b982]">
            {isEditing ? "Edit Testimonial" : "Testimonial Creation"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isEditing
              ? "Update the testimonial details below"
              : "Capture feedback and testimonials from members or clients."}
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
                  name="Name"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Name"
                  placeholder="Client/Member Name"
                />
                <CustomFormField
                  name="Proffession"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Profession/Title"
                  placeholder="e.g., Engineer, Student"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5 items-start">
                <CustomFormField
                  name="Content"
                  control={form.control}
                  fieldType={formFieldTypes.TEXTAREA}
                  label="Content"
                  placeholder="The full testimonial text"
                />
                <CustomFormField
                  name="ImageUrl"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Client Image"
                  previewUrl={previewUrl}
                  handleCloudinary={(result) =>
                    handleCloudinary(result, form, setPreviewUrl, "ImageUrl")
                  }
                />
              </div>
              <CustomFormField
                name="Rating"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Rating"
                type="number"
                placeholder="Enter rating (0-5)"
              />
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-[#10b982] hover:bg-green-700 transition duration-300 mt-4 flex-1"
                >
                  {isEditing ? "Update Testimonial" : "Submit Testimonial"}
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
        {testimonialList.map((test: any, idx: number) => (
          <Card
            key={idx}
            className="w-full sm:w-80 shadow-md hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden p-6 relative"
          >
            <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(test)}
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
                    <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this testimonial? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(test.id || idx)}
                      className="bg-red-500 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <CardContent className="flex flex-col gap-5 p-0">
              <div className="flex items-start gap-4">
                <Image
                  src={test.ImageUrl}
                  alt={test.Name}
                  width={60}
                  height={60}
                  loading="eager"
                  className="rounded-full object-cover w-16 h-16 border-2 border-[#10b982]/50"
                />
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold text-[#10b982]">
                    {test.Name}
                  </h2>
                  <h2 className="text-sm text-gray-600">{test.Proffession}</h2>
                </div>
              </div>
              <p className="text-gray-800 italic border-l-4 border-[#10b982]/50 pl-3">
                "{test.Content}"
              </p>
              <div className="flex gap-1 items-center justify-end pt-2 border-t border-gray-100">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < test.Rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonial;
