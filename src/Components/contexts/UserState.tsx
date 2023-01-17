import { useState } from "react";
import UserContext from "./UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type UserContextProviderProps = {
    children: React.ReactNode
}

export const UserState = ({ children }: UserContextProviderProps) => {

    const [totalUsers, setTotalUsers] = useState(0);
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalcurrentUsers, setTotalCurrentUsers] = useState<any[]>([]);
    const [sort, setSort] = useState({ sortBy: "", order: "" });
    const perPage = 10;

    const getUsers = async () => {
        const res = await fetch("https://63c518bee1292e5bea1aa850.mockapi.io/api/v1/users?sortBy=name&order=asc");
        const data = await res.json();

        setTotalUsers(data.length);
        setAllUsers(data);
        setTotalCurrentUsers(data.slice(0, 10));
        setTotalPages(data.length % perPage === 0 ? Math.floor(data.length / perPage) : Math.floor(data.length / perPage) + 1);
    }

    const updateUser = async (id: any, name: any, role: any) => {
        
        await fetch(`https://63c518bee1292e5bea1aa850.mockapi.io/api/v1/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, role })
        });

        let newUsers = JSON.parse(JSON.stringify(totalcurrentUsers));
        let newUsers1 = JSON.parse(JSON.stringify(allUsers));
        for (let i = 0; i < newUsers.length; i++) {
            if (newUsers[i].id === id) {
                newUsers[i].name = name;
                newUsers[i].role = role;
                break;
            }
        }
        for (let i = 0; i < newUsers1.length; i++) {
            if (newUsers1[i].id === id) {
                newUsers1[i].name = name;
                newUsers1[i].role = role;
                break;
            }
        }
        setAllUsers(newUsers1)
        setTotalCurrentUsers(newUsers);
        toast.success('User Updated Successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }

    const addUser = async (name: any, role: any, email: any) => {
        const res = await fetch(`https://63c518bee1292e5bea1aa850.mockapi.io/api/v1/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, role, email })
        });
        const user = await res.json();
        setAllUsers(allUsers.concat(user));
        setTotalCurrentUsers(totalcurrentUsers.concat(user));
        setTotalUsers(totalUsers + 1);
        setTotalPages((totalUsers + 1) % perPage === 0 ? Math.floor((totalUsers + 1) / perPage) : Math.floor((totalUsers + 1) / perPage) + 1);
        toast.success('User Added Successfully', {
            position: "top-right",
            theme:"colored",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    const deleteUser = async (id: any) => {
        await fetch(`https://63c518bee1292e5bea1aa850.mockapi.io/api/v1/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let newUsers = totalcurrentUsers.filter((user) => { return user.id !== id })
        setTotalCurrentUsers(newUsers);
        newUsers = allUsers.filter((user) => { return user.id !== id });
        setAllUsers(newUsers);
        setTotalUsers(totalUsers - 1);
        setTotalPages((totalUsers - 1) % perPage === 0 ? Math.floor((totalUsers - 1) / perPage) : Math.floor((totalUsers - 1) / perPage) + 1);
        setCurrentPage((totalUsers - 1) % perPage === 0 ? currentPage - 1 : currentPage);
        toast.success('User Deleted Successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }


    const previousPage = async () => {
        const res = await fetch(`https://63c518bee1292e5bea1aa850.mockapi.io/api/v1/users?sortBy=${sort.sortBy}&order=${sort.order}&page=${currentPage - 1}&limit=${perPage}`);
        const data = await res.json();
        setTotalCurrentUsers(data);
        setCurrentPage(currentPage - 1);
    }

    const nextPage = async () => {
        const res = await fetch(`https://63c518bee1292e5bea1aa850.mockapi.io/api/v1/users?sortBy=${sort.sortBy}&order=${sort.order}&page=${currentPage + 1}&limit=${perPage}`);
        const data = await res.json();
        setTotalCurrentUsers(data);
        setCurrentPage(currentPage + 1);
    }


    const handleSort = (e: any) =>{
        
        const event = e.target as HTMLElement;
        const sortby = event.innerText.toLowerCase();
        let sorting = "";
        const id = e.target.lastChild.id;
        if(e.target.lastChild.className.toString().includes("uil-arrow-down")){
            sorting = "desc";
            document.getElementById(id)?.classList.remove("uil-arrow-down");
            document.getElementById(id)?.classList.add("uil-arrow-up");
        }
        else{
            sorting = "asc";
           
            document.getElementById(id)?.classList.remove("uil-arrow-up");
            document.getElementById(id)?.classList.add("uil-arrow-down");
        }
        
       
        const getUsers = async () => {
            const res = await fetch(`https://63c518bee1292e5bea1aa850.mockapi.io/api/v1/users?sortBy=${sortby}&order=${sorting}&page=${currentPage}&limit=${perPage}`);
            const data = await res.json();
            setTotalCurrentUsers(data);
        }
        setSort({sortBy:sortby, order: "desc"});
        getUsers();
    }


    return (
        <UserContext.Provider value={{allUsers, currentPage, totalcurrentUsers, totalPages, totalUsers, updateUser, getUsers, addUser, deleteUser, previousPage, nextPage, handleSort }}>
            {children}
        </UserContext.Provider>
    )
}