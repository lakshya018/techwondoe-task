import React, { useState, useEffect, useContext } from 'react';
import "./Home.css";
import { exportTableToCSV } from '../DownloadCSVFile';
import UserContext from '../contexts/UserContext';
import AddUserModal from '../Modal/AddUserModal';
import UpdateUserModel from '../Modal/UpdateUserModel';
import { PulseLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const override = {
    display: "block",
    marginTop: "250px"
};

const Home: React.FC = () => {


    const context = useContext(UserContext);
    const { getUsers, deleteUser, totalPages, totalUsers, totalcurrentUsers, currentPage, previousPage, nextPage, handleSort, allUsers } = context;

    const [currentUser, setCurrentUser] = useState({ id: "", role: "", name: "" });

    const [addUserModalshow, setAddUserModalShow] = useState(false);
    const [updateUserModalShow, setUpdateUserModalShow] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        getUsers();
        // eslint-disable-next-line
    }, [])

    const deleteCurrentUser = (id: any) => {
        deleteUser(id);
    }
    return (
        <>
            <div className='home'>


                {
                    totalcurrentUsers.length > 0 ?
                        (
                            <div>
                                <UpdateUserModel show={updateUserModalShow} userName={currentUser.name} id={currentUser.id} role={currentUser.role} onClose={() => setUpdateUserModalShow(false)} />

                                <AddUserModal show={addUserModalshow} onClose={() => setAddUserModalShow(false)} />

                                <h1 className='text-2xl heading font-bold text-left'>Company Settings</h1>
                                <div className='flex text-xs justify-left menu-box'>
                                    
                                        <div className=" btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-outline-secondary border">General</button>
                                            <button type="button" className="btn btn-outline-secondary border text-white bg-gray-500">Users</button>
                                            <button type="button" className="btn btn-outline-secondary border">Plan</button>
                                            <button type="button" className="btn btn-outline-secondary border">Billing</button>
                                            <button type="button" className="btn btn-outline-secondary border">Integration</button>
                                        </div>
                                    
                                </div>

                                <div className="table-container">
                                    <div className="container-header">
                                        <div className="header-title text-left">
                                            <h1 className="header-name text-2xl font-bold align-middle">Users <span className='header-subtitle text-sm font-bold ml-2'>{totalUsers} Users</span></h1>
                                            <p className='header-description'>Manage your team members and their account permissions here.</p>
                                        </div>

                                        <div className="header-buttons">
                                            <button className='csv-btn text-xs md:text-xl py-2 px-4 my-1' onClick={() => exportTableToCSV(allUsers)}><i className="uil uil-cloud-download"></i> Download CSV</button>
                                            <button className='text-white text-xs md:text-xl my-1 bg-blue-500' onClick={() => setAddUserModalShow(true)}> <i className="uil uil-plus"></i> Add User</button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='myTable mt-2'>
                                        <table className='w-full text-sm text-left'>
                                            <thead className='text-l text-gray-500'>
                                                <tr>
                                                    <th scope="col" className="px-2 py-2 md:px-4" onClick={handleSort}>
                                                       <div className='flex items-center'>Name<i className="uil uil-arrow-down ml-2 text-2xl" id='name-arrow'></i></div> 
                                                    </th>
                                                    <th scope="col" className="px-2 py-2 md:px-4" onClick={handleSort}>
                                                        <div className='flex items-center'>Status<i className="uil uil-arrow-down ml-2 text-2xl" id='status-arrow'></i></div>
                                                    </th>
                                                    <th scope="col" className="px-2 py-2 md:px-4" onClick={handleSort}>
                                                        <div className="flex items-center">Role<i className="uil uil-arrow-down ml-2 text-2xl" id='role-arrow'></i></div>
                                                    </th>
                                                    <th scope="col" className="px-2 py-2 md:px-4" onClick={handleSort}>
                                                        <div className="flex items-center">Last Login<i className="uil uil-arrow-down ml-2 text-2xl" id='login-arrow'></i></div>
                                                    </th>
                                                    <th scope="col" className="px-2 py-2 md:px-4"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {totalcurrentUsers.length > 0 ?
                                                    totalcurrentUsers.map((user: any, index: any) => {
                                                        const date = new Date(user.createdAt);
                                                        const newDate = date.toString();
                                                        const time = date.toLocaleTimeString();

                                                        return (
                                                            <tr className='border-b items-center'>
                                                                <td className="px-2 py-2 md:px-4">
                                                                    <div className="name-column">
                                                                        <img className="user-img" src={user.avatar} alt="" />
                                                                        <div className='name-title ml-3'>
                                                                            <h3 className='font-bold'>{user.name}</h3>
                                                                            <span className='text-gray-500'>{user.email}</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-3 py-2 md:px-4">
                                                                    {user.status === false ?
                                                                        <span className='inactive-user inline-block justify-center text-xs text-gray-500 font-bold'>
                                                                            <div className="flex items-center"><span className='rounder-dot bg-gray-500'></span>
                                                                            Inactive</div>
                                                                        </span>
                                                                        :
                                                                        <span className='active-user inline-block justify-center  text-xs font-bold'>
                                                                            <div className="flex items-center"><span className='rounder-dot'></span>
                                                                            Active</div>
                                                                        </span>
                                                                    }
                                                                </td>
                                                                <td className="px-2 py-2 md:px-4  text-gray-500"> <span>{user.role}</span> </td>
                                                                <td className="px-2 py-2 md:px-4">
                                                                    <h3 className='font-bold'>{newDate.substr(4, 11)}</h3>
                                                                    <p>{time}</p>
                                                                </td>
                                                                <td className=''>
                                                                    <div className='action-btn flex items-center justify-center'>
                                                                        <button data-bs-toggle="modal" data-bs-target="#updateUserModal" type="button" onClick={() => {
                                                                            setCurrentUser({ id: user.id, role: user.role, name: user.name });
                                                                            setUpdateUserModalShow(true);
                                                                        }}><i className="uil uil-edit table-icon text-gray-500 text-xl mx-2"></i></button>
                                                                        <button onClick={() => deleteCurrentUser(user.id)}><i className="uil uil-trash-alt table-icon text-gray-500 text-xl mx-2"></i></button>
                                                                    </div>
                                                                    
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) :
                                                    <PulseLoader cssOverride={override} color="#36d7b7" />
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="pagination">
                                        <button className='disabledBtn text-xs md:text-xl px-4 py-2 mx-2 md:mx-5 border rounded text-white bg-blue-500' disabled={currentPage === 1} onClick={previousPage}>
                                            <div className="flex items-center"><i className="uil uil-arrow-left"></i> Previous</div>
                                        </button>
                                        <p className='font-bold'>{currentPage}  of {totalPages}</p>
                                        <button className='disabledBtn text-xs md:text-xl px-4 py-2 mx-2 md:mx-5 border rounded text-white bg-blue-500' disabled={currentPage === totalPages} onClick={nextPage} >
                                            <div className="flex items-center">Next <i className="uil uil-arrow-right"></i></div></button>
                                    </div>
                                </div>
                            </div>

                        ) :
                        <PulseLoader cssOverride={override} color="#36d7b7" />
                }

            </div>
            <ToastContainer />
        </>
    )
}

export default Home;