import { NavLink } from "react-router-dom"
import "./Navbar.css";
import { useAuth } from "../store/auth";



export const Navbar = () => {
    const {isLoggedIn} = useAuth();

    return ( 
        <>
            <header>  
                <div className="container">
                    <div className="logo-brand">
                        <NavLink to="/">⚓Techmentrix</NavLink>
                    </div>

                    <nav>
                        <ul>
                            <li><NavLink to="/" > Home </NavLink></li>
                            <li><NavLink to="/about" > About </NavLink></li>
                            <li><NavLink to="/service" > Service </NavLink></li>
                            <li><NavLink to="/contact" > Contact </NavLink></li>
                            {/* At a time we have to either show Logout or Register/Login. So if value of isLoggedIn is true then show Logout option else show Register/login */}
                            {isLoggedIn ? (<li><NavLink to="/logout" > Logout </NavLink></li>) : ( 
                                  <> 
                                  <li><NavLink to="/register" > Register </NavLink></li>
                                  <li><NavLink to="/login" > Login </NavLink></li>
                                  </>
                                    )}      
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}