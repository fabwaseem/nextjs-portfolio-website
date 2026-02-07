import { HeroSection } from "./hero-section";
import { AboutSection } from "./about-section";
import { SkillsSection } from "./skills-section";
import { ProjectsSection } from "./projects-section";
import { ExperienceSection } from "./experience-section";
import { VideosSection } from "./videos-section";
import { TestimonialsSection } from "./testimonials-section";
import { BlogsSection } from "./blogs-section";

export function VSCodeLanding() {
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

export { HeroSection } from "./hero-section";
export { AboutSection } from "./about-section";
export { SkillsSection } from "./skills-section";
export { ProjectsSection } from "./projects-section";
export { ExperienceSection } from "./experience-section";
export { TestimonialsSection } from "./testimonials-section";
export { VideosSection } from "./videos-section";
export { BlogsSection } from "./blogs-section";
