import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


export const AdminContacts = () => {
    const [contactData, setContactData]= useState([]);
    const {authorizationToken} = useAuth();

    const getContactsData = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method:"GET",
                headers:{
                    Authorization: authorizationToken,
                }
            });

            const data = await response.json();
            if(response.ok)
            {
                setContactData(data);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const deleteContactById =  async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers:{
                    Authorization:authorizationToken, // Yahapar mereko current logged in user ka token chahiye so that the authMiddleware can authorize it whether it is a user or not.
                },
            });
            const data = await response.json();
            console.log(`users AFTER DELETE ${data}`);

            if(response.ok)
            {
                getContactsData(); //If mera response succesfully mil jaata hai i.e. user successfully delete hojata hai toh in that case main chahta hu ki user ka updated list mile jisme aur mereko refresh na karna pade.
                toast.success("Contact Deleted Successfully")
            }else {
                toast.error("Contact Not Deleted")
            }
            
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        getContactsData();
    },[]);


    return (
        <>
            <section className="admin-users-section">
                <div className="container">
                    <h1>Admin Contacts Data</h1>
                </div>

                <div className="container admin-users">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Message</th>
                            {/* <th>Update</th> */}
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {contactData.map((curContactData, index) => {
                            return <tr key={index}>
                                <td>{curContactData.username}</td>
                                <td>{curContactData.email}</td>
                                <td>{curContactData.message}</td>
                                {/* <td><Link to= {`/admin/users/${curUser._id}/edit`}>Edit</Link></td> */}
                                <td><button onClick={() => deleteContactById(curContactData._id)}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                    {/* {contactData.map((curContactData,index) => {
                        return;
                    })} */}
                </div>
            </section>
        </>
    )
};