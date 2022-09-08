import React from "react";
import { formatDate } from "../helpers/formatDate";
import useAdmin from "../hooks/useAdmin";
import { useProjects } from "../hooks/useProjects";
const Task = ({ task }) => {
  const { handleTask, handleModalDeleteTask, completeTask } = useProjects();
  const { name, description, deliveryDate, priority, state, _id, complete } =
    task;
  const admin = useAdmin();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="text-xl mb-1">{name}</p>
        <p className="text-xl bb-1 text-gray-500 uppercase">{description}</p>
        <p className="text-sm mb-1">{formatDate(deliveryDate)}</p>
        <p className="text-sm mb-1 text-gray-600">Priority: {priority}</p>
        {state && (
          <p className="text-xs bg-green-600 uppercase p-1 rounded text-white">
            Completed By: {complete.name}
          </p>
        )}
      </div>
      <div className="flex  flex-col lg:flex-row gap-2">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleTask(task)}
          >
            Edit
          </button>
        )}

        <button
          className={`${
            state ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completeTask(_id)}
        >
          {state ? "Complete" : "Incomplete"}
        </button>

        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalDeleteTask(task)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
