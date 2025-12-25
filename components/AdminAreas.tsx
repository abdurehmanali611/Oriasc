"use client";
import { AreaPost, DeleteArea, GetArea, PatchArea } from "@/lib/actions";
import { areaValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";
import CustomFormField, { formFieldTypes } from "./customFormField";
import { AreaCategory } from "@/constants";
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

const AdminAreas = () => {
  const [areaList, setAreaList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof areaValidation>>({
    resolver: zodResolver(areaValidation) as any,
    defaultValues: {
      Name: "",
      City: "",
      Contact: "",
      Category: "",
      Latitude: "9.0192",
      Longitude: "38.7525",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await GetArea();

        if (data === null || data === undefined) {
          console.warn("API returned null/undefined, treating as empty array");
          setAreaList([]);
        } else if (Array.isArray(data)) {
          setAreaList(data);
        } else {
          console.error("API returned non-array data:", data);
          setError("Received invalid data format");
          setAreaList([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch Areas:", err);
        setError(err.message || "Failed to load Areas. Please try again.");
        setAreaList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePost = async (values: z.infer<typeof areaValidation>) => {
    if (isEditing && editingItem) {
      await PatchArea(values, editingItem.id);

      const updatedItem = {
        ...editingItem,
        ...values,
      };

      setAreaList((prev: any) =>
        prev.map((item: any) =>
          item.id === editingItem.id ? updatedItem : item
        )
      );

      toast.success("Area updated successfully!");
      setIsEditing(false);
      setEditingItem(null);
    } else {
      await AreaPost(values);

      const newAreaItem = {
        ...values,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      toast.success("Areas posted successfully!");
      setAreaList((prev: any) => [newAreaItem, ...prev]);
    }

    form.reset();
  };

  const handleDelete = async (id: any) => {
    try {
      await DeleteArea(id);
      setAreaList((prev: any) => prev.filter((item: any) => item.id !== id));
      toast.success("Area deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete Area");
    }
  };

  const handleEdit = (item: any) => {
    setIsEditing(true);
    setEditingItem(item);

    form.reset({
      Name: item.Name,
      City: item.City,
      Category: item.Category,
      Contact: item.Contact,
      Latitude: item.Latitude,
      Longitude: item.Longitude,
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
            {isEditing ? "Edit Area" : "Area Creation"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isEditing
              ? "Update the Area details below"
              : "Create entries for key organizational Area."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePost)}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <CustomFormField
                  name="Name"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Name:"
                  placeholder="area name"
                  inputClassName="h-fit p-2 w-full"
                />
                <CustomFormField
                  name="Category"
                  control={form.control}
                  fieldType={formFieldTypes.SELECT}
                  label="Category:"
                  placeholder="area category"
                  listdisplay={AreaCategory}
                />
                <CustomFormField
                  name="City"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="City: "
                  placeholder="city name"
                  inputClassName="h-fit p-2 w-full"
                />
              </div>
              <div className="flex items-center justify-between">
                <CustomFormField
                  name="Contact"
                  control={form.control}
                  fieldType={formFieldTypes.PHONE_INPUT}
                  label="Contact: "
                  placeholder="contact of area"
                  inputClassName="h-fit p-2 w-full"
                />
                <CustomFormField
                  name="Latitude"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Latitude:"
                  placeholder="location Latitude"
                  inputClassName="h-fit p-2 w-full"
                />
                <CustomFormField
                  name="Longitude"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Longitude: "
                  placeholder="Location Longitude"
                  inputClassName="h-fit p-2 w-full"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-[#10b982] hover:bg-green-700 transition duration-300 mt-4 flex-1"
                >
                  {isEditing ? "Update Area" : "Submit Area"}
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
        {areaList.map((item: any, idx: number) => (
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
                    <AlertDialogTitle>Delete Area</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this area? This action
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
                {item.Name}: {item.City}, Ethiopia
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 p-4">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-3 items-center">
                  <h3 className="font-bold text-xl text-red-600">Category</h3>
                  <p>{item.Category}</p>
                </div>
                <div className="flex flex-col gap-3 items-center">
                  <h3 className="text-red-600 font-bold text-xl">Contact</h3>
                  <p>{item.Contact}</p>
                </div>
                <div className="flex flex-col gap-3 items-center">
                  <h3 className="text-red-600 font-bold text-xl">Latitude</h3>
                  <p>{item.Latitude}</p>
                </div>
                <div className="flex flex-col gap-3 items-center">
                  <h3 className="text-red-600 font-bold text-xl">Longitude</h3>
                  <p>{item.Longitude}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminAreas;
