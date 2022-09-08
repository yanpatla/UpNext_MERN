import { useEffect } from "react";
import FormPartner from "../components/FormPartner";
import { useProjects } from "../hooks/useProjects";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
const NewPartner = () => {
  const { getProject, addPartner, project, loading, partner, alert } =
    useProjects();
  const params = useParams();
  useEffect(() => {
    getProject(params.id);
  }, []);
  if (!project?._id) return <Alert alert={alert} />;
  return (
    <>
      <h1 className="text-4xl font-black">
        Add Partner to Project: {project.name}{" "}
      </h1>

      <div className="mt-10 flex justify-center">
        <FormPartner />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        partner?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
              <h2 className="text-center mb-10 text-2xl font-bold">Result:</h2>
              <div className="flex justify-between items-center ">
                <p>{partner.name}</p>

                <button
                  type="button"
                  className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                  onClick={() => addPartner({ email: partner.email })}
                >
                  Add to Project
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NewPartner;
