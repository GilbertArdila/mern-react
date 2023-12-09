import { useState } from "react";
import { FaUserTie } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { messages } from "../helpers/message";


import { UseUser } from "../context/context";

import Spinner from "./Spinner";




const Login = () => {
  
  const { actions,loading,setLoading } = UseUser();
  const [dataUser, setDataUser] = useState({ email: '', password: '' });
  const [watchPassword, setWatchPassword] = useState(false);
  //const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value })
  }

  const onLogin =  (e) => {
    try {
       e.preventDefault();
    if (!dataUser.email || !dataUser.password) {
      return messages("error", "All the fields are required", false, 1500);
    }
    setLoading(true);
    actions(dataUser);
    setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error from onLogin: ',error);
    }
   
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="container text-center mt-3">
              <FaUserTie style={{ "fontSize": "3em" }} />
            </div>
            <div className="card-header text-center mt-3">
              <h4>Inicio de sesión de jefes</h4>
            </div>
          </div>

          <div className="card-body">

            <form onSubmit={(e) => onLogin(e)} >


              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" autoFocus
                  onChange={(e) => handleOnChange(e)} />
              </div>

              <div className="mb-3">
                <div style={{ "justifyContent": "center", "justifyItems": "center", "cursor": "pointer" }} onClick={() => setWatchPassword(!watchPassword)}>
                  <label className="form-label mx-2">password</label>
                  {!watchPassword ? <FaRegEye /> : <FaEyeSlash />}
                </div>

                <input type={!watchPassword ? "password" : "text"} name="password" className="form-control"
                  onChange={(e) => handleOnChange(e)} />
              </div>
              {loading ? (
              <Spinner />
             
              ) : <button type="submit" className="form-control btn btn-primary ">Login</button>}

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;