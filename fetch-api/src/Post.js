import React, { useState } from "react";

function Post({ load }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await fetch("http://172.16.4.239:3000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server Response:", result);

      
      setFormData({ name: "", email: "", role: "" });

      if (load) {
        load();
      }


    } catch (error) {
      console.error("Error submitting form:", error);
    }

  };

  return (
    <div style={{textAlign: "center"}}>
      <form id="userinfo" onSubmit={handleSubmit} 
                          style={{marginBottom : "2em"}}>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <br />

        <label htmlFor="role">Role:</label>
        <br />
        <input
          type="text"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        />
        <br />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Post;
