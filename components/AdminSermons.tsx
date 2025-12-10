"use client";
import { SermonValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
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
import {
  handleCloudinary,
  SermonPost,
  DeleteSermon,
  PatchSermon,
  GetSermon,
} from "@/lib/actions";
import { Button } from "./ui/button";
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

const AdminSermons = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [sermonList, setSermonList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof SermonValidation>>({
    resolver: zodResolver(SermonValidation),
    defaultValues: {
      Title: "",
      Slug: "",
      Description: "",
      ImageVideoUrl: "",
      Speaker: "",
    },
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await GetSermon();

        // Handle null/undefined responses
        if (data === null || data === undefined) {
          console.warn("API returned null/undefined, treating as empty array");
          setSermonList([]);
        } else if (Array.isArray(data)) {
          setSermonList(data);
        } else {
          console.error("API returned non-array data:", data);
          setError("Received invalid data format");
          setSermonList([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch sermons:", err);
        setError(err.message || "Failed to load sermons. Please try again.");
        setSermonList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const isVideoUrl = (url: string) => {
    if (!url) return false;
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"];
    return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
  };

  const handlePost = async (values: z.infer<typeof SermonValidation>) => {
    if (isEditing && editingItem) {
      await PatchSermon(values, editingItem.id);

      const updatedItem = {
        ...editingItem,
        ...values,
      };

      setSermonList((prev: any) =>
        prev.map((item: any) =>
          item.id === editingItem.id ? updatedItem : item
        )
      );

      toast.success("Sermon updated successfully!");
      setIsEditing(false);
      setEditingItem(null);
    } else {
      await SermonPost(values);

      toast.success("Sermon posted successfully!");
      setSermonList((prev: any) => [
        { ...values, id: Date.now(), createdAt: new Date().toISOString() },
        ...prev,
      ]);
    }

    form.reset();
    setPreviewUrl(null);
  };

  const handleDelete = async (id: any) => {
    try {
      await DeleteSermon(id);
      setSermonList((prev: any) => prev.filter((item: any) => item.id !== id));
      toast.success("Sermon deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete sermon");
    }
  };

  const handleEdit = (item: any) => {
    setIsEditing(true);
    setEditingItem(item);
    setPreviewUrl(item.ImageVideoUrl);

    form.reset({
      Title: item.Title,
      Slug: item.Slug,
      Description: item.Description,
      ImageVideoUrl: item.ImageVideoUrl,
      Speaker: item.Speaker,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingItem(null);
    form.reset();
    setPreviewUrl(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10b982]"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
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
    );
  }

  return (
    <div className="flex flex-col gap-10 items-center p-8 bg-neutral-50 min-h-screen">
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl border-2 border-[#10b982]/20">
        <CardHeader className="border-b pb-4 border-[#10b982]/50">
          <CardTitle className="text-3xl font-serif text-[#10b982]">
            {isEditing ? "Edit Sermon/Lecture" : "Sermon/Lecture Creation"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isEditing
              ? "Update the sermon details below"
              : "Enter details to create a new sermon or lecture post."}
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
                  placeholder="sermon title"
                />
                <CustomFormField
                  name="Slug"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Slug/Topic"
                  placeholder="sermon slug"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5 items-start">
                <CustomFormField
                  name="Description"
                  control={form.control}
                  fieldType={formFieldTypes.TEXTAREA}
                  label="Description"
                  placeholder="sermon description"
                />
                <CustomFormField
                  name="ImageVideoUrl"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Image/Video URL"
                  previewUrl={previewUrl}
                  handleCloudinary={(result) =>
                    handleCloudinary(
                      result,
                      form,
                      setPreviewUrl,
                      "ImageVideoUrl",
                      setFileType
                    )
                  }
                />
              </div>
              <CustomFormField
                name="Speaker"
                control={form.control}
                fieldType={formFieldTypes.INPUT}
                label="Speaker/Shaykh"
                placeholder="speaker name"
              />
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-[#10b982] hover:bg-green-700 transition duration-300 mt-4 flex-1"
                >
                  {isEditing ? "Update Sermon" : "Submit Sermon"}
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
        {sermonList.map((sermon: any, idx: number) => (
          <Card
            key={idx}
            className="w-full sm:w-80 shadow-md hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden relative"
          >
            <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(sermon)}
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
                    <AlertDialogTitle>Delete Sermon</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this sermon? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(sermon.id || idx)}
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
                {sermon.Title}
              </CardTitle>
              <CardDescription className="text-gray-700">
                {sermon.Slug}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-4">
              <div className="flex flex-col gap-4 items-center">
                {isVideoUrl(sermon.ImageVideoUrl) ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden">
                    <video
                      src={sermon.ImageVideoUrl}
                      controls
                      className="w-full h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <Image
                    src={sermon.ImageVideoUrl}
                    alt={sermon.Title}
                    width={350}
                    height={350}
                    loading="eager"
                    className="rounded-xl object-cover h-48 w-full"
                  />
                )}
                <p className="text-sm text-gray-800 text-center">
                  {sermon.Description}
                </p>
              </div>
              <CardFooter className="flex justify-end p-0 pt-3 border-t border-gray-200">
                <p className="font-semibold text-gray-700 text-sm">
                  Speaker:{" "}
                  <span className="font-normal text-[#10b982]">
                    {sermon.Speaker}
                  </span>
                </p>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminSermons;
