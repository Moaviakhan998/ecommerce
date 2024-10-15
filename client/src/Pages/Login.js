import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import { Link, useLocation } from "react-router-dom";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/auth";
const Register = () => {
   const [auth, setAuth]= useAuth('');
    const[email, emailchange] = useState('');
    const[password, passwordchange] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/login", {email, password});
            if (res.data.success) {
                console.log(res.data.message)
                toast.success(res.data.message);
                setAuth({
                  ...auth,
                  user: res.data.user,
                  token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state ||'/')
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
    <Layout title="Login Now || Ecommerce-app">
      <form action=""  method = "POST" onSubmit={handlesubmit}>
        <div className=" login-page">
          <div style={{ textAlign: "center" }}>
            <h1>Login From</h1>
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
              <label htmlFor="text">Password:</label>
              <br />
              <div className="logindiv">
                <input
                  type="password"
                  placeholder="Enter Your password"
                  onChange={(e) => {
                    passwordchange(e.target.value);
                  }}
                 
                />
              </div>
            </div>
            
          
            <div>
              <div className="inputsdiv">
                <button className="sbbtn submitbtn-sub" type="submit">
                  Login
                </button>
                <Link to="/register"><button className="submitbtn-new">New User</button></Link>
                
              </div>
              <div className="inputsdiv mt-4">
                <Link to="/forgetpassword" style={{margin: "20px",borderRadius:"20px",padding: "15px", textDecoration:"none", color: "white", height: "0px", background:"red"}}>  Forget Password</Link>
                </div>
            </div>
          </div>
      </form>
    </Layout>
  );
};

export default Register;
