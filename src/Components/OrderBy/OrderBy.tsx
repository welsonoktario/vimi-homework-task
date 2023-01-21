import { ChangeEvent, useContext } from "react";
import { ProjectContext } from "../../Contexts/ProjectContext";

export const OrderBy = () => {
  const { filteredProjects, setFilteredProjects } = useContext(ProjectContext);

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const orderBy = e.target.value;
    const newProjects = filteredProjects.slice();

    newProjects.sort((a, b) =>
      orderBy === "desc"
        ? new Date(b.createdOn).valueOf() - new Date(a.createdOn).valueOf()
        : new Date(a.createdOn).valueOf() - new Date(b.createdOn).valueOf()
    );

    setFilteredProjects(newProjects);
  };

  return (
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
  );
};
