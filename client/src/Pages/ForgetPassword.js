import React, { useState } from 'react'
import Layout from '../Components/Layout/Layout'

import {toast} from "react-toastify"

import axios from 'axios';

const ForgetPassword = () => {
    
    const[email, emailchange] = useState('');
    const[answer, answerchange] =  useState('')
    const[newpassword, newpasswordchange] = useState('');
   
    
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/forget-password", {email, answer,newpassword});
           
            if (res.data.success) {
                console.log(res.data.message)
                toast.success(res.data.message)
                
            }else if (!res.data.success) {
                console.log(res.data.message)
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("error")
        }
        
    }
  return (
    <Layout>
      
      <form action=""  method = "POST" onSubmit={handlesubmit}>
        <div className="signuppage login-page forgetpassword" style={{height:"60px !important"}}>
          <div style={{ textAlign: "center" }}>
            <h1>Forget Password</h1>
          </div>
            <div>
              <label htmlFor="email">Email:</label>
              <br />
              <div className="logindiv">
                <input
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => {
                     emailchange(e.target.value);
                  }}
                 
                />
              </div>
            </div>
            <div>
              <label htmlFor="text">Answer:</label>
              <br />
              <div className="logindiv">
                <input
                  type="text"
                  placeholder="Enter your bestfriend name"
                  onChange={(e) => {
                    answerchange(e.target.value);
                  }}
                 
                />
              </div>
            </div>
            <div>
              <label htmlFor="text">New Password:</label>
              <br />
              <div className="logindiv">
                <input
                  type="password"
                  placeholder="Enter Your newpassword"
                  onChange={(e) => {
                    newpasswordchange(e.target.value);
                  }}
                 
                />
              </div>
            </div>
            
          
            <div>
              <div className="inputsdiv">
                <button className="sbbtn submitbtn-sub forgetbtn" type="submit">
                  Forget Password
                </button>
                </div>
            </div>
        </div>
    </form>
    </Layout>
  )
}

export default ForgetPassword
