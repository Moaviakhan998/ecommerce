import axios from "axios";
import { useState,useContext,createContext, useEffect } from "react";
const authcontext = createContext();

const AuthProvider = ({ children })=>{
    const[auth, setAuth]= useState({
        user: null,
        token:""
    });
    axios.defaults.headers.common['Authorization']= auth?.token;
    useEffect(()=>{
        let data  =  localStorage.getItem('auth');
        if (data) {
            
            const parsedata = JSON.parse(data);
           
            setAuth({
                ...auth,
                user: parsedata.user,
                token: parsedata.token
            })
            
        }
        //eslint-disable-next-line
    },[])
    return(
        <authcontext.Provider value={[auth,setAuth]}>
            {children}
        </authcontext.Provider>
    );
};
//Custom Hook
const useAuth =()=>useContext(authcontext);

//export
export {useAuth, AuthProvider};