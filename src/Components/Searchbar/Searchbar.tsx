import "./Searchbar.css";
import { FormEvent, useContext, useState } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";
import * as EnumUtil from "enum-util";
import { ProjectStatus, ProjectType } from "../../types/project";

export const Searchbar = () => {
  const { projects, setFilteredProjects } = useContext(ProjectContext);
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queries = query.split(" ");

    if (!query) {
      return setFilteredProjects(projects);
    }

    let newProjects = projects.slice();

    queries.forEach((q) => {
      if (!q.includes(":")) {
        newProjects = newProjects.filter((project) =>
          project.name.toLowerCase().includes(q.toLowerCase())
        );
      } else {
        const [operator, filter] = q.split(":");
        const isType = EnumUtil.isValue(ProjectType, filter);
        const isStatus = EnumUtil.isValue(ProjectStatus, filter);

        if (operator === "after") {
          const date = new Date(filter);

          newProjects = newProjects.filter(
            (project) => new Date(project.createdOn) > date
          );
        } else if (filter === "archived") {
          const archived = q.split(":")[0] === "is";

          newProjects = newProjects.filter(
            (project) => !!project.archived === archived
          );
        } else {
          newProjects = newProjects.filter((project) => {
            if (isType) {
              return operator === "is"
                ? project.type.toLowerCase().toString() === filter
                : project.type.toLowerCase().toString() !== filter;
            } else if (isStatus) {
              return operator === "is"
                ? project.status.toLowerCase().toString() === filter
                : project.status.toLowerCase().toString() !== filter;
            }
          });
        }
      }
    });

    setFilteredProjects(newProjects);
  };

  return (
    <form className="searchbar-wrapper" onSubmit={handleSearch}>
      <input
        className="search-input"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  );
};
