import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {Link} from 'react-router-dom';

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const {authorizationToken} = useAuth();
    const getAllUsersData = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/users", {
                method: "GET",
                headers:{
                    Authorization:authorizationToken, // Yahapar mereko current logged in user ka token chahiye.
                },
            });
            const data = await response.json();
            console.log(`users ${data}`);
            setUsers(data);
            
        } catch (error) {
            console.log(error);
        }
    }

    //Deleting the user
    const deleteUser =  async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers:{
                    Authorization:authorizationToken, // Yahapar mereko current logged in user ka token chahiye so that the authMiddleware can authorize it whether it is a user or not.
                },
            });
            const data = await response.json();
            console.log(`users AFTER DELETE ${data}`);

            if(response.ok)
            {
                getAllUsersData(); //If mera response succesfully mil jaata hai i.e. user successfully delete hojata hai toh in that case main chahta hu ki user ka updated list mile jisme aur mereko refresh na karna pade.
            }
            
        } catch (error) {
            console.log(error);
        }
    }
 
    useEffect(() => {
        getAllUsersData();
    }, []); //Empty array is for ki jab hum page ko pheli baar load kare tabhi yeh function call ho aur tabhi hume saara user ka data dikhe.

    return (
        <>
            <section className="admin-users-section">
                <div className="container">
                    <h1>Admin Users Data</h1>
                </div>

                <div className="container admin-users">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((curUser, index) => {
                            return <tr key={index}>
                                <td>{curUser.username}</td>
                                <td>{curUser.email}</td>
                                <td>{curUser.phone}</td>
                                <td><Link to= {`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
                                <td><button onClick={() => deleteUser(curUser._id)}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                    {/* {users.map((curUser,index) => {
                        return;
                    })} */}
                </div>
            </section>
        </>
    )
};