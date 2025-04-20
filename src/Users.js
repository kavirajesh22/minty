// Users.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from the backend
    axios.get('http://localhost:5000/users')
      .then((response) => {
        setUsers(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('there was an error fetching the users', error);
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []); 

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;