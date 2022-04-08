import React from 'react';
import ReactDOM from 'react-dom';
import { DefaultTheme } from './Themes/DefaultTheme';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { login } from './Api/Auth';
import { register } from './Api/Auth';
import AuthForm from './Component/NavBar/Auth/AuthForm';
import Navbar from './Component/NavBar/Navbar';
import Profile from './Pages/Profile';
import RegisterForm from './Component/NavBar/Register/RegisterForm';
import './App.css';

function App() {
  return (
    
    <div className="App">
      {/*Component "ThemeProvider" takes DefaultTheme props and applies them to the whole project*/}
      <ThemeProvider theme={DefaultTheme}>
        
        {/*Routes listed*/}
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
