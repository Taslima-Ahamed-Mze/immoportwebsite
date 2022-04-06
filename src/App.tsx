import React from 'react';
import logo from './logo.svg';
import {
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './App.css';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import Navbar from './Component/NavBar/Navbar';
import AuthForm from './Component/NavBar/Auth/AuthForm';
import { login } from './Api/auth';
import ResponsiveAppBar from "./Component/NavBar/Navbar";
import RegisterForm from './Component/NavBar/Register/RegisterForm';
import Profile from './Pages/Profile';

function App() {

  return (
    <div className="App">

      {/* Routes listing*/}
      <Routes>
        <Route path="/" element={<ResponsiveAppBar />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

    </div>
  );
}

export default App;
