import axios from "axios";

import { useState, useEffect, useCallback } from "react";
import { messages } from "../helpers/message";
import Loading from "./Loading";
import { UseUser } from "../context/context";

const AllUsers = () => {
    const {user} = UseUser();
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllUsers = useCallback(async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("/users/list");
          setAllUsers(data.data);
          setLoading(false);
          
        } catch (error) {
          setLoading(false);
          if (!error.response.data.ok) {
            return messages("error", error.response.data.message, false, 1500);
          }
          console.log("error on getAllUsers: ", error.message)
        }
      }, []);

      useEffect(() => {
        
        getAllUsers();
      
      }, [getAllUsers])
      

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
            <div className="col-md-6 mx-auto">
              <div className="card">
                <div className="card-header ">
                  <h4>Bienvenido {user.name}</h4>
                </div>
                <table className="table-responsive-lg">
                  <div className="table table-striped">
                    <thead className="table-dark table-control">
                      <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>email</th>
                        <th>role</th>

                      </tr>
                    </thead>
                    {loading ? (<Loading />) :

                      <tbody>

                        {allUsers.map((item, i) => (
                          <tr key={item._id}>
                            <td>{i + 1}</td>
                            <td>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
                            <td>{item.email.toUpperCase()}</td>
                            <td>{item.role.charAt(0).toUpperCase() + item.role.slice(1)}</td>
                           
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

export default AllUsers;