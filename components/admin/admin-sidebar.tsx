"use client";

import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Tag,
  Settings,
  LogOut,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSignOut, useSession } from "@/hooks/use-auth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    url: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Blog Posts",
    url: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Tag,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useSession();
  const signOut = useSignOut();

  const userInitials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) ||
    user?.email?.[0].toUpperCase() ||
    "A";

  return (
    <Sidebar variant="floating" className="border-none">
      <SidebarHeader className="border-b border-sidebar-border/50 pb-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight">
              Admin Portal
            </span>
            <span className="text-xs text-muted-foreground">
              Portfolio Management
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider px-2 mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.url || pathname.startsWith(item.url + "/");
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={cn(
                        "w-full justify-start gap-3 px-3 h-11 font-medium",
                        isActive &&
                          "bg-primary/10 text-primary border border-primary/20 shadow-sm",
                      )}
                    >
                      <Link href={item.url}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/50 pt-4 px-2">
        <div className="flex items-center gap-3 mb-4 p-2 rounded-xl bg-sidebar-accent/50">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage
              src={user?.image || undefined}
              alt={user?.name || ""}
            />
            <AvatarFallback className="bg-linear-to-br from-primary to-primary/80 text-primary-foreground font-medium">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-sm font-semibold truncate">
              {user?.name || "Admin"}
            </span>
            <span className="text-xs text-muted-foreground/70 truncate">
              {user?.email}
            </span>
          </div>
        </div>
        {/* View Website Link */}
        <SidebarMenuButton
          asChild
          className="w-full justify-start gap-3 h-10 mb-2 rounded-xl font-medium hover:bg-primary/10 hover:text-primary"
        >
          <Link href="/" target="_blank">
            <ExternalLink className="h-4 w-4" />
            <span>View Website</span>
          </Link>
        </SidebarMenuButton>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SidebarMenuButton
            onClick={() => signOut.mutate()}
            className="flex-1 justify-start gap-3 h-10 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl font-medium"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
