import React, { useCallback, useRef, useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';
import "./Search.css";
import SearchResults from './SearchResults';
import SearchIcon from '@material-ui/icons/Search';


function Search() {
    const [contacts,setContacts]=useState([]);
    const [Search, setSearch] = useState("");
    const [page, setpage] = useState(1);
  
    const [hasMore, setHasMore] = useState(false)
 
   
 
    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
      
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
            setpage(prevpage => prevpage + 1)
        }
        })
        if (node) observer.current.observe(node)
    }, [ hasMore])    
    
    const searchState = async fetchData =>{
        const fetchUrl=`https://rickandmortyapi.com/api/character/?name=${fetchData}&page=${page}`
        const requests= await axios.get(fetchUrl);
        const cons= requests.data.results;
        console.log(cons)
        // console.log(cons.location222.name)
        let  matches =cons.filter(con =>{
            const regex =new RegExp(`^${fetchData}`,'gi');
             
             return con.name.match(regex);
        });
        if(fetchData.length === 0){
            matches=[]
        }
        setHasMore(matches.length>0)
        // setLoading(true)
        setpage(1)
        setContacts(matches)
    }   
    
    
  

    return (
        <>
        <div className="search">
            <h2>Rick and Morty Search </h2>
            <div className="search__auto">
            <div className="search__bar">
            <SearchIcon/>
            <input value={Search} placeholder="Search for a contact" onInput ={event => setSearch(event.target.value)}
             onChange={event => searchState(event.target.value)}type="text" 
            />
            </div>
            </div>
            
            <div>
           
            {contacts.map(({id,name,image,status,gender,species,location,origin},index)=>{
                   
                        if (contacts.length === index + 1) {
                        return (
                            <div ref={lastBookElementRef} key={id}  className="search__results">
                            <SearchResults name={name}
                            image={image}
                            status={status}
                            species={species}
                            gender={gender}
                            location={location.name}
                            origin={origin.name}/>
                            </div>)
                        } else {
                            <div   key={id}  className="search__results">
                            <SearchResults name={name}
                            image={image}
                            status={status}
                            species={species}
                            gender={gender}
                            location={location.name}
                            origin={origin.name}/>
                            </div>
                        }
                    
})}
              
                </div>
         
                </div>
       
        </>
    )
}   

export default Search
