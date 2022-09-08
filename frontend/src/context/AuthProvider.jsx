import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clientAxios("/users/profile", config);
        setAuth(data);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
        setAuth({});
      }
      setLoading(false);
    };

    authUser();
  }, []);
  const logautAuth = () => {
    setAuth({});
  };
  return (
    <AuthContext.Provider
      value={{
        setAuth,
        logautAuth,
        auth,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
