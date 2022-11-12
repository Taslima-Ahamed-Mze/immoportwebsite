import { Routes, Route } from 'react-router-dom';
import AuthForm from './Component/NavBar/Auth/AuthForm';
import Navbar from './Component/NavBar/Navbar';
import Profile from './Pages/Profile';
import RegisterForm from './Component/NavBar/Register/RegisterForm';
import './App.css';
import Properties from './Component/Property';
import SingleProperty from './Component/SingleProperty';
// @ts-ignore
import { NotificationContainer } from 'react-notifications';
// @ts-ignore
import 'react-notifications/lib/notifications.css';

function App() {

  return (
    <div className="App">
      <Navbar />
      {/*Routes listed*/}
      <Routes>
        <Route path="/" element={<Properties />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/espaceclient" element={<Profile />} />
        <Route path="/property/:name" element={<SingleProperty />} />
      </Routes>
      <NotificationContainer />
    </div>
  );
}

export default App;
