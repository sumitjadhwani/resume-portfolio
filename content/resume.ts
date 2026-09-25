export type SkillGroup = {
  title: string;
  items: string[];
};

export type SubProject = {
  name: string;
  description: string;
  points: string[];
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  points?: string[];
  projects?: SubProject[];
};

export type Patent = {
  title: string;
  meta: string;
  points: string[];
};

export type Education = {
  institution: string;
  location?: string;
  credential: string;
  period: string;
  detail?: string;
  highlights?: string[];
};

export type AchievementGroup = {
  title: string;
  items: string[];
};

export const profile = {
  summary:
    "Software Engineer with 5+ years of experience in full-stack development and machine learning, specializing in Python, FastAPI, Java and Gen AI solutions. Proven track record of implementing innovative technical solutions across cloud platforms and AI technologies, from hybrid RAG agents serving production users to a patented PII-masking system.",
  focus: [
    "Gen AI & RAG systems",
    "LLM fine-tuning",
    "AI agents",
    "Cloud & MLOps",
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Frameworks",
    items: ["Python", "FastAPI", "JavaScript", "Java", "Flask"],
  },
  {
    title: "NLP & Gen AI",
    items: [
      "RAG Systems",
      "LLM Fine-Tuning (SLMs, OSS Models)",
      "Hugging Face Transformers",
      "LangFlow",
      "AI Agents",
    ],
  },
  {
    title: "Deep Learning",
    items: ["PyTorch", "TensorFlow"],
  },
  {
    title: "MLOps & Cloud",
    items: [
      "Flask / Streamlit",
      "Docker / Kubernetes",
      "AWS (EC2, S3, SageMaker, Bedrock)",
    ],
  },
  {
    title: "Data & Software Engineering",
    items: ["MySQL", "MongoDB", "Postgres", "Elasticsearch", "Vector Stores"],
  },
];

export const experience: Experience[] = [
  {
    role: "Gen AI Engineer",
    company: "Axentia",
    location: "Pune, India",
    start: "Apr 2025",
    end: "Present",
    current: true,
    projects: [
      {
        name: "Conversational AI Bot — University of Mississippi",
        description:
          "A hybrid RAG and live web-search agent that answers student queries with up-to-date information.",
        points: [
          "Built a hybrid RAG and live web-search agent with tool-calling capabilities to provide up-to-the-minute information.",
          "Reduced model hallucinations by over 90%.",
          "Deployed the bot across 3 platforms: Web, WhatsApp and Telegram.",
        ],
      },
      {
        name: "Transcript Genie — Academic Credential Evaluation",
        description:
          "An AI assistant that converts international academic records into US GPA equivalents.",
        points: [
          "Engineered a multi-stage document analysis pipeline using an ensemble of OCR models and chained LLM calls.",
          "Reduced processing costs by routing tasks across different models — GPT-5, specialized OSS models for simpler tasks, and the Groq API for high-speed inference.",
        ],
      },
    ],
  },
  {
    role: "Software Engineer",
    company: "Nice Systems",
    location: "Pune, India",
    start: "Jun 2023",
    end: "Apr 2025",
    points: [
      "Deployed a multi-RAG system for product documentation that saved at least 25% of support hours.",
      "Filed a US patent application for a Transformer-based PII data masking system.",
      "Drove application scaling to handle 10K concurrent clients/users with the same resources.",
      "Implemented an Auto Update feature with 100% test coverage and SCA checks.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Nice Systems",
    location: "Pune, India",
    start: "Jul 2021",
    end: "May 2023",
    points: [
      "Owned backend development, reducing the vulnerability count by 50%+.",
      "Stabilized the testing CI pipeline, reducing CI test failures by 90%+.",
      "Worked on automation (Cypress) and performance testing (JMeter).",
      "Handled critical production issues.",
      "Worked in an Agile, CI/CD development environment.",
    ],
  },
];

export const patents: Patent[] = [
  {
    title:
      "System and method for intelligent masking of information using machine learning",
    meta: "U.S. Patent App. 18/888,490 — filed Nov 2024, patent pending",
    points: [
      "Automation captures images on an agent's screen that previously had to be masked manually for GDPR and CCPA compliance, with no end-to-end solution available.",
      "The invention provides an end-to-end masking solution with a unique row-wise feed of data to improve accuracy and identify multi-line PII data.",
      "Uses LLMs, OCR and Python.",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "Pune Institute of Computer Technology",
    location: "Pune, India",
    credential: "Bachelors in Information Technology",
    period: "2017 – 2021",
    detail: "CGPA: 9.13",
    highlights: [
      "Electives: Business Intelligence, Social Media Analytics, Soft Computing.",
      "Capstone project: ML-based COVID screening.",
    ],
  },
  {
    institution: "100X Engineers Gen AI Cohort",
    credential: "Gen AI Cohort",
    period: "Apr 2025 – Sep 2025",
    highlights: [
      "AI Agents, FastAPI, model deployment and MLOps.",
      "Diffusion models (Image/Video): Flux, Stable Diffusion.",
      "AI workflow tools: ComfyUI, n8n.",
      "Model optimization techniques.",
    ],
  },
];

export const achievements: AchievementGroup[] = [
  {
    title: "Certifications",
    items: [
      "LLM Prompting — LinkedIn Learning (2024)",
      "ML with Big Data — LinkedIn Learning (2023)",
      "Docker & Kubernetes — LinkedIn Learning (2023)",
    ],
  },
  {
    title: "Honors",
    items: [
      "Spot Award for driving a major feature (Auto Update and Chatbot) and contribution during a critical release.",
      "Patent Recognition: praised by management and key people at the organization for the innovative idea.",
    ],
  },
  {
    title: "Volunteer",
    items: [
      "Event Management Committee for organizing FUN and CSR events.",
      "Coordinated department-level events for 400+ people, including Sports Day, CSR activities and festival celebrations.",
      "Led the annual coding contest event, CoDay.",
    ],
  },
];
