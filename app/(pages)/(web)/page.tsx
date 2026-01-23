import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
} from "@/components/portfolio";
import { BlogsSection } from "@/components/portfolio/blogs-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="glow-line" />
      <AboutSection />
      <div className="glow-line" />
      <SkillsSection />
      <div className="glow-line" />
      <ProjectsSection />
      <div className="glow-line" />
      <ExperienceSection />
      <div className="glow-line" />
      <BlogsSection />
    </>
  );
}
