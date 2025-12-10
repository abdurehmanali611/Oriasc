"use client";
import { BlogValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import {
  BlogPost,
  DeleteBlog,
  PatchBlog,
  handleCloudinary,
  GetBlog,
} from "@/lib/actions";
import Image from "next/image";
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

const AdminBlogs = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [blogList, setBlogList] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof BlogValidation>>({
    resolver: zodResolver(BlogValidation),
    defaultValues: {
      Title: "",
      Description: "",
      Slug: "",
      ImageUrl: "",
      Author: "",
    },
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await GetBlog();

        // Handle null/undefined responses
        if (data === null || data === undefined) {
          console.warn("API returned null/undefined, treating as empty array");
          setBlogList([]);
        } else if (Array.isArray(data)) {
          setBlogList(data);
        } else {
          console.error("API returned non-array data:", data);
          setError("Received invalid data format");
          setBlogList([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch blogs:", err);
        setError(err.message || "Failed to load blogs. Please try again.");
        setBlogList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePost = async (values: z.infer<typeof BlogValidation>) => {
    if (isEditing && editingItem) {
      await PatchBlog(values, editingItem.id);

      const updatedItem = {
        ...editingItem,
        ...values,
      };

      setBlogList((prev: any) =>
        prev.map((item: any) =>
          item.id === editingItem.id ? updatedItem : item
        )
      );

      toast.success("Blog updated successfully!");
      setIsEditing(false);
      setEditingItem(null);
    } else {
      await BlogPost(values);

      toast.success("Blog posted successfully!");
      setBlogList((prev: any) => [
        { ...values, id: Date.now(), createdAt: new Date().toISOString() },
        ...prev,
      ]);
    }

    form.reset();
    setPreviewUrl(null);
  };

  const handleDelete = async (id: any) => {
    try {
      await DeleteBlog(id);
      setBlogList((prev: any) => prev.filter((item: any) => item.id !== id));
      toast.success("Blog deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const handleEdit = (item: any) => {
    setIsEditing(true);
    setEditingItem(item);
    setPreviewUrl(item.ImageUrl);

    form.reset({
      Title: item.Title,
      Description: item.Description,
      Slug: item.Slug,
      ImageUrl: item.ImageUrl,
      Author: item.Author,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingItem(null);
    form.reset();
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col gap-10 items-center p-8 bg-neutral-50 min-h-screen">
      {isLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10b982]"></div>
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
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
      )}

      {!isLoading && !error && (
        <>
          <Card className="w-full max-w-4xl shadow-xl rounded-2xl border-2 border-[#10b982]/20">
            <CardHeader className="border-b pb-4 border-[#10b982]/50">
              <CardTitle className="text-3xl font-serif text-[#10b982]">
                {isEditing ? "Edit Blog Post" : "Blog Creation Form"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {isEditing
                  ? "Update the blog post details below"
                  : "Enter details to create a new blog post."}
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
                      placeholder="Blog Title"
                    />
                    <CustomFormField
                      name="Slug"
                      control={form.control}
                      fieldType={formFieldTypes.INPUT}
                      label="Slug/Objective"
                      placeholder="Blog Slug"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5 items-start">
                    <CustomFormField
                      name="Description"
                      control={form.control}
                      fieldType={formFieldTypes.TEXTAREA}
                      label="Description"
                      placeholder="Blog Description"
                    />
                    <CustomFormField
                      name="ImageUrl"
                      control={form.control}
                      fieldType={formFieldTypes.IMAGE_UPLOADER}
                      label="Select Image"
                      placeholder="Blog Image"
                      previewUrl={previewUrl}
                      handleCloudinary={(result) =>
                        handleCloudinary(
                          result,
                          form,
                          setPreviewUrl,
                          "ImageUrl"
                        )
                      }
                    />
                  </div>
                  <CustomFormField
                    name="Author"
                    control={form.control}
                    fieldType={formFieldTypes.INPUT}
                    label="Author"
                    placeholder="Blog Author"
                  />
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      className="bg-[#10b982] hover:bg-green-700 transition duration-300 mt-4 flex-1"
                    >
                      {isEditing ? "Update Blog Post" : "Submit Blog Post"}
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
            {blogList.map((blog: any, idx: number) => (
              <Card
                key={idx}
                className="w-full sm:w-80 shadow-md hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden relative"
              >
                <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(blog)}
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
                        <AlertDialogTitle>Delete Blog</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this blog post? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(blog.id || idx)}
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
                    {blog.Title}
                  </CardTitle>
                  <CardDescription className="text-gray-700">
                    {blog.Slug}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-5 p-4">
                  <div className="flex flex-col gap-4 items-center">
                    <Image
                      src={blog.ImageUrl}
                      alt={blog.Title}
                      width={350}
                      height={350}
                      loading="eager"
                      className="rounded-xl object-cover h-48 w-full"
                    />
                    <p className="text-sm text-gray-800 text-center">
                      {blog.Description}
                    </p>
                  </div>
                  <CardFooter className="flex justify-end p-0 pt-3 border-t border-gray-200">
                    <p className="font-semibold text-gray-700 text-sm">
                      Author:{" "}
                      <span className="font-normal text-[#10b982]">
                        {blog.Author}
                      </span>
                    </p>
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminBlogs;
