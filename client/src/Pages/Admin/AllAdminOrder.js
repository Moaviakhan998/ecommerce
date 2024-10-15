import React, { useEffect, useState } from 'react'
import Adminmenu from '../Adminmenu'
import Layout from '../../Components/Layout/Layout'
import { useAuth } from '../../Context/auth'
import axios from 'axios'
import moment from 'moment'
import {Select} from 'antd'
const {Option} = Select
const AllAdminOrder = () => {
    const[status, setStatus] = useState([
        "Not Process","Processing", "Shipped","Deliverd","Cancel"
    ])
    

    const [orders, setOrders] = useState([])
    const [auth, setAuth] = useAuth()
    const getOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/v1/auth/all-orders')
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
    const handleChange =async(orderId, value)=>{
        try {
            const {data} = await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderId}`,{
                status: value,
            })
            getOrders()
        } catch (error) {
            console.log(error)
        }
       
    }
  return (
    <Layout title="Dashboard-Admin-All orders">
      <div className="container mt-3 mb-3">
        <div className="row">
            <div className="col-md-3">
                    <Adminmenu/>
            </div>
            <div className="col-md-9">
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
                        <td>
                            <Select bordered={false} onChange={(value)=>{handleChange(o._id, value)}} defaultValue={o?.status}>
                                {status?.map((s,i)=>{
                                    return <Option key={i} value={s}>{s}</Option>
                                })}
                            </Select>
                        </td>
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

export default AllAdminOrder
