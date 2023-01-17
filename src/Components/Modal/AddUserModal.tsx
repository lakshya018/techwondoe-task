import React, { useContext , useState } from 'react'
import UserContext from '../contexts/UserContext';
import "./modal.css";

type Props = {
  show: any;
  onClose: any;
}

const AddUserModal: React.FC<Props> = ({ show, onClose }: Props) => {
  const context = useContext(UserContext);
  const [newUser, setNewUser] = useState({newUserName: "", newUserRole: "", newUserEmail:""});
  
  if(!show){
    return null;
  }

  
  const { addUser } = context;
 
  const handleOnChange = (e:any) =>{
    setNewUser({...newUser, [e.target.name]: e.target.value}); 
  }

  return (
    <div className="wrapper">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-xl font-bold" id="exampleModalLabel">Add User</h1>
            
            <button type="button" className="border rounded px-2 py-1" onClick={onClose}><i className="uil uil-times text-xl"></i></button>

          </div>
          <hr className='my-3'/>
          <div className="modal-body">

            <div className='my-3'>
              <label className='text-left block justify-start' htmlFor='newUserName'>Name: </label>
              <input type="text" name="newUserName" className='form-control' id='newUserName' onChange={handleOnChange} />
            </div>
            <div className='my-3'>
              <label className='text-left block justify-start' htmlFor='newUserRole'>Role: </label>
              <input type="text" className='form-control' name="newUserRole" id="newUserRole" onChange={handleOnChange} />
            </div>
            <div className='my-3'>
              <label className='text-left block justify-start' htmlFor='newUserEmail'>Email: </label>
              <input type="email" className='form-control' name="newUserEmail" id="newUserEmail" onChange={handleOnChange} />
            </div>

          </div>

          <hr className='my-3'/>
          <div className="modal-footer">
            <button type="button" className="px-3 mx-2 py-2 border rounded " onClick={onClose}>Close</button>
            <button type="button" className="px-3 mx-2 py-2 bg-blue-500 text-white rounded" onClick={
              () => {addUser(newUser.newUserName, newUser.newUserRole, newUser.newUserEmail);
                onClose();
              }
            }>Save changes</button>
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default AddUserModal;