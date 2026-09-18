const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

const siteUrl =
  rawSiteUrl ||
  (vercelUrl ? `https://${vercelUrl}` : "https://sumitjadhwani.vercel.app");

export const site = {
  name: "Sumit Jadhwani",
  firstName: "Sumit",
  role: "Software & Gen AI Engineer",
  title: "Sumit Jadhwani — Software & Gen AI Engineer",
  description:
    "Software Engineer with 4+ years of experience in full-stack development and machine learning, specializing in Python, FastAPI and Gen AI / RAG systems.",
  url: siteUrl,
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
  { label: "Blog", href: "/blog" },
];
