import React from "react";
import { Link } from "react-router-dom";

function RegistrarDashboard() {
  return (
    <div>
      <h2>Registrar Dashboard</h2>
      <Link to="/registrarIndex">
        <button>ACCEPT USERS</button>
      </Link>
      <Link to="/pendingCourses">
        <button>ACCEPT COURSES</button>
      </Link>
      <Link to="/pendingModules">
        <button>ACCEPT MODULES</button>
      </Link>
    </div>
  );
}

export default RegistrarDashboard;
