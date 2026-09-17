export const site = {
  name: "Sumit Jadhwani",
  firstName: "Sumit",
  role: "Software & Gen AI Engineer",
  title: "Sumit Jadhwani — Software & Gen AI Engineer",
  description:
    "Software Engineer with 4+ years of experience in full-stack development and machine learning, specializing in Python, FastAPI and Gen AI / RAG systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sumitjadhwani.vercel.app",
  email: "sumitjadhwani1@gmail.com",
  location: "Pune, India",
  resumePath: "/resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/sumitjadhwani/",
    github: "https://github.com/sumitjadhwani",
  },
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Patents", href: "#patents" },
  { label: "Education", href: "#education" },
  { label: "Labs", href: "/labs" },
  { label: "Contact", href: "#contact" },
];
