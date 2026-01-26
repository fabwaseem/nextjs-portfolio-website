import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  VideosSection,
} from "@/components/portfolio";
import { BlogsSection } from "@/components/portfolio/blogs-section";

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
      <VideosSection />
      <div className="glow-line" aria-hidden="true" />
      <BlogsSection />
    </>
  );
}
