import React, { useState, useEffect } from "react";

function PendingCourses() {
  const [pendingCourses, setPendingCourses] = useState([]);
  const [userRole, setUserRole] = useState(""); // State to store user role

  useEffect(() => {
    fetchPendingCourses();
    // Fetch user role or authentication information when component mounts
    fetchUserRole();
  }, []);

  const fetchPendingCourses = () => {
    fetch("https://localhost:7209/api/Courses?status=Pending")
      .then((response) => response.json())
      .then((data) => setPendingCourses(data))
      .catch((error) =>
        console.error("Error fetching pending courses:", error)
      );
  };

  const fetchUserRole = () => {
    // For demonstration, let's assume the role is stored in localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    console.log("User role:", role);
  };

  const acceptCourse = (courseId) => {
    console.log("Accepting course:", courseId);
    // Implement accept course logic
  };

  const rejectCourse = (courseId) => {
    console.log("Rejecting course:", courseId);
    // Implement reject course logic
  };

  // Function to check if the user is authorized to accept/reject courses
  const isAuthorized = () => {
    // Implement your authorization logic here based on the user's role
    console.log("User role in isAuthorized:", userRole);
    return userRole === "Professor" || userRole === "Registrar";
  };

  return (
    <div>
      <h2>Pending Courses</h2>
      <ul>
        {pendingCourses.map((course) => (
          <li key={course.id}>
            <div>
              <strong>ProfessorId:</strong> {course.professorId}
            </div>
            <div>
              <strong>Batch:</strong> {course.batch}
            </div>
            <div>
              <strong>Title:</strong> {course.title}
            </div>
            <div>
              <strong>Description:</strong> {course.description}
            </div>
            <div>
              <strong>Creation Date:</strong> {course.creationDate}
            </div>
            <div>
              <strong>Last Modified Date:</strong> {course.lastModifiedDate}
            </div>
            <div>
              <strong>Price:</strong> {course.price}
            </div>
            <div>
              <strong>Version:</strong> {course.version}
            </div>
            <div>
              <strong>Status:</strong> {course.status}
            </div>
            {isAuthorized() && (
              <>
                <button onClick={() => acceptCourse(course.id)}>Accept</button>
                <button onClick={() => rejectCourse(course.id)}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PendingCourses;
