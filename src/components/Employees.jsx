import { FaUserPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";


import { useState, useEffect, useCallback } from "react";
import { UseUser } from "../context/context";
import { messages } from "../helpers/message";
import axios from "axios";
import Swal from "sweetalert2";


const Employees = () => {
  const {user} = UseUser();
  const [employees, setEmployees] = useState([]);

 

  const getEmployees = useCallback(async() =>{
    try {
      const {data} = await axios.get("http://localhost:4000/employees/boss",{
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      })
      setEmployees(data.data);
    } catch (error) {
      if (!error.response.data.ok) {
        return messages("error", error.response.data.message, false, 1500);
      }
      console.log("error function login: ", error.message)
    }
  },[user.token]);

  useEffect(() => {
    getEmployees();
  }, [getEmployees])

  const deleteEmployees = async (id) =>{
    Swal.fire({
      title:"A U sure?",
      text:"This action can not be undone",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:"#3085d6",
      cancelButtonColor:"#d33",
      confirmButtonText:"I now what I´m doing"
    }).then(async(result) =>{
      if(result.isConfirmed){
        axios.delete(`http://localhost:4000/employees/delete/${id}`,{
          headers:{
            Authorization: `Bearer ${user.token}`
          }
        });
        
       
        messages("success","the employee has been removed",false,1500);
         getEmployees();
      }
    })
  }
  
  return (
    <div>
      <nav className="navbar py-4">
        <div className="container">
          <div className="col-md-3">
            <button className="btn btn-primary"><FaUserPlus/> Add employee</button>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <input className="form-control" type="search" placeholder="Search..." aria-label="Search" required/>
            </div>
          </div>
        </div>
      </nav>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Empleados de {user.name}</h4>
                </div>
                <table className="table-responsive-lg">
                  <div className="table table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>firstName</th>
                        <th>middleName</th>
                        <th>lastName</th>
                        <th>motherLastName</th>
                        <th>contractType</th>
                        <th>identification</th>
                        <th>options</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                    {employees.map((item,i)=>(
                      <tr key={item._id}>
                         <td>{i +1}</td>
                         <td>{item.firstName}</td>
                         <td>{item.middleName}</td>
                         <td>{item.lastName}</td>
                         <td>{item.motherLastName}</td>
                         <td>{item.contractType}</td>
                         <td>{item.id}</td>
                         <td>
                          <button className="btn btn-danger me-2" onClick={() => deleteEmployees(item._id)}><FaRegTrashAlt/></button>
                          <button className="btn btn-warning"><FaPencilAlt/></button>
                         </td>
                      </tr>
                    ))}
                  </tbody>
                  </div>
                 
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Employees;