import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FolderGit2 } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-code-dots" />
      <div className="absolute inset-0 bg-mesh opacity-60" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <FolderGit2 className="w-24 h-24 text-muted-foreground/50 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          The project you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button asChild size="lg" className="gap-2">
          <Link href="/projects">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    </section>
  );
}
