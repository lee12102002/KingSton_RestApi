import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function AddModules() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = parseInt(queryParams.get("courseId")); // Convert courseId to a number

  const [moduleId, setModuleId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [version, setVersion] = useState("");
  const [professorId, setProfessorId] = useState(null);

  useEffect(() => {
    const fetchProfessorId = async () => {
      try {
        // Retrieve professor's email from local storage
        const professorEmail = localStorage.getItem("professorEmail");
        if (professorEmail) {
          // Make GET request to fetch professorId using the email
          const response = await axios.get(`https://localhost:7209/api/Professor/email/${professorEmail}`);
          setProfessorId(response.data);
        }
      } catch (error) {
        console.error("Error fetching professorId:", error);
      }
    };

    fetchProfessorId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const moduleData = {
        id: moduleId,
        courseId: courseId,
        ProfessorId: professorId,
        title,
        description,
        version: parseInt(version),
        status: "Pending",
      };

      // Retrieve JWT token from localStorage
      const jwtToken = localStorage.getItem("jwtToken");

      // POST the module data to create a new module with JWT token in headers
      await axios.post("https://localhost:7209/api/Modules", moduleData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      console.log("Module added successfully:", moduleData);
      // Optionally, you can handle success response here
    } catch (error) {
      console.error("Error adding module:", error);
    }
  };

  const handleCreateNewModule = () => {
    // Clear input fields to create a new module
    setModuleId("");
    setTitle("");
    setDescription("");
    setVersion("");
  };

  return (
    <div>
      <h2>Add Module</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Module Id:</label>
          <input
            type="text"
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Version:</label>
          <input
            type="number"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Module</button>
      </form>
      <button onClick={handleCreateNewModule}>Create New Module</button>
    </div>
  );
}

export default AddModules;
