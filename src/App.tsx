import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./Components/Header/Header";
import { ProjectList } from "./Components/Table/Table";
import { ProjectContext } from "./Contexts/ProjectContext";
import { Project } from "./types/project";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const columns = ["Name", "Type", "Status", "Created", "Manage"];

  useEffect(() => {
    fetch("http://localhost:3001/projects")
      .then((res) => res.json())
      .then((json: Project[]) => {
        setProjects(json);
        setFilteredProjects(json);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app">
      <Header name="Welson" />
      <ProjectContext.Provider
        value={{ projects, filteredProjects, setFilteredProjects }}
      >
        {projects && <ProjectList columns={columns} />}
      </ProjectContext.Provider>
    </div>
  );
}

export default App;
