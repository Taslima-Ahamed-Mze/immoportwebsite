import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthForm from './Component/NavBar/Auth/AuthForm';
import RegisterForm from './Component/NavBar/Register/RegisterForm';
import Profile from './Pages/Profile';
import Navbar from './Component/NavBar/Navbar';
import ClientContext from './Contexts/ClientContext';


function App() {

  return (



    <div className="App">
      <Navbar />
      {/* Routes listing*/}
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>


  );
}

export default App;
