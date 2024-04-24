import React, { useState } from "react";
import axios from "axios";

function SignUp() {
  // State variables to hold form data and selected role
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    department: "",
    phoneNumber: "",
  });

  const [role, setRole] = useState("Student"); // Default role is set to "Student"

  // Function to handle form data changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle role selection changes
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Determine the API endpoint based on the selected role
    let apiEndpoint;
    switch (role) {
      case "Student":
        apiEndpoint = "https://localhost:7209/api/Students";
        break;
      case "Professor":
        apiEndpoint = "https://localhost:7209/api/Professor";
        break;
      case "Registrar":
        apiEndpoint = "https://localhost:7209/api/Registrars";
        break;
      default:
        console.error("Invalid role selected.");
        return;
    }

    // Send form data to the selected API endpoint
    try {
      const response = await axios.post(apiEndpoint, formData);

      // Handle successful response
      console.log("User registered successfully:", response.data);

      // Clear the form after submission
      setFormData({
        name: "",
        email: "",
        password: "",
        dob: "",
        department: "",
        phoneNumber: "",
      });
    } catch (error) {
      // Handle error response
      console.error(
        "Error registering user:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Name input */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email input */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password input */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date of Birth input */}
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        {/* Department input */}
        <div>
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone Number input */}
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role selection */}
        <div>
          <label>Role:</label>
          <select name="role" value={role} onChange={handleRoleChange}>
            <option value="Student">Student</option>
            <option value="Professor">Professor</option>
            <option value="Registrar">Registrar</option>
          </select>
        </div>

        {/* Submit button */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
