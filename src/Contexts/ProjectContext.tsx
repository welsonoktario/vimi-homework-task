import { createContext, Dispatch, ReactNode, useState } from "react";
import { Project } from "../types/project";

export const ProjectContext = createContext<{
  projects: Project[];
  setProjects: Dispatch<React.SetStateAction<Project[]>>;
}>({
  projects: [] as Project[],
  setProjects: () => {},
});
