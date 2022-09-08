import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useProjects } from "../hooks/useProjects";
import Search from "./Search";
const Header = () => {
  const { handleSearcher, logout } = useProjects();
  const { logautAuth } = useAuth();
  const handleLogOut = () => {
    logout();
    logautAuth();
    localStorage.removeItem("token");
  };
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between items-center">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          UpTask{" "}
        </h2>

        <div className=" flex flex-col md:flex-row items-center gap-4 ">
          <button
            type="button"
            onClick={handleSearcher}
            className="font-bold uppercase"
          >
            Search Project
          </button>
          <Link to="/projects" className="font-bold uppercase">
            Projects
          </Link>
          <button
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
            type="button"
            onClick={handleLogOut}
          >
            Log Out
          </button>
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
