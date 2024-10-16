import React from 'react'
import Layout from '../Components/Layout/Layout'
import Adminmenu from './Adminmenu'
import { useAuth } from '../Context/auth'

const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 m-3 p-3">
            <h3>Admin Panel</h3>
            <Adminmenu/>
          </div>
          <div className="col-md-6 m-3 p-3">
            <div className="card m-3 p-2">
              <h3>Admin Name: {auth.user.name}</h3> 
              <h3>Admin Email: {auth?.user?.email}</h3>
               <h3>Admin Contact: {auth.user.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
