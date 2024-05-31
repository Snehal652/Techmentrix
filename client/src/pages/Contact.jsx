import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
    username:"",
    email:"",
    message:"",
};

export const Contact = () => {

    const[contact, setContact] = useState(defaultContactFormData); 

    const[userData, setUserData] = useState(true);

    const {user} = useAuth();
    if(userData && user)
    {
        setContact({
            username: user.username,
            email:user.email,
            message:"",
        });

        setUserData(false);
    }

    const handleInput = (e) => {  //it provides us with an object called as event object "e"
        console.log(e)
        let name = e.target.name;
        let value = e.target.value;

        setContact({
            ...contact, //Previous data iske andar aajayega with help of ...
            [name]:value,
        }) 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/form/contact", {
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(contact),
            });

            if(response.ok){
                setContact(defaultContactFormData);
                const data = await response.json();
                console.log(data);
                alert('Message sent successfully')
            }
            
        } catch (error) {
            alert('Message not sent ')
            console.log(error);
        }
        
    }


    return (<>
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Contact Us</h1>
            </div>

            {/* Contact Main Page */}
            <div className="container grid grid-two-cols">
                <div className="contact-img">
                    <img 
                    src="/images/support.png" 
                    alt="we are always ready to help"
                    width="500"
                    height="500"
                    />
                </div>

                {/* Contact form content */}
                <section className="section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input 
                            type="text" 
                            name="username"
                            id="username"
                            autoComplete="off"
                            required
                            value={contact.username}
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
                            value = {contact.email}
                            onChange={handleInput}
                             />
                        </div>

                        <div>
                            <label htmlFor="message">Message</label>
                                <textarea 
                                name="message"
                                id="message"
                                autoComplete="off"
                                cols="30"
                                rows="6"
                                required
                                value = {contact.message}
                                onChange={handleInput}
                                />

                            
                        </div>

                        <div>
                            <button type="submit">Submit</button>
                        </div>
                        
                    </form>

                    <section className="mb-3">
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7202.773146605155!2d81.8660671!3d25.492151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399aca789e0c84a5%3A0x2c27733a7529bf08!2sMNNIT%20Allahabad%20Campus%2C%20Teliarganj%2C%20Prayagraj%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710233015890!5m2!1sen!2sin" 
                    width="100%" 
                    height="450"
                    allowfullscreen 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
        
                    </iframe>
                    </section>



                </section>
            </div>
        </section>
    </>
    );
 }