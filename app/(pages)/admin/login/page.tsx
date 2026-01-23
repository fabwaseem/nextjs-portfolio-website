"use client";

import { useSignInMagicLink } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useSession } from "@/hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const { isAuthenticated, isPending: sessionPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const signInMagicLink = useSignInMagicLink();
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated && !sessionPending) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, sessionPending, router]);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "verification_failed") {
      setEmailSent(false);
    }
  }, [searchParams]);

  const onSubmit = async (data: LoginFormData) => {
    await signInMagicLink.mutateAsync({ email: data.email });
    setEmailSent(true);
  };

  if (sessionPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-muted/30 p-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative p-4 bg-linear-to-br from-background via-background to-muted/30">
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 h-full w-full rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 h-full w-full rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl shadow-primary/5">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>
            <CardTitle className="text-2xl sm:text-3xl">Admin Portal</CardTitle>
            <CardDescription className="text-base">
              Sign in to manage your portfolio
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            {emailSent ? (
              <div className="text-center py-4">
                <div className="flex justify-center mb-6">
                  <div className="h-16 w-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-emerald-500" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">Check your email</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  We've sent a magic link to your email address.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Click the link in the email to sign in.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 text-xs text-muted-foreground mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Link expires in 5 minutes
                </div>
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => setEmailSent(false)}
                    className="text-muted-foreground hover:text-foreground gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Send another link
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="admin@example.com"
                    autoComplete="email"
                    className="h-12"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || signInMagicLink.isPending}
                  className="w-full h-12 text-base shadow-lg shadow-primary/25"
                >
                  {isSubmitting || signInMagicLink.isPending ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending magic link...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Send Magic Link
                    </span>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground/60 mt-6">
          Secure passwordless authentication
        </p>
      </div>
    </div>
  );
}
