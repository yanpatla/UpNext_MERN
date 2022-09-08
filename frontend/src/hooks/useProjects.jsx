import { useContext } from "react";
import ProjectContext from "../context/ProjectsProvider";

export const useProjects = () => {
  return useContext(ProjectContext);
};
