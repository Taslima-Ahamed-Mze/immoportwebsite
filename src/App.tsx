import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Component/NavBar/Navbar';
import AuthForm from './Component/NavBar/Auth/AuthForm';
import {register} from './Api/Auth';
import ResponsiveAppBar from './Component/NavBar/Navbar';
import RegisterForm from './Component/NavBar/Register/RegisterForm';
import Profile from './Pages/Profile';

function App() {

  return (
    <div className="App">

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
