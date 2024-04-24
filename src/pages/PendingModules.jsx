import React, { useState, useEffect } from "react";

function PendingModules() {
  const [pendingModules, setPendingModules] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [userRole, setUserRole] = useState(""); // State to store user role

  useEffect(() => {
    fetchPendingModules();
    fetchPendingCourses();
    // Fetch user role or authentication information when component mounts
    fetchUserRole();
  }, []);

  const fetchPendingModules = () => {
    fetch("https://localhost:7209/api/Modules?status=Pending")
      .then((response) => response.json())
      .then((data) => setPendingModules(data))
      .catch((error) =>
        console.error("Error fetching pending modules:", error)
      );
  };

  const fetchPendingCourses = () => {
    fetch("https://localhost:7209/api/Courses?status=Pending")
      .then((response) => response.json())
      .then((data) => setPendingCourses(data))
      .catch((error) =>
        console.error("Error fetching pending courses:", error)
      );
  };

  const fetchUserRole = () => {
    // Implement logic to fetch user role from the server or local storage
    // For demonstration, let's assume the role is stored in localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  };

  const acceptModule = (moduleId) => {
    fetch(
      `https://localhost:7209/api/PendingRequests/AcceptModule?moduleId=${moduleId}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (response.ok) {
          fetchPendingModules();
        } else {
          console.error("Failed to accept module request");
        }
      })
      .catch((error) =>
        console.error("Error accepting module request:", error)
      );
  };

  const rejectModule = (moduleId) => {
    fetch(
      `https://localhost:7209/api/PendingRequests/RejectModule?moduleId=${moduleId}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (response.ok) {
          fetchPendingModules();
        } else {
          console.error("Failed to reject module request");
        }
      })
      .catch((error) =>
        console.error("Error rejecting module request:", error)
      );
  };

  // Function to find the course title by courseId
  const findCourseTitle = (courseId) => {
    const course = pendingCourses.find((course) => course.id === courseId);
    return course ? course.title : "N/A";
  };

  // Function to check if the user is authorized to accept/reject modules
  const isAuthorized = () => {
    // Implement your authorization logic here based on the user's role
    return userRole === "Professor" || userRole === "Registrar";
  };

  return (
    <div>
      <h2>Pending Modules</h2>
      <ul>
        {pendingModules.map((module) => (
          <li key={module.id}>
            <div>
              <strong>Course Title:</strong>{" "}
              {findCourseTitle(module.courseId)}
            </div>
            <div>
              <strong>Module Title:</strong> {module.title}
            </div>
            <div>
              <strong>Description:</strong> {module.description}
            </div>
            <div>
              <strong>Creation Date:</strong> {module.creationDate}
            </div>
            <div>
              <strong>Last Modified Date:</strong> {module.lastModifiedDate}
            </div>
            <div>
              <strong>Version:</strong> {module.version}
            </div>
            <div>
              <strong>Status:</strong> {module.status}
            </div>
            {isAuthorized() && (
              <>
                <button onClick={() => acceptModule(module.id)}>Accept</button>
                <button onClick={() => rejectModule(module.id)}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PendingModules;
