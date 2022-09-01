import { DefaultTheme } from './Themes/DefaultTheme';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AuthForm from './Component/NavBar/Auth/AuthForm';
import Navbar from './Component/NavBar/Navbar';
import Profile from './Pages/Profile';
import RegisterForm from './Component/NavBar/Register/RegisterForm';
import './App.css';
import Properties from './Component/Property';
import ClientContext from './Contexts/ClientContext'
import { useContext } from 'react';
import { PrivateRoute } from './Config/Routes';
import SingleProperty from './Component/SingleProperty';

function App() {
  const user = useContext(ClientContext);

  return (

    <div className="App">

      {/*Component "ThemeProvider" takes DefaultTheme props and applies them to the whole project*/}
      {/* <ThemeProvider theme={DefaultTheme}> */}

        <Navbar />
        {/*Routes listed*/}
        <Routes>
          {/* <Route path='/' element={<PrivateRoute />}>
            <Route path='/'element={<AuthForm />} />
          </Route> */}
          <Route path="/" element={<Properties />} />
          <Route path="/authentification" element={<AuthForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/espaceclient" element={<Profile />} />
          <Route path="/property/:name" element={<SingleProperty/>}/>

        </Routes>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
