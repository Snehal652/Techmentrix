import { useState } from "react";
import { useNavigate } from "react-router-dom"; ///This is used after naivgating to Home page after successful registration
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Login = () => {

    const navigate = useNavigate();
    const {storeTokenInLS} = useAuth();
    
    const URL = "http://localhost:5000/api/auth/login";

    const [user, setUser] = useState({ //Rather than creating state variable separately for username,email,phone etc. We are creating an object and decalring it as a state variable "user". And we will access each field by using dot operator like user.username, user.email etc. 
        email:"",
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
        console.log(user)
        e.preventDefault()  //This is used tp prevent the page from refreshing itself after submission.
        // alert(user) //user is our state variable. Humne abhi "user" ko apne state mein save kara liya ab bas hume isse backend mein bhejna hai

        try {
            const response = await fetch(URL, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(user)
            });

            console.log("login form", response);
            const res_data = await response.json();

            if(response.ok) {
                toast.success("Login Successful");
                storeTokenInLS(res_data.token);


                setUser({ email:"", password:""});
                navigate("/");  //This is used after naivgating to Home page after successful registration
            } else {
                // alert(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                console.log("invalid credentials");
            }
            
        } catch (error) {
            console.log(error);
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
                                src ="/images/login.png" 
                                alt="Lets do Login"
                                width= "500"
                                height="500"
                                 />
                            </div>

                            {/* Lets do Login form */}
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Login Form</h1>
                                <br/>

                                <form onSubmit ={handleSubmit}>
                        
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
                                        LOGIN 
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