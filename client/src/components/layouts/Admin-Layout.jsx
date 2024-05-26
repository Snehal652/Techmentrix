import { NavLink, Navigate, Outlet } from "react-router-dom"; // outlet is used for showing contents of Nested routes.
import {FaUser, FaHome, FaRegListAlt} from "react-icons/fa"
import {FaMessage} from "react-icons/fa6";
import { useAuth } from "../../store/auth";


export const AdminLayout = () => {
    const {user, isLoading} = useAuth();

    if(isLoading){
        return <h1>Loading...</h1>
    } // Jab tak data fetch ho rha hai tab tak isLoading ki value true hogi aur page load hote rhega..jaise hi ek baar data fetch hojayega tab isLoading false hojayega and hume content dikh jaayega page par.

    if(!user.isAdmin){
        return <Navigate to="/" />
    } //Agar woh admin nhi hai toh usko Home page par redirect kardo aur admin ka content mat dikhao. This is how we secure admin route.

    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li><NavLink to="/admin/users"><FaUser/>Users</NavLink></li>
                            <li><NavLink to="/admin/contacts"><FaMessage/>Contacts</NavLink></li>
                            <li><NavLink to="/service"><FaRegListAlt/>Services</NavLink></li>
                            <li><NavLink to="/"><FaHome/>Home</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet/>
        </>
    )
}