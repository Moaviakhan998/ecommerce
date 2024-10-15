import React from 'react'
import Layout from '../Components/Layout/Layout'

const About = () => {
  return (
    <Layout title="About Us- Ecommerce-app">
      <div className="row Aboutus">
        <div className="col-6">
          <img src="/images/about.jpeg" alt="" style={{width: "100%", padding: "30px"}}/>
        </div>
        <div className="col-6">
          <p style={{padding: "50px", margin: "70px", fontSize: "20px"}}>
          Ecommerce is a method of buying and selling goods and services online. The definition of ecommerce business can also include tactics like affiliate marketing. You can use ecommerce channels such as your own website, an established selling website like Amazon, or social media to drive online sales.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
