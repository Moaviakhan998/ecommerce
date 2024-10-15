
import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../Context/Cart';
import { toast } from 'react-toastify';

const CategoryProduct = () => {
    const params = useParams();
    const [products, setProduct]= useState([]);
    const [category, setCategory]= useState([])
    const Navigate = useNavigate();
    const [cart, setcart] = useCart();
    const SetProductByCategory = async()=>{
        try {
            const {data}= await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-category/${params.slug}`)
            setProduct(data?.products);
            setCategory(data?.category)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if (params?.slug) {
            SetProductByCategory();
        }
    },[params?.slug])
  return (
    <Layout>
      <div className="container mt-3">
        <h1 className='text-center'>Category - {category.name}</h1>
        <div className="row">
        <div className="d-flex flex-wrap">
             
             {products?.map(p => {
                        return(
                         <div className="col">
                            <div className="card m-2" style={{width: "18rem"}} >
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description}</p>
                                <p className="card-text text-start"><b>$</b>{p.price}</p>
                                <button className="btn btn-primary ms-2" onClick={()=>{Navigate(`/productdetail/${p.slug}`)}}>More Details</button>
                                <button className="btn btn-secondary ms-2" onClick={()=>{
                                setcart([...cart, p]);
                                localStorage.setItem('cart',JSON.stringify([...cart,p]))
                                toast.success("Item added to cart")
                               }}>Add to Cart</button>
                            </div>
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

export default CategoryProduct
