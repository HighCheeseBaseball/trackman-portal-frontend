import React, { useState } from "react";
import Login from "./components/Login";
import VideoList from "./components/VideoList";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  if (showAdminLogin) {
    return <AdminLogin onLogin={() => setIsAdmin(true)} />;
  }

  if (isAdmin) {
    return <AdminPanel />;
  }

  if (!user) {
    return (
      <div>
        <Login onLogin={setUser} />
        <button onClick={() => setShowAdminLogin(true)} style={{ margin: 20 }}>
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
