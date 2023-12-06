import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Employees from "./components/Employees";
import Register from "./components/Register";
import axios from "axios";
import { UseUser } from "./context/context";


axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  const {user} = UseUser();
  axios.defaults.headers.common['Authorization']=`Bearer ${user.token}`
  

  return (
    
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Login/>}/>/
        <Route path="/employees" element={<Employees/>}/>/ 
        <Route path="/register" element={<Register/>}/>/ 
      </Routes> 

      </BrowserRouter>

    
  )
}

export default App
