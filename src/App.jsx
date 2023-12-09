/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import { UseUser } from "./context/context";

import Login from "./components/Login";
import Nav from "./components/Nav";
import Employees from "./components/Employees";
import Register from "./components/Register";
import AllEmployees from "./components/AllEmployees";
import AllUsers from "./components/AllUsers";

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  const { user } = UseUser();

  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`


  const Public = ({ children }) => {

    return !user.login  && children 
  }



  const SuperAdmin = ({ children }) => {

    return user.role === "superAdmin" && user.login   ? children : <Navigate to="/" />
  }

  const Private = ({ children }) => {


    return user.role !== "superAdmin" && user.login  ? children : <Navigate to="/" />
  }

  return (

    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Public><Login /></Public>} />/

        <Route path="/register" element={<Public><Register /></Public>} />/


        <Route path="/allEmployees" element={<SuperAdmin><AllEmployees /></SuperAdmin>} />/
        <Route path="/allUsers" element={<SuperAdmin><AllUsers /></SuperAdmin>} />/
        <Route path="/employees" element={<Private><Employees /></Private>} />/
        

      </Routes>

    </BrowserRouter>


  )
}

export default App
