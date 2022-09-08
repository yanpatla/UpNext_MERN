import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";

let socket;

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [alert, setAlert] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalTaskForm, setModalTaskForm] = useState(false);
  const [task, setTask] = useState({});
  const [modalDeleteTask, setModalDeleteTask] = useState(false);
  const [partner, setPartner] = useState({});
  const [modalDeletePartener, setModalDeletePartener] = useState(false);
  const [searcher, setSearcher] = useState(false);
  const navigate = useNavigate();

  const { auth } = useAuth();
  useEffect(() => {
    const getProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clientAxios("/projects", config);
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, [auth]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  const showAlert = (alert) => {
    setAlert(alert);

    setTimeout(() => {
      setAlert({});
    }, 3000);
  };

  const projectSubmit = async (project) => {
    if (project.id) {
      await editProject(project);
    } else {
      await newProject(project);
    }
  };

  const editProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(
        `/projects/${project.id}`,
        project,
        config
      );

      const updatedProjects = projects.map((projectState) =>
        projectState._id === data._id ? data : projectState
      );
      setProjects(updatedProjects);
      setAlert({
        msg: "The Project has been Updated",
        error: false,
      });
      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const newProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/projects", project, config);
      setProjects([...projects, data]);

      setAlert({
        msg: "The Project has been created",
        error: false,
      });
      setTimeout(() => {
        setAlert({});
        navigate("/projects");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios(`/projects/${id}`, config);
      setProject(data);
      setAlert({});
    } catch (error) {
      navigate("/projects");
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await clientAxios.delete(`/projects/${id}`, config);
      //Async State
      const porjectUpdate = projects.filter(
        (projectState) => projectState._id !== id
      );
      setProjects(porjectUpdate);
      setTimeout(() => {
        navigate("/projects");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleModalTask = () => {
    setModalTaskForm(!modalTaskForm);
    setTask({});
  };

  const submitTask = async (task) => {
    if (task?.id) {
      await editTask(task);
    } else {
      await createTask(task);
    }
  };

  const createTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post("/tasks", task, config);

      setAlert({});
      setModalTaskForm(false);

      //Socket Io

      socket.emit("new task", data);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (task) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.put(`/tasks/${task.id}`, task, config);

      setAlert({});
      setModalTaskForm(false);

      //Socket

      socket.emit("update task", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTask = (task) => {
    setTask(task);
    setModalTaskForm(true);
  };
  const handleModalDeleteTask = (task) => {
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  };

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.delete(`/tasks/${task._id}`, config);
      setAlert({
        msg: data.msg,
        error: false,
      });

      setModalDeleteTask(false);

      //Socket
      socket.emit("delete task", task);

      setTask({});
      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitPartner = async (email) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post(
        `/projects/partners`,
        { email },
        config
      );

      setPartner(data);
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const addPartner = async (email) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(
        `/projects/partners/${project._id}`,
        email,
        config
      );
      setAlert({
        msg: data.msg,
        error: false,
      });
      setPartner({});

      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const handleModalDeletePartener = (partner) => {
    setModalDeletePartener(!modalDeletePartener);
    setPartner(partner);
  };
  const deletePartner = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(
        `/projects/delete-partners/${project._id}`,
        { id: partner._id },
        config
      );
      const updatedProject = { ...project };
      updatedProject.partners = updatedProject.partners.filter(
        (partnerState) => partnerState._id !== partner._id
      );
      setProject(updatedProject);
      setAlert({
        msg: data.msg,
        error: false,
      });
      setPartner({});
      setModalDeletePartener(false);

      setTimeout(() => {
        setAlert({});
      }, 3000);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const completeTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(`/tasks/state/${id}`, {}, config);

      setTask({});
      setAlert({});

      //Socket

      socket.emit("change state", data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSearcher = () => {
    setSearcher(!searcher);
  };

  //Socket IO

  const submitProjectTask = (newTask) => {
    //Add to the State
    const projectUpdated = { ...project };
    projectUpdated.tasks = [...projectUpdated.tasks, newTask];

    setProject(projectUpdated);
  };

  const deleteProjectTask = (task) => {
    //? Si el id de la task del projecto con la data que viene de la db entonces reemplazala con data si no retrna lo que esta
    console.log(task);
    const updatedProject = { ...project };
    updatedProject.tasks = updatedProject.tasks.filter(
      (taskState) => taskState._id !== task._id
    );

    setProject(updatedProject);
  };

  const updateProjectTask = (task) => {
    //? Si el id de la task del projecto con la data que viene de la db entonces reemplazala con data si no retrna lo que esta

    const updatedProject = { ...project };
    updatedProject.tasks = updatedProject.tasks.map((taskState) =>
      taskState._id === task._id ? task : taskState
    );

    setProject(updatedProject);
  };

  const changeStateTask = (task) => {
    console.log(task, "provider");
    const updatedProject = { ...project };
    updatedProject.tasks = updatedProject.tasks.map((taskState) =>
      taskState._id === task._id ? task : taskState
    );
    setProject(updatedProject);
  };

  const logout = () => {
    setProjects([]);
    setProject({});
    setAlert({});
  };
  return (
    <ProjectContext.Provider
      value={{
        projects,
        project,
        alert,
        loading,
        modalTaskForm,
        task,
        modalDeleteTask,
        partner,
        modalDeletePartener,
        searcher,
        showAlert,
        projectSubmit,
        getProject,
        deleteProject,
        handleModalTask,
        submitTask,
        handleTask,
        handleModalDeleteTask,
        deleteTask,
        submitPartner,
        addPartner,
        handleModalDeletePartener,
        deletePartner,
        completeTask,
        handleSearcher,
        submitProjectTask,
        deleteProjectTask,
        updateProjectTask,
        changeStateTask,
        logout,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectProvider };

export default ProjectContext;
