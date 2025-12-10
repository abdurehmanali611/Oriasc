"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  GetHero,
  GetActivity,
  GetBlog,
  GetSermon,
  GetTeam,
  GetTestimonial,
} from "@/lib/actions";
import Image from "next/image";
import {
  Activity,
  Calendar,
  Contact,
  Layers,
  Megaphone,
  MessageCircle,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { contactApi } from "@/lib/api/contactApi";

const AdminDashboardElement = () => {
  const [heroData, setHeroData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [sermonData, setSermonData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [testimonialData, setTestimonialData] = useState([]);
  const [contactList, setContactList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const results = await Promise.allSettled([
          GetHero(),
          GetActivity(),
          GetBlog(),
          GetSermon(),
          GetTeam(),
          GetTestimonial(),
          contactApi.getAllContacts()
        ]);

        if (results[0].status === "fulfilled") {
          setHeroData(results[0].value ?? []);
        } else {
          console.error("Failed to fetch hero data:", results[0].reason);
        }

        if (results[1].status === "fulfilled") {
          setActivityData(results[1].value ?? []);
        } else {
          console.error("Failed to fetch activity data:", results[1].reason);
        }

        if (results[2].status === "fulfilled") {
          setBlogData(results[2].value ?? []);
        } else {
          console.error("Failed to fetch blog data:", results[2].reason);
        }

        if (results[3].status === "fulfilled") {
          setSermonData(results[3].value ?? []);
        } else {
          console.error("Failed to fetch sermon data:", results[3].reason);
        }

        if (results[4].status === "fulfilled") {
          setTeamData(results[4].value ?? []);
        } else {
          console.error("Failed to fetch team data:", results[4].reason);
        }

        if (results[5].status === "fulfilled") {
          setTestimonialData(results[5].value ?? []);
        } else {
          console.error("Failed to fetch testimonial data:", results[5].reason);
        }

        if (results[6].status === "fulfilled") {
          setContactList(results[6].value ?? []);
        } else {
          console.error("Failed to fetch Contact data:", results[6].reason);
        }

        const allFailed = results.every(
          (result) => result.status === "rejected"
        );
        if (allFailed) {
          setError("Failed to load dashboard data. Please try again.");
        }
      } catch (err: any) {
        console.error("Failed to fetch dashboard data:", err);
        setError(
          err.message || "Failed to load dashboard data. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const isVideoUrl = (url: string) => {
    if (!url) return false;
    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"];
    return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
  };

  const enrichData = (data: any, type: string) => {
    return data.map((item: any, index: number) => ({
      ...item,
      type,
      createdAt:
        item.createdAt ||
        new Date(
          Date.now() - (data.length - index) * 1000 * 60 * 60 * 24
        ).toISOString(),
      id: item.id || `${type}-${index}`,
    }));
  };

  const combinedData = [
    ...enrichData(heroData, "Hero"),
    ...enrichData(activityData, "Activity"),
    ...enrichData(blogData, "Blog"),
    ...enrichData(sermonData, "Sermon"),
    ...enrichData(testimonialData, "Testimonial")
  ];

  const sortedLatest = combinedData
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const stats = [
    {
      title: "Total Heroes",
      count: heroData.length,
      icon: Layers,
      color: "bg-[#10b982]/10 text-[#10b982]",
    },
    {
      title: "Total Blogs",
      count: blogData.length,
      icon: Megaphone,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Sermons",
      count: sermonData.length,
      icon: Calendar,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Total Members",
      count: teamData.filter((m: any) => m.Position.toLowerCase() !== "general manager").length,
      icon: Users,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Total Testimonials",
      count: testimonialData.length,
      icon: MessageCircle,
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "Total Activities",
      count: activityData.length,
      icon: Activity,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Total Contacts",
      count: contactList.length,
      icon: Contact,
      color: "bg-orange-100 text-orange-600",
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Hero":
        return "text-[#10b982]";
      case "Blog":
        return "text-blue-600";
      case "Sermon":
        return "text-purple-600";
      case "Activity":
        return "text-orange-600";
      case "Testimonial":
        return "text-pink-600";
      default:
        return "text-gray-700";
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "Hero":
        return <Layers className="w-4 h-4" />;
      case "Blog":
        return <Megaphone className="w-4 h-4" />;
      case "Sermon":
        return <Calendar className="w-4 h-4" />;
      case "Activity":
        return <Activity className="w-4 h-4" />;
      case "Testimonial":
        return <MessageCircle className="w-4 h-4" />;
      case "Contacts":
        return <Contact className="w-4 h-4"/>
      default:
        return null;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10b982]"></div>
      </div>
    );
  }

  // Error state (only if all requests failed)
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Error Loading Dashboard Data</p>
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
    <div className="p-8 bg-neutral-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-[#10b982] font-serif mb-8 border-b-4 border-[#10b982]/50 pb-2">
        Admin Dashboard Overview
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-[#10b982] pl-3">
          Key Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-6 w-6 ${stat.color.split(" ")[1]}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#10b982]">
                  {stat.count}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-[#10b982] pl-3">
          Latest Content Entries
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedLatest.map((item: any, index: number) => (
            <Card
              key={index}
              className="rounded-xl shadow-lg border-2 border-[#10b982]/10 overflow-hidden"
            >
              <CardHeader className="bg-[#10b982]/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getIconForType(item.type)}
                    <CardTitle
                      className={`text-xl font-semibold ${getTypeColor(
                        item.type
                      )}`}
                    >
                      {item.type} Post
                    </CardTitle>
                  </div>
                  <CardDescription className="text-xs text-gray-600">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-4 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {item.Title || item.Name || item.Slug}
                </h3>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {item.Description ||
                    item.Body ||
                    item.Content ||
                    item.Position ||
                    "No description provided."}
                </p>
                {(item.ImageUrl || item.ImageVideoUrl) && (
                  <div className="w-full h-32 relative rounded-lg overflow-hidden mt-2">
                    {isVideoUrl(item.ImageVideoUrl) ? (
                      <video
                        src={item.ImageVideoUrl}
                        controls
                        className="w-full h-full object-cover"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image
                        src={item.ImageUrl || item.ImageVideoUrl}
                        alt={item.Title || item.Name || item.type}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    )}
                  </div>
                )}
                <CardFooter className="p-0 pt-2 border-t border-gray-100 text-xs text-right text-[#10b982]">
                  {item.Author && <span>Author: {item.Author}</span>}
                  {item.Speaker && <span>Speaker: {item.Speaker}</span>}
                  {item.Stat !== undefined && <span>Stat: {item.Stat}</span>}
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardElement;
