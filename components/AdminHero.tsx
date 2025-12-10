"use client";
import { HeroValidation } from "@/lib/validation";
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
import { cta_links } from "@/constants";
import { Button } from "./ui/button";
import {
  DeleteHero,
  GetHero,
  handleCloudinary,
  HeroPost,
  PatchHero,
} from "@/lib/actions";
import Link from "next/link";
import { useState, useEffect } from "react";
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

const AdminHero = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [heroList, setHeroList] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof HeroValidation>>({
    resolver: zodResolver(HeroValidation),
    defaultValues: {
      Title: "",
      Body: "",
      startDate: undefined,
      endDate: undefined,
      ImageUrl: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await GetHero();

        if (data === null || data === undefined) {
          console.warn("API returned null/undefined, treating as empty array");
          setHeroList([]);
        } else if (Array.isArray(data)) {
          setHeroList(data);
        } else {
          console.error("API returned non-array data:", data);
          setError("Received invalid data format");
          setHeroList([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch hero data:", err);
        setError(err.message || "Failed to load data. Please try again.");
        setHeroList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePost = async (values: z.infer<typeof HeroValidation>) => {
    if (isEditing && editingItem) {
      const data = await PatchHero(values, editingItem.id);

      const updatedItem = {
        ...editingItem,
        ...data,
        startDate: data.startDate
          ? new Date(data.startDate).toLocaleDateString()
          : "N/A",
        endDate: data.endDate
          ? new Date(data.endDate).toLocaleDateString()
          : "N/A",
      };

      setHeroList((prev: any) =>
        prev.map((item: any) =>
          item.id === editingItem.id ? updatedItem : item
        )
      );

      toast.success("Hero card updated successfully!");
      setIsEditing(false);
      setEditingItem(null);
    } else {
      await HeroPost(values);

      const newHeroItem = {
        ...values,
        id: Date.now(),
        startDate: values.startDate
          ? new Date(values.startDate).toLocaleDateString()
          : "N/A",
        endDate: values.endDate
          ? new Date(values.endDate).toLocaleDateString()
          : "N/A",
      };

      toast.success("Hero card posted successfully!");
      setHeroList((prev: any) => [newHeroItem, ...prev]);
    }

    form.reset();
    setPreviewUrl(null);
  };

  const handleDelete = async (id: any) => {
    try {
      await DeleteHero(id);
      setHeroList((prev: any) => prev.filter((item: any) => item.id !== id));
      toast.success(`Hero Card deleted successfully!`);
    } catch (error) {
      toast.error("Failed to delete hero card");
    }
  };

  const handleEdit = (item: any) => {
    setIsEditing(true);
    setEditingItem(item);
    setPreviewUrl(item.ImageUrl);

    form.reset({
      Title: item.Title,
      Body: item.Body,
      startDate:
        item.startDate !== "N/A" ? new Date(item.startDate) : undefined,
      endDate: item.endDate !== "N/A" ? new Date(item.endDate) : undefined,
      ImageUrl: item.ImageUrl,
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
    <div className="flex items-center flex-col gap-10 p-8 bg-neutral-50 min-h-screen">
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl border-2 border-[#10b982]/20">
        <CardHeader className="border-b pb-4 border-[#10b982]/50">
          <CardTitle className="text-3xl font-serif text-[#10b982]">
            Hero Section Creation
          </CardTitle>
          <CardDescription className="text-gray-600">
            Define the main promotional content for your site.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(handlePost)}
            >
              <div className="grid md:grid-cols-2 gap-5 items-center">
                <CustomFormField
                  name="Title"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Title"
                  placeholder="your title"
                />
                <CustomFormField
                  name="ImageUrl"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Image"
                  previewUrl={previewUrl}
                  handleCloudinary={(result) =>
                    handleCloudinary(result, form, setPreviewUrl, "ImageUrl")
                  }
                />
              </div>
              <div className="flex items-center justify-center">
                <CustomFormField
                  name="Body"
                  control={form.control}
                  fieldType={formFieldTypes.TEXTAREA}
                  label="Body"
                  placeholder="Hero Body"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <CustomFormField
                  name="startDate"
                  control={form.control}
                  fieldType={formFieldTypes.CALENDAR}
                  label="Start Date:"
                  placeholder="Start Date"
                />
                <CustomFormField
                  name="endDate"
                  control={form.control}
                  fieldType={formFieldTypes.CALENDAR}
                  label="End Date:"
                  placeholder="End Date"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-[#10b982] hover:bg-green-700 transition duration-300 mt-4 flex-1"
                >
                  {isEditing ? "Update Hero Card" : "Submit Hero Card"}
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
        {heroList.map((item: any, idx: number) => (
          <Card
            key={idx}
            className="w-full sm:w-96 shadow-md hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden relative"
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
                    <AlertDialogTitle>Delete Hero Card</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this hero card? This
                      action cannot be undone.
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
            {/* Card Content */}
            <CardHeader className="bg-[#10b982]/10 border-b border-[#10b982]/30">
              <CardTitle className="text-2xl font-serif text-[#10b982]">
                {item.Title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-4">
              <Image
                src={item.ImageUrl}
                alt={item.Title}
                width={300}
                height={300}
                loading="eager"
                className="rounded-xl object-cover h-48 w-full"
              />
              <p className="text-center text-base font-normal text-gray-800">
                {item.Body}
              </p>
              <CardFooter className="flex justify-between items-center p-0 pt-3 border-t border-gray-200">
                <p className="flex flex-col gap-1 font-semibold text-gray-700 text-sm">
                  Start Date:{" "}
                  <span className="font-normal text-[#10b982]">
                    {item.startDate}
                  </span>
                </p>
                <p className="flex flex-col gap-1 font-semibold text-gray-700 text-sm">
                  End Date:{" "}
                  <span className="font-normal text-[#10b982]">
                    {item.endDate}
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

export default AdminHero;
