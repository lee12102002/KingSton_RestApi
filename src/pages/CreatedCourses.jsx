import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CreatedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [professorId, setProfessorId] = useState(null);
  const [modules, setModules] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const professorEmail = localStorage.getItem("professorEmail");
        const jwtToken = localStorage.getItem("jwtToken"); // Retrieve JWT token from local storage
  
        // Include JWT token in headers of axios requests
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        };
  
        const professorResponse = await axios.get(`https://localhost:7209/api/Professor/email/${professorEmail}`, config);
        const fetchedProfessorId = professorResponse.data;
        setProfessorId(fetchedProfessorId);
  
        const coursesResponse = await axios.get(`https://localhost:7209/api/Courses/professor/${fetchedProfessorId}`, config);
        setCourses(coursesResponse.data);
  
        const modulesResponse = await axios.get(`https://localhost:7209/api/Modules/professor/${fetchedProfessorId}`, config);
        setModules(modulesResponse.data);
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const handleSelectCourse = (courseId) => {
    setSelectedCourseId(courseId);
    localStorage.setItem("selectedCourseId", courseId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>All Courses</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Professor ID</th>
            <th>Batch</th>
            <th>Last Modified Date</th>
            <th>Creation Date</th>
            <th>Price</th>
            <th>Version</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.professorId}</td>
              <td>{course.batch}</td>
              <td>{course.lastModifiedDate}</td>
              <td>{course.creationDate}</td>
              <td>{course.price}</td>
              <td>{course.version}</td>
              <td>{course.status}</td>
              <td>
                <button onClick={() => handleSelectCourse(course.id)}>Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/addModules?courseId=${selectedCourseId}&professorId=${professorId}`}>
        <button disabled={!selectedCourseId}>Create Module</button>
      </Link>

      <h1>Modules Created by Professor</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Course ID</th>
            <th>Professor ID</th>
            <th>Version</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            <tr key={module.id}>
              <td>{module.title}</td>
              <td>{module.description}</td>
              <td>{module.courseId}</td>
              <td>{module.professorId}</td>
              <td>{module.version}</td>
              <td>{module.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CreatedCourses;
