import { createContext, Dispatch, SetStateAction } from "react";
import { Project } from "../types/project";

export const ProjectContext = createContext<{
  projects: Project[];
  filteredProjects: Project[];
  setFilteredProjects: Dispatch<SetStateAction<Project[]>>;
}>({
  projects: [] as Project[],
  filteredProjects: [] as Project[],
  setFilteredProjects: () => {},
});
