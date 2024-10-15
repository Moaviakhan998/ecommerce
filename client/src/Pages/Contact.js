import React from 'react'
import Layout from '../Components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport} from "react-icons/bi"
const Contact = () => {
  return (
    <Layout title="Contact Us- Ecommerce-app">
      <div className="row contactus">
        <div className="col-6">
          <img src="/images/contactus.jpeg" alt="" style={{width: "100%", padding: "30px"}}/>
        </div>
        <div className="col-6">
          <h1 style={{background: "black", color: "white", textAlign: "center",width:"70%",padding:"10px", marginTop: "25px",borderRadius:"25px"}}>CONTACT US</h1>
          <p style={{fontSize: "20px", letterSpacing: "1px"}}>any query and info about product feel free to call anytime we 24 hours available</p>
          <p style={{fontSize: "15px",fontWeight:"600", margin:"20px", letterSpacing: "0.5px"}}><BiMailSend style={{fontSize: "20px"}}/> : www.help@ecommerceapp.com</p>
          <p style={{fontSize: "15px",fontWeight:"600", margin:"20px", letterSpacing: "0.5px"}}><BiPhoneCall style={{fontSize: "20px"}}/> : 012-3456789</p>
          <p style={{fontSize: "15px",fontWeight:"600", margin:"20px", letterSpacing: "0.5px"}}><BiSupport style={{fontSize: "20px"}}/> : 1800-0000-0000 (toll free)</p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
