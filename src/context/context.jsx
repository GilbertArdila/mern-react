import axios from "axios";
import Swal from "sweetalert2";
import  { createContext, useContext, useState } from "react";

const userContext = createContext();

const initialState = {
    login:false,
    token:"",
    name:""
};

export const UserProvider = (props)=>{
    
  const [user,setUser] = useState(initialState);

  const loginUser = async (dataUser,navigate) =>{
    try {
        const {data} = await axios.post("http://localhost:4000/users/login",dataUser);
        if(data.ok){
            const userLogin ={
                login:true,
                token:data.data.token,
                name:data.data.name
            };
            localStorage.setItem("user",JSON.stringify(userLogin));
            setUser(userLogin);
            navigate('/employees');
            Swal.fire({
                icon:"success",
                title:data.message,
                showConfirmButton:false,
                timer:1500,
            });
        }
        
    } catch (error) {
       if(!error.response.data.ok){
        return Swal.fire({
            icon:"error",
            title:error.response.data.message,
            showConfirmButton:false,
            timer:1500,
        })
       }
       console.log("error function login: ",error.message)
    }
  }

  const registerUser = async (dataUser,navigate) =>{
    try {
        const {data} = await axios.post("http://localhost:4000/users/register",dataUser);
        if(data.ok){
            
            navigate('/');
            Swal.fire({
                icon:"success",
                title:data.message,
                showConfirmButton:false,
                timer:1500,
            });
        }
        
    } catch (error) {
       if(!error.response.data.ok){
        return Swal.fire({
            icon:"error",
            title:error.response.data.message,
            showConfirmButton:false,
            timer:1500,
        })
       }
       console.log("error function register: ",error.message)
    }
  }


  const exit = () =>{
    setUser(initialState);
    localStorage.removeItem("user");
  }

  const value = {
    loginUser,
    registerUser,
    exit,
    user
  };

  return <userContext.Provider value={value} {...props}/>
}

export function UseUser(){
    const context = useContext(userContext)
    if(!context){
        throw new Error("context error in use user")
    }
    return context;
}