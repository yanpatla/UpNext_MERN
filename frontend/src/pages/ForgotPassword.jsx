import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlert({
        msg: "The E-mail is mandatory",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clientAxios.post(`/users/forgot-password`, {
        email,
      });
      setAlert({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reacquire your Access and don't lose your{" "}
        <span className="text-slate-700">Projects</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        onSubmit={handleSubmit}
        className="my-10  bg-white shadow rounded-lg p-10"
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name=""
            placeholder="Email"
            id="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          />
        </div>

        <input
          type="submit"
          className=" mb-5 bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          value="Send Instructions"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="register"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Don't have an Account?
        </Link>
        <Link
          to="forgot-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Forgot your password?
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
