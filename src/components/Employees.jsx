import { FaUserPlus } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

import { useState, useEffect, useCallback } from "react";
import { UseUser } from "../context/context";
import { messages } from "../helpers/message";
import ModifyModal from "./ModifyModal";
import Loading from "./Loading";


const Employees = () => {
  const { user } = UseUser();
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState();
  const [loading, setLoading] = useState(false);

  /**to use the modal */
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpenModal = (isEdit, employee) => {
    setOpen(true);
    setIsEdit(isEdit);
    setEmployee(employee);
  };

  const onCloseModal = () => setOpen(false);



  const getEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/employees/boss");
      setEmployees(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (!error.response.data.ok) {
        return messages("error", error.response.data.message, false, 1500);
      }
      console.log("error function login: ", error.message)
    }
  }, []);

  useEffect(() => {
    getEmployees();
  }, [getEmployees])

  const deleteEmployees = async (id) => {
    Swal.fire({
      title: "hey man, are you sure?",
      text: "This action can not be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yeah, do it"
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios.delete(`/employees/delete/${id}`);


        messages("success", "the employee has been removed", false, 1500);
        getEmployees();
      }
    })
  }

  /**to search input */
  const search = async (value) => {
    const lowercase = value.toLowerCase();
    try {
      if (value === "") {
        return getEmployees();
      }
      const { data } = await axios.get(`/employees/search/${lowercase}`)
      setEmployees(data.data);
    } catch (error) {
      if (error.response.status === 404) {
        messages("error", "No coincidences found", false, 1500);

        return getEmployees();
      }
      console.log("search:" + error)
    }

  }

  return (
    <div>
      <nav className="navbar py-4">
        <div className="container">
          <div className="col-md-3">
            <button className="btn btn-primary" onClick={() => onOpenModal(false, {})}><FaUserPlus /> Add employee</button>
          </div>
          <div className="col-md-6">
            <div className="input-group">
              <input className="form-control" type="search" placeholder="Search..." aria-label="Search"
                required
                onChange={(e) => search(e.target.value)} />
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
                        <th>contract-Type</th>
                        <th>identification</th>
                        <th>options</th>

                      </tr>
                    </thead>
                    {loading ? (<Loading />) :

                      <tbody>

                        {employees.map((item, i) => (
                          <tr key={item._id}>
                            <td>{i + 1}</td>
                            <td>{item.firstName.charAt(0).toUpperCase() + item.firstName.slice(1)}</td>
                            <td>{item.middleName.charAt(0).toUpperCase() + item.middleName.slice(1)}</td>
                            <td>{item.lastName.charAt(0).toUpperCase() + item.lastName.slice(1)}</td>
                            <td>{item.motherLastName.charAt(0).toUpperCase() + item.motherLastName.slice(1)}</td>
                            <td>{item.contractType.charAt(0).toUpperCase() + item.contractType.slice(1)}</td>
                            <td>{item.id}</td>
                            <td>
                              <button className="btn btn-danger me-2" onClick={() => deleteEmployees(item._id)}><FaRegTrashAlt /></button>
                              <button className="btn btn-warning" onClick={() => onOpenModal(true, item)}><FaPencilAlt /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>}
                  </div>

                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModifyModal onCloseModal={onCloseModal} open={open} getEmployees={getEmployees} isEdit={isEdit} employee={employee} />
    </div>
  )
}

export default Employees;