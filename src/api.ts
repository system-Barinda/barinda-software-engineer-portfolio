import type { Experience, Profile, Project, Skill } from "./types";

async function get<T>(path: string): Promise<T> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response.json() as Promise<T>;
}

export const getProfile = () => get<Profile>("/data/profile.json");

export const getSkills = () => get<Skill[]>("/data/skills.json");

export const getExperiences = () => get<Experience[]>("/data/experiences.json");

export const getProjects = () => get<Project[]>("/data/projects.json");
