import { useAuth } from "../store/auth"

export const Service = () => {
    const {services} = useAuth();

    return (
        <div className="section-service">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>

            <div className="section-service-card">
            {services.map((curElem, index) => {
                const {price, description, provider, service} = curElem;

                return (
                <div className="card" key={index}>
                    <div className="card-img">
                        <img src="/images/design.png" alt="Our Services Info" width="200" />
                    </div>
                    
                    <div className="card-title">
                        {/* <div className="grid grid-two-cols"> */}
                            <p><u><b>{provider}</b></u></p>
                            <p>Price: {price}</p>
                        {/* </div> */}
                        <h2>Name: {service}</h2>
                        <p>{description}</p>
                    </div>
                </div>
                );
            })} 
                
             </div>
        </div>
    )
}