// ProfessorDashboard.jsx
import React from "react";
import { Link, Routes, Route } from "react-router-dom"; // Import Routes from react-router-dom
import CreatedCourses from "./CreatedCourses"; 
import AddCourse from "./AddCourse";

function ProfessorDashboard() {
  return (
    <div>
      <h2>Professor Dashboard</h2>
      <Link to="/addCourse">
        <button>Add Course</button>
      </Link>
      <Link to="/createdCourses"> {/* Link to the new page */}
        <button>View Created Courses</button>
      </Link>
      
      {/* Wrap the Route inside a Routes component */}
      <Routes>
        <Route path="/addCourse" element={<AddCourse />} />
        <Route path="/createdCourses" element={<CreatedCourses />} />
      </Routes>
    </div>
  );
}

export default ProfessorDashboard;
