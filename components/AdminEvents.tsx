"use client";
import { EventValidation } from "@/lib/validation";
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
import {
  EventPost,
  DeleteEvent,
  PatchEvent,
  handleCloudinary,
  GetEvent,
} from "@/lib/actions";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Image from "next/image";
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

const AdminEvents = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [eventList, setEventList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof EventValidation>>({
    resolver: zodResolver(EventValidation),
    defaultValues: {
      Title: "",
      Slug: "",
      Description: "",
      ImageUrl: "",
      StartDate: undefined,
      EndDate: undefined,
    },
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await GetEvent();

        // Handle null/undefined responses
        if (data === null || data === undefined) {
          console.warn("API returned null/undefined, treating as empty array");
          setEventList([]);
        } else if (Array.isArray(data)) {
          setEventList(data);
        } else {
          console.error("API returned non-array data:", data);
          setError("Received invalid data format");
          setEventList([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch events:", err);
        setError(err.message || "Failed to load events. Please try again.");
        setEventList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePost = async (values: z.infer<typeof EventValidation>) => {
    if (isEditing && editingItem) {
      await PatchEvent(values, editingItem.id);

      const updatedItem = {
        ...editingItem,
        ...values,
        StartDate: values.StartDate
          ? new Date(values.StartDate).toLocaleDateString("en-US")
          : "N/A",
        EndDate: values.EndDate
          ? new Date(values.EndDate).toLocaleDateString("en-US")
          : "N/A",
      };

      setEventList((prev: any) =>
        prev.map((item: any) =>
          item.id === editingItem.id ? updatedItem : item
        )
      );

      toast.success("Event updated successfully!");
      setIsEditing(false);
      setEditingItem(null);
    } else {
      await EventPost(values);

      const newEventItem = {
        ...values,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        StartDate: values.StartDate
          ? new Date(values.StartDate).toLocaleDateString("en-US")
          : "N/A",
        EndDate: values.EndDate
          ? new Date(values.EndDate).toLocaleDateString("en-US")
          : "N/A",
      };

      toast.success("Event posted successfully!");
      setEventList((prev: any) => [newEventItem, ...prev]);
    }

    form.reset();
    setPreviewUrl(null);
  };

  const handleDelete = async (id: any) => {
    try {
      await DeleteEvent(id);
      setEventList((prev: any) => prev.filter((item: any) => item.id !== id));
      toast.success("Event deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  const handleEdit = (item: any) => {
    setIsEditing(true);
    setEditingItem(item);
    setPreviewUrl(item.ImageUrl);

    form.reset({
      Title: item.Title,
      Slug: item.Slug,
      Description: item.Description,
      ImageUrl: item.ImageUrl,
      StartDate:
        item.StartDate !== "N/A" ? new Date(item.StartDate) : undefined,
      EndDate: item.EndDate !== "N/A" ? new Date(item.EndDate) : undefined,
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
            {isEditing ? "Edit Event" : "Event Creation"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isEditing
              ? "Update the event details below"
              : "Enter details to create a new elegant event entry."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(handlePost)}
            >
              <div className="grid md:grid-cols-2 gap-5">
                <CustomFormField
                  name="Title"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Title"
                  placeholder="event title"
                />
                <CustomFormField
                  name="Slug"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Slug/Leading Word"
                  placeholder="event slug"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5 items-start">
                <CustomFormField
                  name="Description"
                  control={form.control}
                  fieldType={formFieldTypes.TEXTAREA}
                  label="Description"
                  placeholder="event description"
                />
                <CustomFormField
                  name="ImageUrl"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Event Image"
                  handleCloudinary={(result) =>
                    handleCloudinary(result, form, setPreviewUrl, "ImageUrl")
                  }
                  previewUrl={previewUrl}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <CustomFormField
                  name="StartDate"
                  control={form.control}
                  fieldType={formFieldTypes.CALENDAR}
                  label="Start Date"
                  placeholder="Select Date"
                />
                <CustomFormField
                  name="EndDate"
                  control={form.control}
                  fieldType={formFieldTypes.CALENDAR}
                  label="Event End Date"
                  placeholder="select Date"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-[#10b982] hover:bg-green-700 transition duration-300 mt-4 flex-1"
                >
                  {isEditing ? "Update Event" : "Submit Event"}
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
        {eventList.map((event: any, idx: number) => (
          <Card
            key={idx}
            className="w-full sm:w-80 shadow-md hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden relative"
          >
            <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(event)}
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
                    <AlertDialogTitle>Delete Event</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this event? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(event.id || idx)}
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
                {event.Title}
              </CardTitle>
              <CardDescription className="text-gray-700">
                {event.Slug}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-4">
              <div className="flex flex-col gap-4 items-center">
                <Image
                  src={event.ImageUrl}
                  alt={event.Title}
                  width={350}
                  height={350}
                  loading="eager"
                  className="rounded-xl object-cover h-48 w-full"
                />
                <p className="text-sm text-gray-800 text-center">
                  {event.Description}
                </p>
              </div>
              <CardFooter className="flex items-center justify-between p-0 pt-3 border-t border-gray-200">
                <p className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
                  Start Date:{" "}
                  <span className="font-normal text-[#10b982]">
                    {event.StartDate}
                  </span>
                </p>
                <p className="flex flex-col gap-1 text-sm font-semibold text-gray-700">
                  End Date:{" "}
                  <span className="font-normal text-[#10b982]">
                    {event.EndDate}
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

export default AdminEvents;
