import React from 'react';
import logo from './logo.svg';
import './App.css';
import login from './Api/auth';





function App() {
  const handleClick = ()=>{
    login("taslim@gmail.com","password");
  }
  
  return (
    <div className="App">
      <button onClick={handleClick}>Login</button>   
     </div>
  );
}

export default App;
