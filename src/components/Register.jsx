import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { messages } from "../helpers/message";


import { UseUser } from "../context/context";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { actions } = UseUser();
  const [dataUser, setDataUser] = useState({ email: '', password: '',name:'' });
  const [watchPassword, setWatchPassword] = useState(false);

  const handleOnChange = (e) => {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value })
  }

  const onRegister = (e) => {
    e.preventDefault();
    if(!dataUser.email  || !dataUser.password || !dataUser.name ){
    return  messages("error","All the fields are required",false,1500);
       
    }
    actions(dataUser,navigate);
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="container text-center mt-3">
              <FaUserPlus style={{ "fontSize": "3em" }} />
            </div>
            <div className="card-header text-center mt-3">
              <h4>Registro de nuevo jefe</h4>
            </div>
          </div>

          <div className="card-body">
            <form onSubmit={(e) => onRegister(e)} >
             

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="name" name="name" className="form-control" autoFocus
                  onChange={(e) => handleOnChange(e)} />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" 
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

              <button type="submit" className="form-control btn btn-primary ">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;