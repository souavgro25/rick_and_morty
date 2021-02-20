import React from 'react'
import "./ContactDetail.css";

function ContactDetail({name,image,status,species,gender,location,origin}) {
    return (
        <div className="contactDetail">
            <div className="contactDetail__upper">
                <img src={image} alt={name}/>
                <div className="upper__right">
                    <h3>{name}</h3>
                    <p>{status}  - {species}</p>
                </div>
                
            </div>
           
            <div className="contactDetail__lower">
                   <div className="lowertext">
                   <p>Gender</p>
                   <h4>{gender}</h4> 
                   <p>Species</p>
                   <h4>{species}</h4> 
                   </div>
                   <div className="lowertext">
                   <p>Location</p>
                   <h4>{location}</h4> 
                   <p>Origin</p>
                   <h4>{origin}</h4> 
                   </div>
                  
            </div>
        </div>
    )
}
 
export default ContactDetail
