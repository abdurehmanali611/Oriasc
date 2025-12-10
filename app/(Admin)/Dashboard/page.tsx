"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AbsoluteAdminList } from "@/constants";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AdminDashboardElement from "@/components/AdminDashboardElement";
import AdminHero from "@/components/AdminHero";
import AdminActivities from "@/components/AdminActivities";
import AdminEvents from "@/components/AdminEvents";
import AdminBlogs from "@/components/AdminBlogs";
import AdminSermons from "@/components/AdminSermons";
import AdminTeam from "@/components/AdminTeam";
import AdminTestimonial from "@/components/AdminTestimonial";
import AdminContacts from "@/components/AdminContacts";

export default function AdminDashboard() {
  const [link, setLink] = useState<string>("Dashboard");
  const router = useRouter();
  return (
    <div>
      <SidebarProvider>
        <Sidebar collapsible="offcanvas">
          <SidebarContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar-none p-3">
            <SidebarGroup className="flex flex-col gap-8">
              <SidebarHeader className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setLink("Dashboard")}
                  className="px-3 bg-slate-300 py-2 cursor-pointer h-fit"
                >
                  <Image
                    src="/assets/logo.jpg"
                    alt="Logo"
                    width={50}
                    height={50}
                    loading="eager"
                    className="rounded-full w-auto h-auto"
                    sizes="50px"
                  />
                  <h2 className="text-xl font-semibold text-[#10b982] font-serif">
                    Admin Panel
                  </h2>
                </Button>
              </SidebarHeader>
              <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu className="flex flex-col gap-5">
                  {AbsoluteAdminList.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild>
                        <Button
                          onClick={() => setLink(item.name)}
                          variant="outline"
                          className="flex gap-2 justify-start items-center p-6 bg-[#10b982] cursor-pointer"
                        >
                          <Icon icon={item.icon} width={50} height={50} />
                          <h2 className="text-lg font-normal font-serif">
                            {item.name}
                          </h2>
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex flex-col gap-10">
          <div className="flex gap-2 items-center mt-4">
            <SidebarTrigger className="cursor-pointer" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {link === "Dashboard" ? "" : link}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {link === "Dashboard" ? (
            <AdminDashboardElement />
          ) : link === "Hero" ? (
            <AdminHero />
          ) : link === "Activities" ? (
            <AdminActivities />
          ) : link === "Events" ? (
            <AdminEvents />
          ) : link === "Blogs" ? (
            <AdminBlogs />
          ) : link === "Sermons" ? (
            <AdminSermons />
          ) : link === "Team" ? (
            <AdminTeam />
          ) : link === "Contact" ? (
            <AdminContacts />
          ) : (
            link === "Testimonial" && <AdminTestimonial />
          )}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
