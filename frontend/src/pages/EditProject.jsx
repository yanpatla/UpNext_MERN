import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormProject from "../components/FormProject";
import { useProjects } from "../hooks/useProjects";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Spinner from "../components/Spinner";

const EditProject = () => {
  const params = useParams();
  const { getProject, project, loading, deleteProject } = useProjects();
  const [openModal, setOpenModal] = useState(false);
  const MySwal = withReactContent(Swal);
  useEffect(() => {
    getProject(params.id);
  }, []);

  const handleClick = () => {
    setOpenModal(true);
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "The Project Has been Deleted",
          showConfirmButton: false,
          timer: 1500,
        });

        deleteProject(params.id);
      }
    });
  };
  const { name } = project;
  if (loading) return <Spinner/>;
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">Edit Project: {name}</h1>

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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <button
            type="button"
            onClick={handleClick}
            className="uppercase font-bold"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <FormProject />
      </div>
    </>
  );
};

export default EditProject;
