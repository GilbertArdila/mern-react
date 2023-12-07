/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import { UseUser } from "./context/context";

import Login from "./components/Login";
import Nav from "./components/Nav";
import Employees from "./components/Employees";
import Register from "./components/Register";

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  const { user } = UseUser();
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`


   const Public = ({children}) =>{
    return !user.login ? children : <Navigate to="/employees"/>
  }
   const Private = ({children}) =>{
    return user.login ? children : <Navigate to="/"/>
  }

  return (

    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Public><Login /></Public>} />/
        <Route path="/register" element={<Public><Register /></Public>} />/
        <Route path="/employees" element={<Private><Employees /></Private>} />/

      </Routes>

    </BrowserRouter>


  )
}

export default App
