import { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import FormModalTask from "../components/formModalTask";
import ModalDeletePartner from "../components/ModalDeletePartner";
import ModalDeleteTask from "../components/ModalDeleteTask";
import Partner from "../components/Partner";
import Task from "../components/Task";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { useProjects } from "../hooks/useProjects";
import io from "socket.io-client";
import Spinner from "../components/Spinner";

let socket;
const Project = () => {
  const params = useParams();
  const {
    getProject,
    project,
    loading,
    handleModalTask,
    alert,
    submitProjectTask,
    deleteProjectTask,
    updateProjectTask,
    changeStateTask,
  } = useProjects();
  const admin = useAdmin();
  useEffect(() => {
    getProject(params.id);
  }, []);
  //Este useeffect lo que hace es que se ejecuta una vez para simplemete abrir el project y unirse al room
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("open project", params.id);
  }, []);

  //Este se ejecuta constantemente
  useEffect(() => {
    socket.on("added task", (newTask) => {
      if (newTask.project === project._id) {
        submitProjectTask(newTask);
      }
    });

    socket.on("deleted task", (deletedTask) => {
      console.log(deletedTask);

      if (deletedTask.project === project._id) {
        deleteProjectTask(deletedTask);
      }
    });

    socket.on("updated task", (updatedTask) => {
      if (updatedTask.project._id === project._id) {
        updateProjectTask(updatedTask);
      }
    });

    socket.on("new state", (newStateTask) => {
      if (newStateTask.project._id === project._id) {
        changeStateTask(newStateTask);
      }
    });
    return () => {
      socket.off("added task");
      socket.off("deleted task");
      socket.off("new state");
    };
  });

  const { name } = project;

  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">{name}</h1>

        {admin && (
          <div className="flex items-center gap-2 text-gray-400 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <Link
              to={`/projects/edit/${params.id}`}
              className="uppercase font-bold"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
      {admin && (
        <button
          onClick={handleModalTask}
          className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clipRule="evenodd"
            />
          </svg>
          New Task
        </button>
      )}
      <p className="font-bold text-xl mt-10">Project's Tasks</p>
      <div className="bg-white shadow mt-10 rounded-lg">
        {project.tasks?.length ? (
          project.tasks.map((task) => <Task task={task} key={task._id} />)
        ) : (
          <p className="text-center my-5 p-10 ">
            There are no tasks in this project yet.{" "}
          </p>
        )}
      </div>{" "}
      {admin && (
        <>
          <div className="flex items-center justify-between mt-10">
            <p className="font-bold text-xl">Partners</p>
            <Link
              to={`/projects/new-partner/${project._id}`}
              className="text-gray-400 uppercase font-bold hover:text-black transition-colors"
            >
              Add
            </Link>
          </div>
          <div className="bg-white shadow mt-10 rounded-lg">
            {project.partners?.length ? (
              project.partners?.map((partner) => (
                <Partner key={partner._id} partner={partner} />
              ))
            ) : (
              <p className="text-center my-5 p-10 ">
                There are no partners in this project yet.{" "}
              </p>
            )}
          </div>
        </>
      )}
      <FormModalTask />
      <ModalDeleteTask />
      <ModalDeletePartner />
    </>
  );
};

export default Project;
