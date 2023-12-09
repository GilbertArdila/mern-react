import axios from "axios";

import { useState, useEffect, useCallback } from "react";
import { messages } from "../helpers/message";
import Loading from "./Loading";
import { UseUser } from "../context/context";
import { capitalizeFirstLetter } from "../helpers/capitalize";

const AllUsers = () => {
    const {user} = UseUser();
    const [allUsers, setAllUsers] = useState([]);
    const [tableUsers, setTableUsers] = useState([]);
    const [searchedTerm, setSearchedTerm] = useState("");

    const [loading, setLoading] = useState(false);

    const getAllUsers = useCallback(async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("/users/list");
          setAllUsers(data.data);
          setTableUsers(data.data);
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

      const handleOnChange = (e) =>{
        setSearchedTerm(e.target.value)
        search(e.target.value)
      }

      const search = (term)=>{
        var searchedTerm = tableUsers.filter((element)=>{
         if(element.role.toString().toLowerCase().includes(term.toLowerCase()) ||
         element.name.toString().toLowerCase().includes(term.toLowerCase())||
         element.email.toString().toLowerCase().includes(term.toLowerCase())){
             return element;
         }
        });
        setAllUsers(searchedTerm);
     }
      

  return (
    <div>
      <nav className="navbar py-4">
        <div className="container">
          
          <div className="col-md-6">
            <div className="input-group">
              <input 
              className="form-control" type="search" placeholder="Search..." aria-label="Search"
              value={searchedTerm}
              onChange={handleOnChange}
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
                  <h4>Bienvenido {user.name} a lista de todos los usuarios</h4>
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
                            <td>{capitalizeFirstLetter(item.name)}</td>
                            <td>{item.email.toUpperCase()}</td>
                            <td>{capitalizeFirstLetter(item.role)}</td>
                           
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