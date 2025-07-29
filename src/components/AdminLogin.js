import React, { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Admin login attempt:', { username, password }); // Debug log
    
    fetch('https://trackman-portal-backend.onrender.com/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(res => {
      console.log('Response status:', res.status); // Debug log
      return res.json();
    })
    .then(data => {
      console.log('Admin login response:', data); // Debug log
      if (data.success) {
        console.log('Admin login successful, calling onLogin'); // Debug log
        onLogin();
      } else {
        alert('Invalid admin credentials');
      }
    })
    .catch(err => {
      console.error('Admin login error:', err); // Debug log
      alert('Login failed');
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ margin: 20 }}>
      <h2>Admin Login</h2>
      <input
        type="text"
        placeholder="Admin Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      /><br /><br />
      <input
        type="password"
        placeholder="Admin Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      /><br /><br />
      <button type="submit">Login as Admin</button>
    </form>
  );
}
