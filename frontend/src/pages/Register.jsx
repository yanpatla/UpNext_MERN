import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setReapeatPassword] = useState("");
  const [alert, setAlert] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({
        msg: "All fields are mandatory",
        error: true,
      });

      return;
    }
    if (password !== repeatPassword) {
      setAlert({
        msg: "The Passwords are not the same",
        error: true,
      });
      return;
    }
    if (password.length < 6) {
      setAlert({
        msg: "Password must be min 6 characters",
        error: true,
      });
      return;
    }

    //Create el User in the API
    try {
      const { data } = await clientAxios.post(`/users`, {
        name,
        email,
        password,
      });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setName("");
      setEmail("");
      setPassword("");
      setReapeatPassword("");
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
        Create an Account and Manage your{" "}
        <span className="text-slate-700">Projects</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        action=""
        className="my-10  bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="name"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Name
          </label>
          <input
            type="name"
            placeholder="Name"
            id="name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repeat Password
          </label>
          <input
            type="password"
            name=""
            placeholder=" Repeat Password"
            id="password2"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            value={repeatPassword}
            onChange={(e) => setReapeatPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className=" mb-5 bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          value="Create an Account"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Do have an Account? Log In
        </Link>
        <Link
          to="/forgot-password"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Forgot your password?
        </Link>
      </nav>
    </>
  );
};

export default Register;
