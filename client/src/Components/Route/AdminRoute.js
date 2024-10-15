import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Pages/Spinner";

export default function AdminRoute (){
    const[ok, setOk] = useState(false);
    const[auth] = useAuth();
    useEffect(()=>{
        const authCheck = async()=>{
            const res =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/admin-auth`)
            if (res.data.ok) {
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if (auth?.token) {
            authCheck();
        }
    },[auth?.token])
    return ok ? <Outlet/>: <Spinner path=""/>
}