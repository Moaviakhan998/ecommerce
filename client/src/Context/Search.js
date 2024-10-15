
import { useState,useContext,createContext } from "react";
const searchcontext = createContext();

const SearchProvider = ({ children })=>{
    const[auth, setAuth]= useState({
        keywords: "",
        result:[]
    });
    
   
    return(
        <searchcontext.Provider value={[auth,setAuth]}>
            {children}
        </searchcontext.Provider>
    );
};
//Custom Hook
const useSearch =()=>useContext(searchcontext);

//export
export {useSearch, SearchProvider};