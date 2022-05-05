import { DefaultTheme } from './Themes/DefaultTheme';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AuthForm from './Component/NavBar/Auth/AuthForm';
import ClientContext from './Contexts/ClientContext';
import Navbar from './Component/NavBar/Navbar';
import Profile from './Pages/Profile';
import RegisterForm from './Component/NavBar/Register/RegisterForm';
import './App.css';
import Properties from './Component/Property';
import SingleProperty from './Component/SingleProperty';

function App() {
  return (
    
    <div className="App">
      {/*Component "ThemeProvider" takes DefaultTheme props and applies them to the whole project*/}
      {/* <ThemeProvider theme={DefaultTheme}> */}

        <Navbar />
        
        {/*Routes listed*/}
        <Routes>
          <Route path="/" element={<Properties/>}/>
          <Route path="/property/:id" element={<SingleProperty/>}/>

          <Route path="/auth" element={<AuthForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
