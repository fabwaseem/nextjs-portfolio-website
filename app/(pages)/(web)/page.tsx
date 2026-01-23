import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
} from "@/components/portfolio";

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
    </>
  );
}
