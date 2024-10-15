import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import { Link } from "react-router-dom";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
    const[name, namechange] = useState('');
    const[email, emailchange] = useState('');
    const[answer, answerchange] = useState('');
    const[password, passwordchange] = useState('');
    const[phone, phonechange] = useState('');
    const[address, addresschange] = useState('');
    const navigate = useNavigate();
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/register",{name, email,answer, password, phone,address});
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/Login')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("error")
        }
        
    }
  return (
    <Layout title="RegisterNow || Ecommerce-app">
      <form action=""  method = "POST" onSubmit={handlesubmit}>
        <div className="signuppage">
          <div style={{ textAlign: "center" }}>
            <h1>Regestration Form</h1>
          </div>
          <div>
            <div>
              <label htmlFor="text">Name:</label>
              <br />
              <div className="inputsdiv">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  onChange={(e) => {
                    namechange(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <br />
              <div className="inputsdiv">
                <input
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => {
                     emailchange(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email">Answer:</label>
              <br />
              <div className="inputsdiv">
                <input
                  type="text"
                  placeholder="Enter your Best Friend name"
                  onChange={(e) => {
                     answerchange(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="text">Password:</label>
              <br />
              <div className="inputsdiv">
                <input
                  type="password"
                  placeholder="Enter Your password"
                  onChange={(e) => {
                    passwordchange(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="text">Phone:</label>
              <br />
              <div className="inputsdiv">
                <input
                  type="phone"
                  placeholder="Enter Your Phonenumber"
                  onChange={(e) => {
                    phonechange(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="text">Address:</label>
              <br />
              <div className="inputsdiv">
                <input
                  type="text"
                  placeholder="Enter Your Adress"
                  onChange={(e) => {
                    addresschange(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
          
            <div>
              <div className="inputsdiv">
                <button className="sbbtn" type="submit">
                  Sign Up
                </button>
                <p className="loginsignup-login">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span>Login Here</span>
                  </Link>
                </p>
                <div className="loginsignup-agree">
                  <input className="inputtag" type="checkbox" name="" id="" required/>
                  <p>
                    By continuing, i agree to the terms of use & privacy policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
