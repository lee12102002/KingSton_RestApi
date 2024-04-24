import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CRUDPage from "./pages/CRUDPage";
import RegistrarIndex from "./pages/registrarIndex"; // Import RegistrarIndex component
import ProfessorDashboard from "./pages/professorIndex";
import AddCourse from "./pages/AddCourse";
import AddModules from "./pages/AddModules";
import Home from "./pages/Home";
import CreatedCourses from "./pages/CreatedCourses";
import RegistrarDashboard from "./pages/RegistrarDashboard";
import PendingCourses from "./pages/PendingCourses";
import PendingModules from "./pages/PendingModules";
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>My Application</h1>
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/crud">CRUD Operations</Link>

            {/* Add link to Registrar Dashboard */}
          </nav>
        </header>
        <main>
          {/* Define your routes here */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/crud" element={<CRUDPage />} />
            <Route path="/registrarIndex" element={<RegistrarIndex />} />
            <Route path="/registrardashboard" element={<RegistrarDashboard />} />
            <Route path="/professorIndex" element={<ProfessorDashboard />} />
            <Route path="/addCourse" element={<AddCourse />} />
            <Route path="/addModules" element={<AddModules />} />
            <Route path="/createdCourses" element={<CreatedCourses />} />
            <Route path="/pendingCourses" element={<PendingCourses />} />
            <Route path="/pendingModules" element={<PendingModules />} />
            {/* Add route for RegistrarIndex */}
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
