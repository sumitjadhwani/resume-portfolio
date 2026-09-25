import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Stats } from "@/components/sections/stats";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Achievements />
      <Contact />
    </>
  );
}
