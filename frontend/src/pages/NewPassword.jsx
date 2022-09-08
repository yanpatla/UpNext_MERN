import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import clientAxios from "../config/clientAxios";
const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [confirmedAccount, setConfirmedAccount] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(`/users/forgot-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    checkToken();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlert({
        msg: "The passowrd must be a minimum of 6 characters.",
        error: true,
      });
      return;
    }
    try {
      const url = `users/forgot-password/${token}`;
      const { data } = await clientAxios.post(url, { password });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setConfirmedAccount(true);
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
        Reset your password and don't lose Access to your
        <span className="text-slate-700"> Projects</span>
      </h1>
      {msg && <Alert alert={alert} />}
      {validToken && (
        <form
          onSubmit={handleSubmit}
          className="my-10  bg-white shadow rounded-lg p-10"
        >
          <div className="my-5">
            <label
              htmlFor="password"
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              New Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name=""
              placeholder="Write you New Password"
              id="password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
            />
          </div>
          <input
            type="submit"
            className=" mb-5 bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            value="Save the New Password"
          />
        </form>
      )}

      {confirmedAccount && (
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm"
        >
          Log In
        </Link>
      )}
    </>
  );
};

export default NewPassword;
