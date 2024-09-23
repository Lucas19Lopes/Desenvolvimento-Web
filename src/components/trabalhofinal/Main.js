import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from "./components/pages/Login";
import Signup from './components/pages/Signup';
import Home from "./components/pages/Home";
import Schedule from './components/pages/Schedule';
import Appointments from './components/pages/Appointments';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/agendados" element={<Appointments />} />
      </Routes>
    </Router>
  );
}

export default App;

