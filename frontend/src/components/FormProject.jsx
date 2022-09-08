import { useState, useEffect } from "react";
import { useProjects } from "../hooks/useProjects";
import { useParams } from "react-router-dom";
import Alert from "./Alert";

const FormProject = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [client, setClient] = useState("");
  const params = useParams();
  const { showAlert, projectSubmit, alert, project } = useProjects();

  useEffect(() => {
    if (params.id) {
      setId(project._id);
      setName(project.name);
      setDescription(project.description);
      setDeliveryDate(project.deliveryDate?.split("T")[0]);
      setClient(project.client);
    }
  }, [params]);
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, description, deliveryDate, client].includes("")) {
      showAlert({
        msg: "All fields are mandatory",
        error: true,
      });

      return;
    }

    //Send Data to the Provider
    await projectSubmit({ id, name, description, deliveryDate, client });

    setId(null);
    setName("");
    setDescription("");
    setDeliveryDate("");
    setClient("");
  };

  const { msg } = alert;
  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}
      <div className="mt-5">
        <label
          htmlFor="name"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Project Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="name"
          placeholder="Project Name"
        />
      </div>
      <div className="mt-5">
        <label
          htmlFor="description"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="description"
          placeholder="Project Description"
        />
      </div>
      <div className="mt-5">
        <label
          htmlFor="delivery-date"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Delivery Date
        </label>
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="delivery-date"
          placeholder="Project Description"
        />
      </div>
      <div className="mt-5">
        <label
          htmlFor="client"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Client Name
        </label>
        <input
          value={client}
          onChange={(e) => setClient(e.target.value)}
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="client"
          placeholder="Client Name"
        />
      </div>
      <input
        type="submit"
        value={id ? `Update Project` : `Create Project`}
        className="bg-sky-600 w-full p-3 uppercase text-white font-bold rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormProject;
