import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import Navbar from './Component/NavBar/Navbar';
import AuthForm from './Component/NavBar/Auth/AuthForm';

// ReactDOM.render(
//   <StyledEngineProvider injectFirst>
//     <Navbar />
//   </StyledEngineProvider>,
//   document.querySelector("#root")
// );
function App() {
  return (
    <div className="App">
      <AuthForm />
    </div>
  );
}

export default App;
