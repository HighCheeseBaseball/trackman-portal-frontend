import React, { useState } from "react";
import Login from "./components/Login";
import VideoList from "./components/VideoList";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  console.log('App state:', { user, isAdmin, showAdminLogin }); // Debug log

  if (showAdminLogin) {
    console.log('Showing admin login'); // Debug log
    return <AdminLogin onLogin={() => {
      console.log('Admin login successful, setting isAdmin to true and hiding admin login'); // Debug log
      setIsAdmin(true);
      setShowAdminLogin(false); // This was missing!
    }} />;
  }

  if (isAdmin) {
    console.log('Showing admin panel'); // Debug log
    return <AdminPanel />;
  }

  if (!user) {
    return (
      <div>
        <Login onLogin={setUser} />
        <button onClick={() => {
          console.log('Admin login button clicked'); // Debug log
          setShowAdminLogin(true);
        }} style={{ margin: 20 }}>
          Admin Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>TrackMan Video Portal</h1>
      <p>Welcome, {user}!</p>
      <VideoList player={user} />
      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
}

export default App;
