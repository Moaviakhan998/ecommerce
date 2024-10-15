import React, { useEffect, useState } from 'react'
import Usermenu from './UserMenu'
import Layout from '../Components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/auth';

const UserProfile = () => {
  const[auth, setauth]= useAuth();
  const [name, namechange] = useState('');
  const [email, emailchange] = useState('');
  
  const [password, passwordchange] = useState('');
  const [phone, phonechange] = useState('');
  const [address, addresschange] = useState('');
  ///USeEffect Hook
useEffect(()=>{
  const {name, email, phone, address}=  auth?.user;
  namechange(name);
  emailchange(email);
  phonechange(phone);
  addresschange(address);
},[auth?.user])
  ///Handle Submit Button
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("http://localhost:8080/api/v1/auth/profile", { name, email,  password, phone, address });
      if (data?.error) {
        toast.error(data?.message)
      } else {
        setauth({...auth, user:data?.updatedUser})
        let ls = localStorage.getItem(auth)
        ls = JSON.parse(ls)
        ls = data.updatedUser
        localStorage.setItem('auth',JSON.stringify(ls));
        toast.success("Profile Updated Successfully")
      }
    } catch (error) {
      console.log(error)
      toast.error("error")
    }

  }
  return (
    <Layout title="Dashboard-User-Profile">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-6">
            <form action="" method="POST" onSubmit={handlesubmit}>
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
                        value={name}
                        onChange={(e) => {
                          namechange(e.target.value);
                        }}
                       
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
                        value={email}
                        onChange={(e) => {
                          emailchange(e.target.value);
                        }}
                        disabled
                        
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
                        value={password}
                        onChange={(e) => {
                          passwordchange(e.target.value);
                        }}
                        
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
                        value={phone}
                        onChange={(e) => {
                          phonechange(e.target.value);
                        }}
                        
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
                        value={address}
                        onChange={(e) => {
                          addresschange(e.target.value);
                        }}
                       b
                      />
                    </div>
                  </div>

                  <div>
                    <div className="inputsdiv">
                      <button className="sbbtn" type="submit">
                        UPDATE
                      </button>
                      </div>
                    
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserProfile
