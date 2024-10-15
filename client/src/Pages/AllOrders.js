import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import Usermenu from './UserMenu'
import { useAuth } from '../Context/auth'
import moment from 'moment'
import axios from 'axios'

const AllOrders = () => {
  const [orders, setOrders] = useState([])
  const [auth, setAuth] = useAuth()
  const getOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/auth/orders')
      setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token])
  return (
    <Layout title="Dashboard-User-Orders">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <Usermenu />
          </div>
          <div className="col-md-6">
            <h1>All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{i+1}</th>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success": "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                  {o?.products?.map((p,i) => {
                            return (
                                <div className="row card flex-row mb-2">
                                    <div className="col-md-4">
                                        <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} height="100px" style={{ width: "100px" }} className="card-img-top" alt={p.name} />
                                    </div>
                                    <div className="col-md-8">
                                        <p>{p.name}</p>
                                        <p>{p.description}</p>
                                        <p>${p.price}</p>
                                        
                                    </div>

                                </div>
                            )
                        })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AllOrders
