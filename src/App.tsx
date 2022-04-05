import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthForm from './Component/Auth/form';
import login from './Api/auth';





function App() {
  const handleClick = ()=>{
    login("taslim@gmail.com","password");
  }
  
  return (
    <div className="App">
      <AuthForm />
    </div>
  );
}

export default App;
