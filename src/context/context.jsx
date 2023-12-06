import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import { messages } from "../helpers/message";

const userContext = createContext();

const initialState = {
  login: false,
  token: "",
  name: ""
};

export const UserProvider = (props) => {

  const [user, setUser] = useState(initialState);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const localData = JSON.parse(localStorage.getItem("user"));
      localData ? localData.login && setUser(localData) : setUser(initialState);
    }
  }, [])


  const actions = async (dataUser, navigate) => {
    try {
      let data = {};
      dataUser.name ? data = await axios.post("/users/register", dataUser) :
      data = await axios.post("/users/login", dataUser);

     
      if (data.data.ok) {
        const userLogin = {
          login: true,
          token: data.data.data.token,
          name: data.data.data.name
        };
        localStorage.setItem("user", JSON.stringify(userLogin));
        setUser(userLogin);
        navigate('/employees') 
        messages("success", data.data.message, false, 1500);
      }

    } catch (error) {
      if (!error.response.data.ok) {
        return messages("error", error.response.data.message, false, 1500);
      }
      console.log("error function actions: ", error.message)
    }
  }

  


  const exit = () => {
    setUser(initialState);
    localStorage.removeItem("user");
  }

  const value = {
    actions,
    exit,
    user
  };

  return <userContext.Provider value={value} {...props} />
}

export function UseUser() {
  const context = useContext(userContext)
  if (!context) {
    throw new Error("context error in useUser")
  }
  return context;
}