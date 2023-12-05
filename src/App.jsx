import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Employees from "./components/Employees";
import Register from "./components/Register";

function App() {
  
  

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
