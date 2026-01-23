"use client";

import { authClient } from "@/lib/auth-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useSession() {
  const { data, isPending, error, refetch } = authClient.useSession();

  return {
    session: data,
    user: data?.user,
    isPending,
    error,
    refetch,
    isAuthenticated: !!data?.user,
  };
}

export function useSignInMagicLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return await authClient.signIn.magicLink({
        email,
        callbackURL: "/admin/dashboard",
        errorCallbackURL: "/admin/login?error=verification_failed",
      });
    },
    onSuccess: () => {
      toast.success("Magic link sent! Check your email.");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to send magic link");
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return await authClient.signOut();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      queryClient.clear();
      toast.success("Successfully signed out!");
      router.push("/admin/login");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to sign out");
    },
  });
}
