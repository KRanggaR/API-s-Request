import React, { useState } from "react";
import "./Popup.css"; // Import the CSS for styling

function Popup({ user, closePopup, refreshData }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update user details using PATCH
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://172.16.4.239:3000/api/employees/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("User updated successfully!");
      closePopup(); // Close the pop-up
      refreshData(); // Refresh data after updating
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Edit User</h2>

        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>Email:</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />

        <label>Role:</label>
        <input type="text" name="role" value={formData.role} onChange={handleChange} />

        <div className="popup-buttons">
          <button onClick={handleUpdate}>Update</button>
          <button onClick={closePopup}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
