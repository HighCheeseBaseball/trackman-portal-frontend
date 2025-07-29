import React, { useState, useEffect } from "react";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "", name: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    fetch('https://trackman-portal-backend.onrender.com/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Failed to fetch users'));
  }

  function addUser(e) {
    e.preventDefault();
    
    fetch('https://trackman-portal-backend.onrender.com/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setNewUser({ username: "", password: "", name: "", email: "" });
        fetchUsers();
        alert('User added successfully!');
      }
    })
    .catch(err => alert('Failed to add user'));
  }

  function deleteUser(userId) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`https://trackman-portal-backend.onrender.com/api/admin/users/${userId}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchUsers();
          alert('User deleted successfully!');
        }
      })
      .catch(err => alert('Failed to delete user'));
    }
  }

  return (
    <div style={{ margin: 20 }}>
      <h1>Admin Panel</h1>
      
      <h2>Add New User</h2>
      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={e => setNewUser({...newUser, username: e.target.value})}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={e => setNewUser({...newUser, password: e.target.value})}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="Full Name"
          value={newUser.name}
          onChange={e => setNewUser({...newUser, name: e.target.value})}
          required
        /><br /><br />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={e => setNewUser({...newUser, email: e.target.value})}
          required
        /><br /><br />
        <button type="submit">Add User</button>
      </form>

      <h2>Current Users</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Username</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{user.name}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{user.username}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>{user.email}</td>
              <td style={{ border: '1px solid #ddd', padding: 8 }}>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
