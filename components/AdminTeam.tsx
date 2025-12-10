"use client";
import { TeamValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
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
import {
  handleCloudinary,
  TeamPost,
  DeleteTeam,
  PatchTeam,
  GetTeam,
} from "@/lib/actions";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, SquarePen, Trash2 } from "lucide-react";
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

const TeamMemberCard = ({
  member,
  isLeader = false,
  handleDelete,
  handleEdit,
}: {
  member: any;
  isLeader?: boolean;
  handleDelete: (id: any) => void;
  handleEdit: (item: any) => void;
}) => {
  return (
    <Card
      className={`
            w-full ${isLeader ? "max-w-4xl" : "sm:w-80"} 
            shadow-xl transition duration-300 rounded-2xl overflow-hidden p-6 relative
            ${
              isLeader
                ? "border-4 border-[#10b982]"
                : "border-2 border-[#10b982]/20"
            }
            ${isLeader ? "bg-[#10b982]/5" : "bg-white hover:shadow-2xl"}
        `}
    >
      <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleEdit(member)}
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
              <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this team member? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDelete(member.id || member.Name)}
                className="bg-red-500 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <CardContent
        className={`flex flex-col items-center text-center gap-4 p-0 ${
          isLeader ? "md:flex-row md:text-left md:items-start" : ""
        }`}
      >
        <Image
          src={member.ImageUrl}
          alt={member.Name}
          width={isLeader ? 200 : 150}
          height={isLeader ? 200 : 150}
          loading="eager"
          className={`
                        rounded-full object-cover 
                        ${
                          isLeader ? "w-48 h-48 border-8" : "w-32 h-32 border-4"
                        } 
                        border-[#10b982]/50 shadow-lg shrink-0
                    `}
        />
        <div
          className={`flex flex-col gap-2 w-full ${isLeader ? "md:ml-6" : ""}`}
        >
          <h2
            className={`font-extrabold text-[#10b982] font-serif ${
              isLeader ? "text-4xl" : "text-xl"
            }`}
          >
            {member.Name}
          </h2>
          <p
            className={`font-light text-gray-700 ${
              isLeader ? "text-2xl" : "text-lg"
            }`}
          >
            {member.Position}
          </p>
          <div
            className={`flex gap-6 items-center ${
              isLeader
                ? "justify-start mt-4"
                : "justify-center pt-4 border-t border-gray-200 w-full mt-4"
            }`}
          >
            <Link
              href={member.Facebook}
              className="text-gray-500 hover:text-[#10b982] transition duration-300"
              aria-label={`Facebook profile of ${member.Name}`}
            >
              <Facebook size={isLeader ? 28 : 24} />
            </Link>
            <Link
              href={member.Instagram}
              className="text-gray-500 hover:text-[#10b982] transition duration-300"
              aria-label={`Instagram profile of ${member.Name}`}
            >
              <Instagram size={isLeader ? 28 : 24} />
            </Link>
            <Link
              href={member.LinkedIn}
              className="text-gray-500 hover:text-[#10b982] transition duration-300"
              aria-label={`LinkedIn profile of ${member.Name}`}
            >
              <Linkedin size={isLeader ? 28 : 24} />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AdminTeam = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [leaderList, setLeaderList] = useState<any[]>([]);
  const [teamList, setTeamList] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof TeamValidation>>({
    resolver: zodResolver(TeamValidation),
    defaultValues: {
      Name: "",
      Position: "",
      ImageUrl: "",
      Facebook: "",
      Instagram: "",
      LinkedIn: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await GetTeam();

        if (data === null || data === undefined) {
          console.warn("API returned null/undefined, treating as empty array");
          setLeaderList([]);
          setTeamList([]);
        } else if (Array.isArray(data)) {
          const leaders = data.filter(
            (item: any) => item.Position?.toLowerCase() === "general manager"
          );
          const members = data.filter(
            (item: any) => item.Position?.toLowerCase() !== "general manager"
          );

          setLeaderList(leaders);
          setTeamList(members);
        } else {
          console.error("API returned non-array data:", data);
          setError("Received invalid data format");
          setLeaderList([]);
          setTeamList([]);
        }
      } catch (err: any) {
        console.error("Failed to fetch team data:", err);
        setError(err.message || "Failed to load team data. Please try again.");
        setLeaderList([]);
        setTeamList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePost = async (values: z.infer<typeof TeamValidation>) => {
    if (isEditing && editingItem) {
      const data = await PatchTeam(values, editingItem.id);

      const updatedItem = {
        ...editingItem,
        ...data,
      };

      if (editingItem.Position.toLowerCase() === "general manager") {
        setLeaderList((prev: any) =>
          prev.map((item: any) =>
            item.id === editingItem.id ? updatedItem : item
          )
        );
      } else {
        setTeamList((prev: any) =>
          prev.map((item: any) =>
            item.id === editingItem.id ? updatedItem : item
          )
        );
      }

      toast.success("Team member updated successfully!");
      setIsEditing(false);
      setEditingItem(null);
    } else {
      await TeamPost(values);

      toast.success("Team member posted successfully!");
      setTeamList((prev: any) => [
        { ...values, id: Date.now(), createdAt: new Date().toISOString() },
        ...prev,
      ]);
    }

    form.reset();
    setPreviewUrl(null);
  };

  const handleDelete = async (id: any) => {
    try {
      await DeleteTeam(id);
      setLeaderList((prev: any) =>
        prev.filter((item: any) => item.id !== id && item.Name !== id)
      );
      setTeamList((prev: any) =>
        prev.filter((item: any) => item.id !== id && item.Name !== id)
      );
      toast.success("Team member deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete team member");
    }
  };

  const handleEdit = (item: any) => {
    setIsEditing(true);
    setEditingItem(item);
    setPreviewUrl(item.ImageUrl);

    form.reset({
      Name: item.Name,
      Position: item.Position,
      ImageUrl: item.ImageUrl,
      Facebook: item.Facebook,
      Instagram: item.Instagram,
      LinkedIn: item.LinkedIn,
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

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-neutral-50">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error Loading Team Data</p>
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
            {isEditing ? "Edit Team Member" : "Team Member Creation"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isEditing
              ? "Update the team member details below"
              : "Add a new member to the organization's team or leadership."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePost)}
              className="flex flex-col gap-6"
            >
              <div className="grid md:grid-cols-3 gap-5">
                <CustomFormField
                  name="Name"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Name"
                  placeholder="member name"
                />
                <CustomFormField
                  name="Position"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Position/Title"
                  placeholder="e.g., Director, Volunteer"
                />
                <CustomFormField
                  name="ImageUrl"
                  control={form.control}
                  fieldType={formFieldTypes.IMAGE_UPLOADER}
                  label="Member Image"
                  previewUrl={previewUrl}
                  handleCloudinary={(result) =>
                    handleCloudinary(result, form, setPreviewUrl, "ImageUrl")
                  }
                />
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <CustomFormField
                  name="Facebook"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Facebook URL"
                  placeholder="link to facebook profile"
                />
                <CustomFormField
                  name="Instagram"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="Instagram URL"
                  placeholder="link to instagram profile"
                />
                <CustomFormField
                  name="LinkedIn"
                  control={form.control}
                  fieldType={formFieldTypes.INPUT}
                  label="LinkedIn URL"
                  placeholder="link to linkedin profile"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-[#10b982] hover:bg-green-700 transition duration-300 mt-4 flex-1"
                >
                  {isEditing ? "Update Team Member" : "Submit Team Member"}
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

      <h2 className="text-3xl font-extrabold text-gray-800 font-serif w-full max-w-4xl text-left border-b-2 border-[#10b982]/50 pb-2 mt-8">
        Organizational Leadership
      </h2>
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
        {leaderList.map((member: any, idx: number) => (
          <TeamMemberCard
            key={idx}
            member={member}
            isLeader={true}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>

      <h2 className="text-3xl font-extrabold text-gray-800 font-serif w-full max-w-7xl text-left border-b-2 border-[#10b982]/50 pb-2 mt-8">
        General Team Members
      </h2>
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
        {teamList.map((member: any, idx: number) => (
          <TeamMemberCard
            key={idx}
            member={member}
            isLeader={false}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminTeam;
