import { useState,useContext,createContext, useEffect } from "react";
const cartcontext = createContext();

const CartProvider = ({ children })=>{
    const[cart, setcart]= useState(
        []
    );
    useEffect(()=>{
        let existingcartItem = localStorage.getItem('cart')
        if (existingcartItem) {
            setcart(JSON.parse(existingcartItem))
        }
    },[])
   
    return(
        <cartcontext.Provider value={[cart,setcart]}>
            {children}
        </cartcontext.Provider>
    );
};
//Custom Hook
const useCart =()=>useContext(cartcontext);

//export
export {useCart, CartProvider};