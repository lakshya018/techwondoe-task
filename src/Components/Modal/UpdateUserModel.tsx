import React, { useContext , useEffect, useState } from 'react'
import UserContext from '../contexts/UserContext';
import "./modal.css";

type Props = {
  show: any;
  onClose: any;
  userName: any;
  id: any;
  role: any;
}
const UpdateUserModel:React.FC<Props> = ({show, userName, id, role, onClose}) => {
    const context = useContext(UserContext);
    console.log(userName, id, role)
    const [currentUser, setCurrentUser] = useState({id:id, currentUserName: userName, currentUserRole: role});
    const {updateUser} = context;

    
    useEffect(() => {
      if(id){
        setCurrentUser({id:id, currentUserName: userName, currentUserRole: role});
      }
    }, [id,userName,role])
  

    if(!show){
        return null;
    }

    const handleOnChange = (e: any) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
        console.log(currentUser);
    }
    
  return (
        <div className="wrapper">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-xl font-bold" id="exampleModalLabel">Update the User Details</h1>
                            <button type="button" className="border rounded py-1 px-2" onClick={onClose}><i className="uil uil-times" ></i></button>
                        </div>
                        <hr className='my-3'/>
                        <div className="modal-body">
                            
                            <div className='my-3'>
                            <label className='text-left block justify-start' htmlFor='currentUserName'>Name: </label>
                            <input type="text" name="currentUserName" className='form-control' id='currentUserName'  value={currentUser.currentUserName} onChange={handleOnChange} />
                            </div>
                            <div className='my-3'>
                            <label className='text-left block justify-start' htmlFor='currentUserRole'>Role: </label>
                            <input type="text" className='form-control' name="currentUserRole" id = "currentUserRole" value={currentUser.currentUserRole} onChange={handleOnChange}/>
                            </div>
                            
                        </div>
                        <hr className='my-3'/>

                        <div className="modal-footer">
                            <button type="button" className="px-3 py-2 mx-2 border rounded " onClick={onClose}>Close</button>
                            <button type="button" className="px-3 py-2 mx-2 bg-blue-500 text-white rounded" onClick={
                                ()=> {updateUser(currentUser.id, currentUser.currentUserName, currentUser.currentUserRole);
                                    onClose();
                                }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default UpdateUserModel;