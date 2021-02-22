import React, { useState } from 'react'
import "./SearchResults.css";
// import ContactDetail from "./ContactDetail";
import Modal from "react-modal"
import "./ContactDetail.css";
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
// import Modal from '@material-ui/core/Modal';
function SearchResults({name,image,status,species,gender,location,origin}) {
    const [mode,setmode]=useState(false);
    const customStyles = {
        content : {
        
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
      function closeModal(){
        setmode(false);
        console.log(mode);
      }
      function openModal() {
        setmode(true);
        console.log(mode);
      }
    return (
        <>
           <Modal style ={customStyles}
           isOpen={mode}
           ariaHideApp={false}
           onRequestClose={closeModal}>
        
               <div className="contactDetail">
               
                <CloseIcon onClick={closeModal}/>
                
            <div className="contactDetail__upper">
                <img src={image} alt={name} />
                <div className="upper__right">
                    <h3>{name}</h3>
                    <p>{status}-{species}</p>
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
               </Modal> 
               <div  className="search__results" onClick={openModal}>
            <div className="search__resultsLeft">
                <img src={image} alt={name}/>
                <p>{name}</p>
            </div>
            <div className="search__resultsRight">
                <p>{status}-{species}</p>
            </div>
            </div>            
        </>
    )
}

export default SearchResults
