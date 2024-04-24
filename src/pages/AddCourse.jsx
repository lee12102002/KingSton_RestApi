import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AddModules from "./AddModules";

function AddCourse() {
  const [batch, setBatch] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [version, setVersion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [professorId, setProfessorId] = useState(null);

  
  useEffect(() => {
    const fetchprofessorId = async () => {
      try {
        // Retrieve professor's email from local storage
        const professorEmail = localStorage.getItem("professorEmail");
        if (professorEmail) {
          // Make GET request to fetch professorId using the email
          const response = await axios.get(`https://localhost:7209/api/Professor/email/${professorEmail}`);
          // Check if response data is valid
          if (response.data && typeof response.data.professorId === 'number') {
            setProfessorId(response.data.professorId); // Set professorId directly
          } else {
            console.error("ProfessorId not found or invalid in the response:", response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching professorId:", error);
      }
    };
  
    fetchprofessorId();
  }, []);
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Fetch professorId using the stored email
      const professorEmail = localStorage.getItem("professorEmail");
      if (!professorEmail) {
        console.error("Professor email not found in local storage.");
        return;
      }
      const professorResponse = await axios.get(`https://localhost:7209/api/Professor/email/${professorEmail}`);
      
      // Assuming the professor ID is directly available in the response data
      const professorId = professorResponse.data;
      const courseId = parseInt(id);
      const apiUrl = `https://localhost:7209/api/Courses?id=${courseId}&professorEmail=${encodeURIComponent(professorEmail)}`;
      const courseData = {
        id: courseId,
        ProfessorId: professorId,
        professorEmail,
        batch,
        title,
        description,
        price: parseFloat(price),
        creationDate: new Date(),
        lastModifiedDate: new Date(),
        version: parseInt(version),
        status: "Pending",
        deleteStatus: "null",
        updateStatus: "null",
      };
  
      const jwtToken = localStorage.getItem("jwtToken");
  
      // POST the course data to create a new course
      await axios.post(apiUrl, courseData, {
        headers: {
          Authorization: `Bearer ${jwtToken}` // Include JWT token in headers
        }
      });
      setSubmitted(true);
      // Redirect or show success message
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  
  

  return (
    <div>
      <h2>Add Course</h2>
      <div>
        <Link to="/addCourse">Add Course</Link>
        <Link to="/addModules">Add Modules</Link>
      </div>
      <form onSubmit={handleSubmit}>
      
      <div>
          <label>Course Id:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Batch:</label>
          <input
            type="text"
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
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
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
        {!submitted && <button type="submit">Add Course</button>}
      </form>
      <AddModules courseId={id} professorId={professorId} />
    </div>
  );
}

export default AddCourse;
