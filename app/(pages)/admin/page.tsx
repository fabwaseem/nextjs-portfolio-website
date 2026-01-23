"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-auth";

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, isPending } = useSession();

  useEffect(() => {
    if (!isPending) {
      if (isAuthenticated) {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/admin/login");
      }
    }
  }, [isAuthenticated, isPending, router]);

  return null;
}
