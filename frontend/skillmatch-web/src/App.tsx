import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import CreateProject from "./pages/CreateProject";
import UserProfile from "./pages/UserProfile";
import type { User } from "./types";
import Dashboard from "./pages/Dashboard";
import ProjectApplicants from "./pages/ProjectApplicants";

interface AppProps {
  currentUser: User;
  onUserUpdate: (user: User) => void;
}

function App({ currentUser, onUserUpdate }: AppProps) {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/profile" element={<UserProfile user={currentUser} onSave={onUserUpdate} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project/:id/applicants" element={<ProjectApplicants />} />
      </Routes>
    </HashRouter>
  );
}

export default App;