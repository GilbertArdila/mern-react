import axios from "axios";

import { useState, useEffect, useCallback } from "react";
import { messages } from "../helpers/message";
import Loading from "./Loading";
import { UseUser } from "../context/context";

const AllEmployees = () => {
  const {user} = UseUser();
    const [allEmployees, setAllEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllEmployees = useCallback(async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("/employees");
          setAllEmployees(data.data);
          setLoading(false);
          
        } catch (error) {
          setLoading(false);
          if (!error.response.data.ok) {
            return messages("error", error.response.data.message, false, 1500);
          }
          console.log("error on getAllEmployees: ", error.message)
        }
      }, []);

      useEffect(() => {
        
      getAllEmployees();
      
      }, [getAllEmployees])
      

  return (
    <div>
      <nav className="navbar py-4">
        <div className="container">
          
          <div className="col-md-6">
            <div className="input-group">
              <input className="form-control" type="search" placeholder="Search..." aria-label="Search"
                required
                 />
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
                  <h4>Bienvenido {user.name}</h4>
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
                        <th>user associated</th>

                      </tr>
                    </thead>
                    {loading ? (<Loading />) :

                      <tbody>

                        {allEmployees.map((item, i) => (
                          <tr key={item._id}>
                            <td>{i + 1}</td>
                            <td>{item.firstName.charAt(0).toUpperCase() + item.firstName.slice(1)}</td>
                            <td>{item.middleName.charAt(0).toUpperCase() + item.middleName.slice(1)}</td>
                            <td>{item.lastName.charAt(0).toUpperCase() + item.lastName.slice(1)}</td>
                            <td>{item.motherLastName.charAt(0).toUpperCase() + item.motherLastName.slice(1)}</td>
                            <td>{item.contractType.charAt(0).toUpperCase() + item.contractType.slice(1)}</td>
                            <td>{item.id}</td>
                            <td>{item.user.name.charAt(0).toUpperCase() + item.user.name.slice(1)}</td>
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
    </div>
  )
}

export default AllEmployees;