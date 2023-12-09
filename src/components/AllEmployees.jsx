import axios from "axios";

import { useState, useEffect, useCallback } from "react";
import { messages } from "../helpers/message";
import Loading from "./Loading";
import { UseUser } from "../context/context";
import { capitalizeFirstLetter } from "../helpers/capitalize";

const AllEmployees = () => {
  const {user} = UseUser();
    const [allEmployees, setAllEmployees] = useState([]);
    const [tableEmployees, setTableEmployees] = useState([]);
    const [searchedTerm, setSearchedTerm] = useState("");

    const [loading, setLoading] = useState(false);

    const getAllEmployees = useCallback(async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("/employees");
          setAllEmployees(data.data);
          setTableEmployees(data.data);
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

      const handleOnChange = (e) =>{
        setSearchedTerm(e.target.value)
        search(e.target.value)
      }

      const search = (term)=>{
        var searchedTerm = tableEmployees.filter((element)=>{
         if(element.firstName.toString().toLowerCase().includes(term.toLowerCase()) ||
         element.lastName.toString().toLowerCase().includes(term.toLowerCase())||
         element.middleName.toString().toLowerCase().includes(term.toLowerCase())||
         element.motherLastName.toString().toLowerCase().includes(term.toLowerCase())){
             return element;
         }
        });
        setAllEmployees(searchedTerm);
     }
      

  return (
    <div>
      <nav className="navbar py-4">
        <div className="container">
          
          <div className="col-md-6">
            <div className="input-group">
              <input 
              className="form-control" 
              type="search" 
              placeholder="Search..." 
              aria-label="Search"
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
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Bienvenido {user.name} a la lista de todos los empleados</h4>
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

                        {allEmployees && allEmployees.map((item, i) => (
                          <tr key={item._id}>
                            <td>{i + 1}</td>
                            <td>{capitalizeFirstLetter(item.firstName)}</td>
                            <td>{capitalizeFirstLetter(item.middleName)}</td>
                            <td>{capitalizeFirstLetter(item.lastName)}</td>
                            <td>{capitalizeFirstLetter(item.motherLastName)}</td>
                            <td>{capitalizeFirstLetter(item.contractType)}</td>
                            <td>{item.id}</td>
                            <td>{capitalizeFirstLetter(item.user.name)}</td>
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