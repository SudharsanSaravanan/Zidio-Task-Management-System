import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx"; 

function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
