import React from "react";
import { useProjects } from "../hooks/useProjects";

const Partner = ({ partner }) => {
  const { handleModalDeletePartener } = useProjects();
  const { name, email } = partner;
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="">
        {" "}
        <p>{name}</p>
        <p className="text-sm texxt-gray-700">{email}</p>
      </div>
      <div className="">
        <button
          type="button"
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
          onClick={() => handleModalDeletePartener(partner)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Partner;
