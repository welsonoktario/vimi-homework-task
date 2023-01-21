import "./Table.css";
import { Project, ProjectStatus, ProjectType } from "../../types/project";
import { dateStringToHumanReadable } from "../../lib/utils/dateUtils";
import { ChangeEvent, useContext, useState } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";

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
      <div>{item.status}</div>
      <div>{dateStringToHumanReadable(item.createdOn)}</div>
    </div>
  );
};

export const ProjectList = ({ columns }: ProjectListProps) => {
  const { projects, setProjects } = useContext(ProjectContext);
  const [query, setQuery] = useState("");

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const orderBy = e.target.value;
    const newProjects = projects.slice();

    newProjects.sort((a, b) =>
      orderBy === "desc"
        ? new Date(b.createdOn).valueOf() - new Date(a.createdOn).valueOf()
        : new Date(a.createdOn).valueOf() - new Date(b.createdOn).valueOf()
    );

    setProjects(newProjects);
  };

  const handleSearch = () => {
    const queries = query.split(" ");
    let newProjects = projects.slice();

    if (!query) {
      return setProjects(projects);
    }

    const projectTypes: string[] = Object.values(ProjectType);
    const projectStatus: string[] = Object.values(ProjectStatus);
    console.log(projectStatus);

    queries.forEach((q) => {
      if (q.includes("is:")) {
        const filter = q.split(":")[1];
        console.log(projectTypes.includes(filter));
        console.log(projectStatus.includes(filter));

        newProjects = newProjects.filter((project) => {
          if (projectTypes.includes(filter)) {
            return project.type.toString() == filter;
          }

          if (projectStatus.includes(filter)) {
            return project.status.toString() == filter;
          }
        });
      }

      if (q.includes("after:")) {
        const filter = q.split(":")[1];

        newProjects.filter((project) => {
          const date = new Date(filter);

          return new Date(project.createdOn) > date;
        });
      }

      if (q) {
        newProjects = newProjects.filter((project) =>
          project.name.toLowerCase().includes(q.toLowerCase())
        );
      }
    });

    setProjects(newProjects);
  };

  return (
    <div className="project-list-wrapper">
      <div className="inner-header">
        <h2>Recent Projects</h2>
        <select defaultValue="" onChange={handleSortByChange}>
          <option value="" disabled>
            Sort by
          </option>
          <option value="desc">Latest</option>
          <option value="asc">Oldest</option>
        </select>
      </div>

      <input
        className="search"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      <button onClick={handleSearch}>Search</button>

      <div className="grid project-list-header">
        {columns.map((column) => (
          <div key={`column-${column}`}>{column}</div>
        ))}
      </div>

      {projects.map((project) => (
        <ProjectItem key={`row-${project.id}`} item={project} />
      ))}
    </div>
  );
};
