import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function useCategory(){
    const [categories, setCategories] = useState([]);
    //get category function
    const getallcategories = async()=>{
        try {
            const{data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/get-category`)
            setCategories(data?.category);
            console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getallcategories();
        //eslint-disable-next-line
    },[])
    return categories;
}