import React, { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    
    fetch('https://trackman-portal-backend.onrender.com/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        onLogin();
      } else {
        alert('Invalid admin credentials');
      }
    })
    .catch(err => {
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
