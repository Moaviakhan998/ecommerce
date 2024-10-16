import React, { useEffect, useState } from 'react'
import Adminmenu from '../Adminmenu'
import Layout from '../../Components/Layout/Layout'
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
const Product = () => {
    const [products, setProducts] = useState([])

    // Get All Rpoducts

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product`)
            setProducts(data.product);
            console.log(111111111111111)
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
    }
    //life cycle mehtod
    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <Layout>
            <div className="row">
                <div className="col-md-3 mt-5">
                    <Adminmenu />
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'> All Products List</h1>
                    <div className="d-flex flex-wrap">
                    {products?.map(p => {
                       
                        return(
                            <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} style={{textDecoration:"none", color:"black"}}>
                            <div className="card m-2" style={{width: "18rem"}} >
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${p._id}`} class="card-img-top" alt={p.name} />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description}</p>
                            </div>
                            </div>
                            </Link>)
                    })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product
