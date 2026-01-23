"use client";

import * as React from "react";
import { AdminSidebar } from "./admin-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function AdminLayoutWrapper({
  children,
  breadcrumbs,
}: AdminLayoutWrapperProps) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="bg-transparent">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 bg-background/60 backdrop-blur-xl border-b border-border/50 px-6">
          <SidebarTrigger className="-ml-1 hover:bg-accent/60" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-border/50" />
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <BreadcrumbSeparator className="text-muted-foreground/50" />
                    )}
                    {crumb.href ? (
                      <BreadcrumbItem>
                        <BreadcrumbLink
                          href={crumb.href}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {crumb.label}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    ) : (
                      <BreadcrumbItem>
                        <BreadcrumbPage className="font-medium">
                          {crumb.label}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </header>
        <div className="flex flex-1 flex-col gap-6 p-6 md:p-8 lg:p-10">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
