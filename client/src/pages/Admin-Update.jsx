import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../store/auth"
import {toast} from "react-toastify";

export const AdminUpdate = () => {
    const[data, setData] = useState({
        username:"",
        email:"",
        phone:""
    })

    const params = useParams();
    const {authorizationToken} = useAuth();

    //Get single User data.
    const getSingleUserData =  async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`, {
                method: "GET",
                headers:{
                    Authorization:authorizationToken, // Yahapar mereko current logged in user ka token chahiye so that the authMiddleware can authorize it whether it is a user or not.
                },
            });
            const data = await response.json();
            console.log(`single user data ${data}`);
            setData(data);

            // if(response.ok)
            // {
            //     getAllUsersData(); //If mera response succesfully mil jaata hai i.e. user successfully delete hojata hai toh in that case main chahta hu ki user ka updated list mile jisme aur mereko refresh na karna pade.
            // }
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleUserData();
    },[]);

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]:value,
        });
    };

    //To update the data dynamically
    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json",
                    Authorization:authorizationToken,
                },
                body:JSON.stringify(data),
            },
            );

            if(response.ok)
            {
                toast.success("Update successful")
            }else{
                toast.error("Not updated");
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Update User Data</h1>
            </div>

            {/* Contact Main Page */}
            <div className="container grid grid-two-cols">

                {/* Contact form content */}
                <section className="section-form">
                    <form onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="username">Username</label>
                            <input 
                            type="text" 
                            name="username"
                            id="username"
                            autoComplete="off"
                            required
                            value={data.username}
                            onChange={handleInput}
                             />
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <input 
                            type="email" 
                            name="email"
                            id="email"
                            autoComplete="off"
                            required
                            value = {data.email}
                            onChange={handleInput}
                             />
                        </div>

                        <div>
                            <label htmlFor="phone">Phone</label> 
                            <input 
                            type="phone" 
                            name="phone"
                            id="phone"
                            autoComplete="off"
                            required
                            value = {data.phone}
                            onChange={handleInput}
                             />   
                        </div>

                        <div>
                            <button type="submit">Update</button>
                        </div>
                        
                    </form>

                </section>
            </div>
        </section>
        </>
    )

}