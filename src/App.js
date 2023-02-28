import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from "./components/homepage"
import Login from "./components/loginpage"
import Profile from "./components/profilepage"
import Register from "./components/registerpage"

import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/homepage" element={<Homepage />}/>
        <Route path="/" element={<Login />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;
