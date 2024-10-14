import Navbar from './components/navbar';
import MainSidebar from './components/mainsider';

import Admin_Login from './components/admin_login';
import Admin_Signup from './components/admin_signup';
import Admin_Dashboard from './components/admin_dashboard';
import Forgot_Password from './components/forgot_password';
import AddSchool from './components/AddSchool';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";


function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/' element={<Admin_Login />}></Route>
      <Route path='/admin_signup' element={<Admin_Signup />}></Route>
      <Route path='/admin_dashboard' element={<Admin_Dashboard />}></Route>
      <Route path='/forgot_password' element={<Forgot_Password />}></Route>
      <Route path='/add_school' element={<AddSchool />}></Route>






    </Routes>
    
    
    
    </BrowserRouter>
  );
}

export default App;
