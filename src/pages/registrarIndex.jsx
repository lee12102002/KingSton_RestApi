import React, { useState, useEffect } from "react";

function RegistrarIndex() {
  const [studentRequests, setStudentRequests] = useState([]);
  const [professorRequests, setProfessorRequests] = useState([]);

  useEffect(() => {
    fetchStudentRequests();
    fetchProfessorRequests();
  }, []);

  const fetchStudentRequests = () => {
    const jwtToken = localStorage.getItem("jwtToken");

    fetch("https://localhost:7209/api/PendingRequests/Students", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setStudentRequests(data))
      .catch((error) =>
        console.error("Error fetching student requests:", error)
      );
  };

  const fetchProfessorRequests = () => {
    const jwtToken = localStorage.getItem("jwtToken");

    fetch("https://localhost:7209/api/PendingRequests/Professors", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProfessorRequests(data))
      .catch((error) =>
        console.error("Error fetching professor requests:", error)
      );
  };

  const acceptStudent = (studentId) => {
    const jwtToken = localStorage.getItem("jwtToken");

    fetch(
      `https://localhost:7209/api/PendingRequests/AcceptStudent?studentId=${studentId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          fetchStudentRequests();
        } else {
          console.error("Failed to accept student request");
        }
      })
      .catch((error) =>
        console.error("Error accepting student request:", error)
      );
  };

  const rejectStudent = (studentId) => {
    const jwtToken = localStorage.getItem("jwtToken");

    fetch(
      `https://localhost:7209/api/PendingRequests/RejectStudent?studentId=${studentId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          fetchStudentRequests();
        } else {
          console.error("Failed to reject student request");
        }
      })
      .catch((error) =>
        console.error("Error rejecting student request:", error)
      );
  };

  const acceptProfessor = (professorId) => {
    const jwtToken = localStorage.getItem("jwtToken");

    fetch(
      `https://localhost:7209/api/PendingRequests/AcceptProfessor?professorId=${professorId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          fetchProfessorRequests();
        } else {
          console.error("Failed to accept professor request");
        }
      })
      .catch((error) =>
        console.error("Error accepting professor request:", error)
      );
  };

  const rejectProfessor = (professorId) => {
    const jwtToken = localStorage.getItem("jwtToken");

    fetch(
      `https://localhost:7209/api/PendingRequests/RejectProfessor?professorId=${professorId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          fetchProfessorRequests();
        } else {
          console.error("Failed to reject professor request");
        }
      })
      .catch((error) =>
        console.error("Error rejecting professor request:", error)
      );
  };

  return (
    <div>
      <div>
        <h2>Student Requests</h2>
        <ul>
          {studentRequests.map((student) => (
            <li key={student.id}>
              <div>
                <strong>ID:</strong> {student.id}
              </div>
              <div>
                <strong>Name:</strong> {student.name}
              </div>
              {/* Include other student details */}
              <button onClick={() => acceptStudent(student.id)}>Accept</button>
              <button onClick={() => rejectStudent(student.id)}>Reject</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Professor Requests</h2>
        <ul>
          {professorRequests.map((professor) => (
            <li key={professor.id}>
              <div>
                <strong>ID:</strong> {professor.id}
              </div>
              <div>
                <strong>Name:</strong> {professor.name}
              </div>
              {/* Include other professor details */}
              <button onClick={() => acceptProfessor(professor.id)}>
                Accept
              </button>
              <button onClick={() => rejectProfessor(professor.id)}>
                Reject
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RegistrarIndex;
