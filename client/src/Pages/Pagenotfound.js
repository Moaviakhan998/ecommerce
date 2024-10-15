import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
  
  return (
    <Layout title="PageNot Found- Ecommerce-app">
    <div className='pagenotfoud'>
      <h1>404</h1>
      <p>Oops! Page Not Found</p>
      <Link to='/' style={{textDecoration: "none", color: 'black'}}><button >Go Back</button></Link>

    </div>    
      </Layout>
  )
}

export default Pagenotfound
