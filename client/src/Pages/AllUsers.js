import React from 'react'
import Layout from '../Components/Layout/Layout'
import Adminmenu from './Adminmenu'

const AllUsers = () => {
  return (
    <Layout title="Dashboard - All-Users">
      <div className="row">
        <div className="col-md-3 m-3 p-3">
            <Adminmenu/>
        </div>
        <div className="col-md-6 m-3 p-3">
            <h1>All User</h1>
        </div>
      </div>
    </Layout>
  )
}

export default AllUsers
