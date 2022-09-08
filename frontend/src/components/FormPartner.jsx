import { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import Alert from "./Alert";

const FormPartner = () => {
  const { showAlert, submitPartner, alert } = useProjects();
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      showAlert({
        msg: "The Email is Mandatory",
        error: true,
      });
      return;
    }
    submitPartner(email);
  };

  const { msg } = alert;
  return (
    <form
      className="bg-white py-10 w-full px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert} />}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Partner Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Partner Email"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value="Search Partner"
        className="bg-sky-600  hover:bg-sky-700  w-full p-3 text-white uppercase font-bold  cursor-pointer transition-colors rounded  text-sm"
      />
    </form>
  );
};

export default FormPartner;
