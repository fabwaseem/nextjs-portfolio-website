import { BlogsSection } from "@/components/layouts/vscode/landing/blogs-section";
import { HeroSection } from "@/components/layouts/vscode/landing/hero-section";
import { AboutSection } from "@/components/layouts/vscode/landing/about-section";
import { SkillsSection } from "@/components/layouts/vscode/landing/skills-section";
import { ProjectsSection } from "@/components/layouts/vscode/landing/projects-section";
import { ExperienceSection } from "@/components/layouts/vscode/landing/experience-section";
import { VideosSection } from "@/components/layouts/vscode/landing/videos-section";
import { TestimonialsSection } from "@/components/layouts/vscode/landing";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="glow-line" aria-hidden="true" />
      <AboutSection />
      <div className="glow-line" aria-hidden="true" />
      <SkillsSection />
      <div className="glow-line" aria-hidden="true" />
      <ProjectsSection />
      <div className="glow-line" aria-hidden="true" />
      <ExperienceSection />
      <div className="glow-line" aria-hidden="true" />
      <TestimonialsSection />
      <div className="glow-line" aria-hidden="true" />
      <VideosSection />
      <div className="glow-line" aria-hidden="true" />
      <BlogsSection />
    </>
  );
}
