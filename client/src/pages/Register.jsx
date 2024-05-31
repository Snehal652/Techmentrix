import { useState } from "react";
import { useNavigate } from "react-router-dom"; //This is used after naivgating to login page after successful registration
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {

    const navigate = useNavigate(); //This is used after naivgating to login page after successful registration
    const {storeTokenInLS} = useAuth();

    const [user, setUser] = useState({ //Rather than creating state variable separately for username,email,phone etc. We are creating an object and decalring it as a state variable "user". And we will access each field by using dot operator like user.username, user.email etc. 
        username:"",
        email:"",
        phone:"",
        password:"",
    });

    //Handling the Input values using onChange
    const handleInput = (e) => { //Jab kuch change hota hai toh it returns us an event "e".
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user, //spread operator means ... ki jo values change nhi hui unko as it is rhne do
            [name]: value,
        })
    }

    //Handling thhe Form Submission
    const handleSubmit = async (e) =>{
        e.preventDefault() 
        console.log(user)
         //This is used tp prevent the page from refreshing itself after submission.
        // alert(user) //user is our state variable. Humne abhi "user" ko apne state mein save kara liya ab bas hume isse backend mein bhejna hai

        //Connecting Frontend(ReactJs) with Backend(NodeJs) and Database(MongoDB)
        try {
            const response = await fetch(`http://localhost:5000/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user), //Converting object to JSON kyunki backend ko data json mein chahiye
            });


            const res_data = await response.json();
            console.log("Response from server - where we will get msg, token, userID -", res_data.extraDetails);
            
            if(response.ok) {
                //Now lets store the token data in localhost using CONTEXT API
                storeTokenInLS(res_data.token); //storetokenInLocalStorage
                toast.success("Registration Successful")

                //After successful registration, set the fields empty and navigate to login page
                setUser({username:"", email:"", phone:"", password:""}); //After successfull registration, saari fields ko waapas empty kardo
                navigate("/login");  //This is used after naivgating to login page after successful registration
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
            
            
        } catch (error) {
            console.log("register",error);
        }
    }


    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img 
                                src ="/images/register.png" 
                                alt="Registration Form"
                                width= "500"
                                height="500"
                                 />
                            </div>

                            {/* Lets do registration form */}
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Registration Form</h1>
                                <br/>

                                <form onSubmit ={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="username"
                                            id="username"
                                            required
                                            autoComplete="off" 
                                            //These two below are important:
                                            value ={user.username}   
                                            onChange={handleInput}                            
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="enter your email"
                                            id="email"
                                            required
                                            autoComplete="off" 
                                            value ={user.email}   
                                            onChange={handleInput}                                  
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            placeholder="enter your phone"
                                            id="phone"
                                            required
                                            autoComplete="off"
                                            value ={user.phone}   
                                            onChange={handleInput}                                   
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="enter your password"
                                            id="password"
                                            required
                                            autoComplete="off" 
                                            value ={user.password}   
                                            onChange={handleInput}                                  
                                        />
                                    </div>

                                    <br/>
                                    <button type="submit" className="btn btn-sunmit">
                                        REGISTER NOW
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}