import React from 'react'
import Layout from '../Components/Layout/Layout'
import Usermenu from './UserMenu'
import { useAuth } from '../Context/auth'

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title="Dashboard - Ecommerce">
      <div className="container-fluid p-3 m3">
        <div className="row">
          <div className="col-md-3">
            <Usermenu/>
          </div>
          <div className="col-md-9 w-75">
            <h1>User Detail</h1>
            <h3>User Name : {auth?.user?.name}</h3>
            <h3>User Email : {auth?.user?.email}</h3>
            <h3>User Address : {auth?.user?.address}</h3>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
