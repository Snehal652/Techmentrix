// This context API in React Redux to store token.
// In react, the "context" allows you to share data btween components without 
// explicitly passing the data through each level of the component tree. Its a way to manage 
// global state or share data between components that are not directly connected. 
import { createContext, useContext, useState, useEffect } from "react";

//First lets create a context. It will act as a global store jiske andar hum saara data store karenge.
export const AuthContext = createContext();

//secondly, we have to create a Provider -> It will be a fucntion through which we will pass data to descendants
//THe value prop of the Provider is where you define the data you want to make accessible to components that consume the context.
// We will wrap the App component of main.jsx inside AuthProivder taaki koi bhi app ko kahi se data chahiye ho toh AuthProvider usko woh data provide karwa de

export const  AuthProvider = ({children}) => {
    
    const[token, setToken] = useState(localStorage.getItem("token"));  //We are storing the value of token in our state variable "token" so that isko hum baad mein remove kar sake for logout purpose.
    const[user, setUser] = useState("");
    const[services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  //THis is for telling ki mera page abhi bhi load ho rha hai toh content mat dikhao.
    const authorizationToken = `Bearer ${token}`;
    let isLoggedIn = !!token; //It means isLoggenIn ki value true hogi jab token exist karega else isLoggedIn will be false.

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken); //Jab main login par click karunga, localStorage par token save hone se phele mere "token" waale state variable par save hojayega. So isLoggedIn bhi true hojayega. If this is true then humaare Navbar pe login/register ki jagah Logout dikhayega
        return localStorage.setItem("token", serverToken);
    };

   

    //Tackling the logout functionality.
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token"); 
    }

    //JWT Authentication -> To get the data of currently logged in user.
    const userAuthentication = async() => {
        try {
            setIsLoading(true); //Jab tak load ho rha hai tab tak data mat dikhao. Isse kya hoga ki jab tak hume data nhi mil jaata humaara page load hote rhega aur content show nhi hoga.
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                },
            });

            if(response.ok)
            {
                const data = await response.json();
                console.log('user data', data.userData);
                setUser(data.userData); //Aisa karne se "user" state variable ke paas user ka saara data aajayega and then we will pass "user" state vairable
                setIsLoading(false); //Jaise ji data mil jaaye fir setloading false kardo i.e. loading state false kardo aur loading ko rok do.
            } else
            {
                console.log("Error fetching user data");
                setIsLoading(false);
            }
            
        } catch (error) {
            console.error("Error fetching user data");
        }
    };

    //Logic to fetch the services data from the database and display it on service page frontend. 
    const getServices = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/data/service", {
                method: "GET",
            });

            if(response.ok)
            {
                const data = await response.json();
                console.log(data.msg);
                setServices(data.msg);
            }
            
        } catch (error) {
            console.log(`Services frontend erro ${error}`);
        }
    }

    useEffect(() => {
        getServices();
        userAuthentication();
    },[]);

    return (
    <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser,user, services, authorizationToken, isLoading }}> 
        {children} 
    </AuthContext.Provider>
    );
    //This means that storetokeninLS waala function ab koi bhi page access kar sakta hai.Basically it will act as a resusable function.
};
 

//Third step, is to create a Consumer. Now we want a delivery boy jo humaare iss product ko lekar jo page maang rha hai waha tak phucha de.
// We will create a custom hook so we will start with "use".

export const useAuth = () => {
    // return useContext(AuthContext);
    //useAuth function now contains the value provided by the AuthContext provider higher up in the component tree
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider")
    }
    return authContextValue;
}