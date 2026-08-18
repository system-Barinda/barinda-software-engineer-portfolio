export type Profile = {
  name: string;
  firstName: string;
  lastName: string;
  headline: string;
  tagline: string;
  summary: string;
  location: string;
  availability: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedInUrl: string;
  twitterUrl: string;
  cvUrl: string;
  profileImage: string;
  yearsOfExperience: number;
  primarySkills: string[];
};

export type SkillItem = {
  name: string;
  level: string;
};

export type Skill = {
  category: string;
  description: string;
  skills: SkillItem[];
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  featured: boolean;
  image: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  status: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
};
