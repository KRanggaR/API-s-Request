import React, { useState, useEffect } from 'react';
import Post from './Post'
import Popup from "./Popup";

function Component() {
    // const [names, setName] = useState([]);

    const [data, setData] = useState([])
    
    const [selectedUser, setSelectedUser] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = (user) => {
        setSelectedUser(user);
        setIsPopupOpen(true);
      };
      
      const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedUser(null);
        return;
      };
    
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://172.16.4.239:3000/api/employees');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const result = await response.json();
            
            setData(result)
            
            
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
        try {
          const response = await fetch(`http://172.16.4.239:3000/api/employees/${id}`, {
            method: "DELETE",
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          console.log(`Deleted user with ID: ${id}`);
    
          // Refresh data after deletion
          fetchUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      };

    useEffect(() => {

    fetchUsers();
    }, []);
    // console.log(data, 'this is data')

    return (
        <>
        <Post load={fetchUsers}/>
        
        <div style={{textAlign: "center"}}>

            
            {/* <button onClick={fetchUsers}>FETCH</button> */}
            <table border="1" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>ROLE</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    {
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button 
                                        onClick={() => openPopup(item)}>
                                        Edit
                                    </button>
                                </td>
                                <td><button
                                        onClick={() => deleteUser(item.id)}
                                >Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        {isPopupOpen && (
        <Popup user={selectedUser} closePopup={closePopup} refreshData={fetchUsers} />
      )}
        </>
    );
}

export default Component;
