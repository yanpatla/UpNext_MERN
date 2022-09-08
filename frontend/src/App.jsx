import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ProjectProvider } from "./context/ProjectsProvider";
import AuthLayout from "./layouts/AuthLayout";
import RouteProtected from "./layouts/RouteProtected";
import ConfirmAccount from "./pages/ConfirmAccount";
import EditProject from "./pages/EditProject";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import NewPartner from "./pages/NewPartner";
import NewPassword from "./pages/NewPassword";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";
import Projects from "./pages/Projects";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            {/* Public Area */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>
            {/* private Area */}
            <Route path="/projects" element={<RouteProtected />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<NewProject />} />
              <Route path="new-partner/:id" element={<NewPartner />} />
              <Route path=":id" element={<Project />} />
              <Route path="edit/:id" element={<EditProject />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
