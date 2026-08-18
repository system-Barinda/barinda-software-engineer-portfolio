import type { Profile, Skill } from "./types";

export const fallbackProfile: Profile = {
  name: "Barinda System Sylvere",
  firstName: "Barinda",
  lastName: "System Sylvere",
  headline: "Software Engineer",
  tagline: "Building reliable, scalable and maintainable software.",
  summary:
    "I am a software engineer passionate about building reliable web applications, well-designed APIs and maintainable software systems.",
  location: "Rwanda",
  availability: "Available for opportunities",
  email: "your-email@example.com",
  phone: "",
  githubUrl: "",
  linkedInUrl: "",
  twitterUrl: "",
  cvUrl: "",
  profileImage: "/data/images/profile.jpg",
  yearsOfExperience: 2,
  primarySkills: ["TypeScript", "React", "Node.js", "C#", "PostgreSQL"],
};

export const defaultSkills: Skill[] = [
  {
    category: "Programming Languages",
    description:
      "Languages I use to build applications and solve engineering problems.",
    skills: [
      { name: "TypeScript", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "C#", level: "Intermediate" },
      { name: "SQL", level: "Intermediate" },
    ],
  },
  {
    category: "Frontend Development",
    description: "Building responsive and maintainable user interfaces.",
    skills: [
      { name: "React", level: "Advanced" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "Responsive Design", level: "Advanced" },
    ],
  },
  {
    category: "Backend Development",
    description: "Designing APIs and application business logic.",
    skills: [
      { name: "Node.js", level: "Intermediate" },
      { name: "REST APIs", level: "Advanced" },
      { name: "API Design", level: "Advanced" },
      { name: "Authentication", level: "Intermediate" },
    ],
  },
  {
    category: "Databases",
    description: "Working with structured data and persistence systems.",
    skills: [
      { name: "PostgreSQL", level: "Intermediate" },
      { name: "MySQL", level: "Intermediate" },
      { name: "SQL", level: "Intermediate" },
      { name: "Database Design", level: "Intermediate" },
    ],
  },
  {
    category: "Software Engineering",
    description:
      "Practices that help me build maintainable and reliable software.",
    skills: [
      { name: "Clean Code", level: "Advanced" },
      { name: "Clean Architecture", level: "Intermediate" },
      { name: "SOLID Principles", level: "Intermediate" },
      { name: "Unit Testing", level: "Intermediate" },
      { name: "Integration Testing", level: "Intermediate" },
    ],
  },
  {
    category: "DevOps & Tools",
    description: "Tools I use to develop, test and deliver software.",
    skills: [
      { name: "Git", level: "Advanced" },
      { name: "GitHub", level: "Advanced" },
      { name: "Docker", level: "Intermediate" },
      { name: "GitHub Actions", level: "Intermediate" },
      { name: "Linux", level: "Intermediate" },
    ],
  },
];
