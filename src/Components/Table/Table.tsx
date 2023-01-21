import "./Table.css";
import { Project } from "../../types/project";
import { dateStringToHumanReadable } from "../../lib/utils/dateUtils";
import { ChangeEvent, useContext } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";
import { Searchbar } from "../Searchbar/Searchbar";
import { OrderBy } from "../OrderBy/OrderBy";

export type ProjectListProps = {
  columns: string[];
};

export type ProjectItemProps = {
  item: Project;
};

export const ProjectItem = ({ item }: ProjectItemProps) => {
  return (
    <div className="grid project-list-item">
      <div>{item.name}</div>
      <div>{item.type}</div>
      <div className="project-status">{item.status.toLowerCase()}</div>
      <div>{dateStringToHumanReadable(item.createdOn)}</div>
    </div>
  );
};

export const ProjectList = ({ columns }: ProjectListProps) => {
  const { filteredProjects } = useContext(ProjectContext);

  return (
    <div className="project-list-wrapper">
      <OrderBy />
      <Searchbar />

      <div className="grid project-list-header">
        {columns.map((column) => (
          <div key={`column-${column}`}>{column}</div>
        ))}
      </div>

      {filteredProjects.map((project) => (
        <ProjectItem key={`row-${project.id}`} item={project} />
      ))}
    </div>
  );
};
