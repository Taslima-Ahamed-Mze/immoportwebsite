import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import Navbar from './Component/NavBar/Navbar';
import AuthForm from './Component/NavBar/Auth/AuthForm';
import {register} from './Api/Auth';


function App() {
  const handleClick = () => {
    register("Test","register","test@gmail.com", "password","01234677");
  }

  return (
    <div className="App">
      <AuthForm />
      <button onClick={handleClick}>Test register</button>

    </div>
  );
}

export default App;
