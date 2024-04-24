import React, { useEffect, useState } from "react";
import api from "./api"; // Import your custom Axios instance

function CRUDPage() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    dob: "",
    department: "",
    phoneNumber: "",
    password: "", // Add a password field
  });

  // Function to fetch students from the backend (GET)
  const fetchStudents = async () => {
    try {
      const response = await api.get("http://localhost:5251/api/Students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Function to handle form data changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission for Create/Update (POST/PUT)
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (formData.id) {
        // Update the student record (PUT)
        await api.put(
          `http://localhost:5251/api/Students/${formData.id}`,
          formData
        );
        console.log("Student updated successfully.");
      } else {
        // Create a new student record (POST)
        // Remove the id field to avoid any ID-related errors
        const { id, ...newFormData } = formData;
        await api.post("http://localhost:5251/api/Students", newFormData);
        console.log("Student created successfully.");
      }

      // Refresh the list of students
      fetchStudents();
      // Clear the form data
      setFormData({
        id: "",
        name: "",
        email: "",
        dob: "",
        department: "",
        phoneNumber: "",
        password: "",
      });
    } catch (error) {
      console.error("Error creating or updating student:", error.response.data);
    }
  };

  // Function to handle student deletion (DELETE)
  const handleDeleteStudent = async (id) => {
    try {
      await api.delete(`http://localhost:5251/api/Students/${id}`);
      console.log("Student deleted successfully.");
      // Refresh the list of students
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Fetch students when the component is mounted
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>CRUD Operations</h2>

      {/* Student list */}
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <span>{student.name}</span>
            {/* Buttons for editing and deleting a student */}
            <button
              onClick={() =>
                setFormData({
                  id: student.id,
                  name: student.name,
                  email: student.email,
                  dob: student.dob,
                  department: student.department,
                  phoneNumber: student.phoneNumber,
                  password: "", // Set password field to empty when editing
                })
              }
            >
              Edit
            </button>
            <button onClick={() => handleDeleteStudent(student.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Form for creating/updating a student */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{formData.id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default CRUDPage;
