import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import AdminPage from "./AdminPage";

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/admin" element={<AdminPage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
