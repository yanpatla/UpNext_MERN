import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProject = ({ project }) => {
  const { auth } = useAuth();
  const { name, _id, client, creator } = project;
  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      {" "}
      <div className="flex items-center gap-2">
        <p className="flex-1">
          {name}{" "}
          <span className="text-sm text-gray-500 uppercase">
            {""} {client}
          </span>{" "}
        </p>
        {auth._id !== creator && (
          <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">
            Partner
          </p>
        )}
      </div>
      <Link
        className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
        to={`${_id}`}
      >
        See Project
      </Link>
    </div>
  );
};

export default PreviewProject;
