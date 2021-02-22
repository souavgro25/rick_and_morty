import React, { useCallback,useRef, useEffect, useState } from 'react'
import axios from "axios";

import "./Search.css";
import SearchResults from './SearchResults';
import SearchIcon from '@material-ui/icons/Search';



function Search() {
    const [contacts,setContacts]=useState([]);
    const [Search, setSearch] = useState("");
    const [page, setpage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(true)
    

 useEffect(() => {
    fetchmore(Search);
 }, [page])
  

 const observer = useRef()
  //  function to setpage when the last elememt of the current page is reached 
 const lastElementRef = useCallback(node => {
   if (loading) return
   if (observer.current) observer.current.disconnect()
   observer.current = new IntersectionObserver(entries => {
     if (entries[0].isIntersecting && hasMore) {
       setpage(prevPage => prevPage + 1)
     }
   })
   if (node) observer.current.observe(node)
 }, [loading, hasMore])

// function to fetch data of page when page is set to new page
   const fetchmore = ( async fetchData  =>{ 
    const requests= await axios({
        method: 'GET',
        url: 'https://rickandmortyapi.com/api/character/',
        params: { name: Search, page: page },
        })
    const cons= requests.data.results;
    console.log(cons)

    let  matches =cons.filter(con =>{
        const regex =new RegExp(`^${fetchData}`,'gi');
         
         return con.name.match(regex);
    });
    if(fetchData.length === 0){
        matches=[]
    }
    const result= [...contacts,...matches];
 
    console.log(result);
    
    
    setContacts(result)
    setHasMore(true)
    setLoading(false)
    
        
   })
//   This function calls when new search is happen  
    const searchState =  ( async fetchData => {
       
        const requests= await axios({
            method: 'GET',
            url: 'https://rickandmortyapi.com/api/character/',
            params: { name: Search, page: page },
            })
        const cons= requests.data.results;
        console.log(cons)
     
        let  matches =cons.filter(con =>{
            const regex =new RegExp(`^${fetchData}`,'gi');
             
             return con.name.match(regex);
        });
       
        let result= [...contacts,...matches];
        if(fetchData.length === 0){
            matches=[]
            result=[]
        }
       
        console.log(result);
       
        setContacts(result)
        setLoading(false)
        setHasMore(true)
        setpage(1)
        
        
    }  ) 
   
    console.log(page);
  

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
         
            {
            contacts.map(({id,name,image,status,gender,species,location,origin},index)=>{
                  
                if (contacts.length === index + 1) {
                    return <div ref={lastElementRef}  className="search__results">
                 
                 <SearchResults name={name}
                 key={id}                     
                 image={image}
                 status={status}
                 species={species}
                 gender={gender}
                 location={location.name}
                 origin={origin.name}
                />
                 </div>
                  } else {
                    return<div   className="search__results">
          
                 <SearchResults name={name}
                 key={id}                     
                 image={image}
                 status={status}
                 species={species}
                 gender={gender}
                 location={location.name}
                 origin={origin.name}
                />
                 </div>
                  }
                    
})}
     
                </div>
         
                </div>
       
        </>
    )
}   

export default Search
