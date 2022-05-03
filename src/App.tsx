<<<<<<< HEAD
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AuthForm from './Component/NavBar/Auth/AuthForm';
import RegisterForm from './Component/NavBar/Register/RegisterForm';
import Profile from './Pages/Profile';
import Navbar from './Component/NavBar/Navbar';
import ClientContext from './Contexts/ClientContext';

=======
import { DefaultTheme } from './Themes/DefaultTheme';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AuthForm from './Component/NavBar/Auth/AuthForm';
import ClientContext from './Contexts/ClientContext';
import Navbar from './Component/NavBar/Navbar';
import Profile from './Pages/Profile';
import RegisterForm from './Component/NavBar/Register/RegisterForm';
import './App.css';
>>>>>>> BD

function App() {
  return (
<<<<<<< HEAD

    <div className="App">
      <Navbar />
      {/* Routes listing*/}
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
=======
    
    <div className="App">
      {/*Component "ThemeProvider" takes DefaultTheme props and applies them to the whole project*/}
      <ThemeProvider theme={DefaultTheme}>

        <Navbar />
        
        {/*Routes listed*/}
        <Routes>
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </ThemeProvider>
>>>>>>> BD
    </div>

  );
}

export default App;
