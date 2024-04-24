import React, { useState, useEffect } from "react";
import axios from "axios";

function PendingList({ type }) {
  const [pendingItems, setPendingItems] = useState([]);

  useEffect(() => {
    async function fetchPendingItems() {
      try {
        const jwtToken = localStorage.getItem("jwtToken"); // Retrieve JWT token from localStorage

        const response = await axios.get(
          `https://localhost:7209/api/PendingRequests/${
            type === "Students" ? "Students" : "Professors"
          }`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`, // Include JWT token in headers
            },
          }
        );
        setPendingItems(response.data);
      } catch (error) {
        console.error(`Error fetching pending ${type}:`, error);
      }
    }

    fetchPendingItems();
  }, [type]);

  const handleAccept = async (id) => {
    try {
      const jwtToken = localStorage.getItem("jwtToken"); // Retrieve JWT token from localStorage

      await axios.post(
        `https://localhost:7209/api/PendingRequests/Accept${
          type === "Student" ? "Student" : "Professor"
        }?${type.toLowerCase()}Id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Include JWT token in headers
          },
        }
      );
      setPendingItems(pendingItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(`Error accepting ${type}:`, error);
    }
  };

  const handleReject = async (id) => {
    try {
      const jwtToken = localStorage.getItem("jwtToken"); // Retrieve JWT token from localStorage

      await axios.post(
        `https://localhost:7209/api/PendingRequests/Reject${
          type === "Student" ? "Student" : "Professor"
        }?${type.toLowerCase()}Id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Include JWT token in headers
          },
        }
      );
      setPendingItems(pendingItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(`Error rejecting ${type}:`, error);
    }
  };

  return (
    <div>
      <h3>Pending {type}</h3>
      <ul>
        {pendingItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.email}
            <button onClick={() => handleAccept(item.id)}>Accept</button>
            <button onClick={() => handleReject(item.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PendingList;
