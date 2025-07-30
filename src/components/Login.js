import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (isSignUp && password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    setLoading(true);
    
    try {
      if (isSignUp) {
        // Register new user
        const response = await axios.post('https://trackman-portal-backend.onrender.com/api/register', {
          username,
          password,
          name: name || username,
          email: email || `${username}@example.com`
        });
        
        if (response.data.success) {
          alert('Registration successful! Please login.');
          setIsSignUp(false);
          setPassword('');
          setConfirmPassword('');
          setName('');
          setEmail('');
        }
      } else {
        // Login existing user
        const response = await axios.post('https://trackman-portal-backend.onrender.com/api/login', {
          username,
          password
        });
        
        if (response.data.success) {
          onLogin(response.data.user.name || username);
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ margin: 20, maxWidth: 400, margin: '50px auto', padding: 20 }}>
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: 10, fontSize: 16 }}
          />
        </div>
        
        {isSignUp && (
          <div style={{ marginBottom: 15 }}>
            <input
              type="text"
              placeholder="Full Name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ width: '100%', padding: 10, fontSize: 16 }}
            />
          </div>
        )}
        
        {isSignUp && (
          <div style={{ marginBottom: 15 }}>
            <input
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: 10, fontSize: 16 }}
            />
          </div>
        )}
        
        <div style={{ marginBottom: 15 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 10, fontSize: 16 }}
          />
        </div>
        
        {isSignUp && (
          <div style={{ marginBottom: 15 }}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              style={{ width: '100%', padding: 10, fontSize: 16 }}
            />
          </div>
        )}
        
        <div style={{ marginBottom: 15 }}>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: 12, 
              fontSize: 16, 
              backgroundColor: loading ? '#ccc' : '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: 5,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Loading...' : (isSignUp ? "Sign Up" : "Login")}
          </button>
        </div>
      </form>
      
      <div style={{ textAlign: 'center' }}>
        <button 
          onClick={() => {
            setIsSignUp(!isSignUp);
            setPassword('');
            setConfirmPassword('');
            setName('');
            setEmail('');
          }}
          disabled={loading}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#007bff', 
            cursor: loading ? 'not-allowed' : 'pointer',
            textDecoration: 'underline'
          }}
        >
          {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
