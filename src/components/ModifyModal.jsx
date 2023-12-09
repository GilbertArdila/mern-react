import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';

import { messages } from '../helpers/message';
import Spinner from './Spinner';

// eslint-disable-next-line react/prop-types
const ModifyModal = ({ onCloseModal, open, getEmployees, isEdit, employee }) => {

  const [loading, setLoading] = useState(false);
  
  const initialState = {
    firstName: "",
    middleName: "",
    lastName: "",
    motherLastName: "",
    id: "",
    contractType: "Fijo"

  }
  const contractTypes = [
    "Fijo","Temporal", "Practicante", "Pasantias"]

  const [dataEmployee, setDataEmployee] = useState(initialState);

  useEffect(() => {
  isEdit ? setDataEmployee(employee) : setDataEmployee(initialState);  
  // eslint-disable-next-line 
  }, [isEdit,employee])
  

  const handleChange=(e)=>{
    let data = e.target.value;
    /**assuring send only lowercase to DB */
    if (typeof data === "object") {
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          data[key] = data[key].toLowerCase();
        }
      }
    } else if (typeof data === "string") {
      data = data.toLowerCase();
    }
     setDataEmployee({...dataEmployee,[e.target.name]:data});
  }
  

  const formAction = async (e)=>{
    try {
      e.preventDefault();
      let data = {};
      setLoading(true);// eslint-disable-next-line react/prop-types
       isEdit ? data = await axios.patch(`/employees/update/${employee._id}`,dataEmployee) : 
        data = await axios.post("/employees",dataEmployee);
       setLoading(false);
      
      messages("success",data.data.message,false,1500);
      onCloseModal();
      getEmployees();
    } catch (error) {
      if(!error.response.data.ok){
        messages("error",error.response.data.message,false,1500);
      }
      console.log("Error en la acción del formulario "+error.message);
      
    }
    
  }
  
  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="card">
          <div className="card-header">
            <h5>{isEdit ? "Edit employee": "Add Employee"}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={(e)=>formAction(e)}>
              <div className="mb-3">
                <label className="form-label">firstName</label>
                <input 
                type="text" 
                name="firstName"
                className="form-control" 
                autoFocus 
                required 
                autoCapitalize="words"
                onChange={(e)=>handleChange(e)}
                value={dataEmployee.firstName} />
              </div>
              <div className="mb-3">
                <label className="form-label">middleName</label>
                <input 
                type="text" 
                name="middleName"
                className="form-control" 
                required 
                autoCapitalize="words"
                onChange={(e)=>handleChange(e)} 
                value={dataEmployee.middleName}/>
              </div>
              <div className="mb-3">
                <label className="form-label">lastName</label>
                <input 
                type="text" 
                name="lastName"
                className="form-control" 
                required 
                autoCapitalize="words"
                onChange={(e)=>handleChange(e)}
                value={dataEmployee.lastName} />
              </div>
              <div className="mb-3">
                <label className="form-label">motherLastName</label>
                <input 
                type="text" 
                name="motherLastName"
                className="form-control" 
                required 
                autoCapitalize="words"
                onChange={(e)=>handleChange(e)}
                value={dataEmployee.motherLastName} />
              </div>
              <div className="mb-3">
                <label className="form-label">identification</label>
                <input 
                type="text" 
                name="id"
                className="form-control" 
                required 
                autoCapitalize="words"
                onChange={(e)=>handleChange(e)}
                value={dataEmployee.id} />
              </div>
              <div className="mb-3">
                <label className="form-label" >contractType</label>
                
                <select 
                name="contractType" 
                className="form-select"
                onChange={(e)=>handleChange(e)}
                value={dataEmployee.contractType}>
                  {contractTypes.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                {loading ? (<Spinner/>):
                <button type="submit" className="btn btn-primary form-control">{isEdit ? "Update" : "Save"}</button>}
              </div>
              
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ModifyModal;