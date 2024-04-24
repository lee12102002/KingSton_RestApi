import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Student");
  const [error, setError] = useState(""); // State to hold the error message
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create login data
    const loginData = {
      email,
      password,
    };
  
    try {
      // Make a POST request to the login endpoint based on the selected user type
      let loginEndpoint;
      switch (userType) {
        case "Student":
          loginEndpoint = "https://localhost:7209/api/Students/login";
          break;
        case "Professor":
          loginEndpoint = "https://localhost:7209/api/Professor/login";
          break;
        case "Registrar":
          loginEndpoint = "https://localhost:7209/api/Registrars/login";
          break;
        default:
          loginEndpoint = "https://localhost:7209/api/Students/login";
          break;
      }
  
      const response = await axios.post(loginEndpoint, loginData);
  
      // Extract the token and professor's ID from the response data
      const { token, professorId, role } = response.data;
  
      // Save the token, professor's ID, and role to local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("professorId", professorId);
      localStorage.setItem("userRole", role); // Store the user's role
  
      // Save the email to local storage
      localStorage.setItem("professorEmail", email);
  
      // Redirect based on the selected user type
      switch (userType) {
        case "Student":
          navigate("/studentIndex");
          break;
        case "Professor":
          navigate("/professorIndex");
          break;
        case "Registrar":
          navigate("/registrarDashboard");
          break;
        default:
          navigate("/studentIndex");
          break;
      }
    } catch (error) {
      // Update the error state with the error message
      setError(
        error.response ? error.response.data : "An error occurred during login."
      );
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      {/* Render error message if present */}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>User Type:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="Student">Student</option>
            <option value="Professor">Professor</option>
            <option value="Registrar">Registrar</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
