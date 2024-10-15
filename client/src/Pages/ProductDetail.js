import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useCart } from '../Context/Cart'
import { toast } from 'react-toastify'

const ProductDetail = () => {
    const params= useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts]= useState([]);
    const [cart, setcart] = useCart();
    useEffect(()=>{
        if (params?.slug) {
            getProduct()
        }
        //eslint-disable-next-line
    },[params?.slug])
    const getProduct = async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            similarProduct(data?.product._id,data?.product.category?._id)
        } catch (error) {
            console.log(error)
        }
    }
    //Similar Product ApI
    const similarProduct = async(pid,cid)=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
        <div className="d-flex">
            <div className="col-md-3">
            <img src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${product._id}`} className="card-img-top cardimg" style={{height: "200px", width:"200px", margin:"20px"}} alt={product.name} />
            </div>
            <div className="col-md-9 cardmap">
                <h1 className='text-center'>Product Details</h1>
                <h6>Name: {product.name}</h6>
                <h6>Description: {product.description}</h6>
                <h6>Price: {product.price}</h6>
                <h6>Category: {product.category?.name}</h6>
                {/* <h6>Shipping: {product.shipping}</h6> */}
                <div className="">
                <button className="btn btn-secondary m-2 addtocartbtn" onClick={()=>{
                                setcart([...cart, product]);
                                localStorage.setItem('cart',JSON.stringify([...cart,product]))
                                toast.success("Item added to cart")
                               }}>Add to Cart</button>
                </div>
            </div>
        </div>
        <hr />
        <div className="row container">
            <h1>Similar Product</h1>
            {relatedProducts.length < 1 && <p className='text-center'>No Similar Products Available</p>}
            {relatedProducts?.map(p => {
                       return(
                        <div className="col">
                           <div className="card m-2 cardmap" style={{width: "18rem"}} >
                           <img src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top cardimg" alt={p.name} />
                           <div className="card-body">
                               <h5 className="card-title">{p.name}</h5>
                               <p className="card-text">{p.description}</p>
                               <p className="card-text text-start"><b>$</b>{p.price}</p>
                               
                               <button className="btn btn-secondary ms-2 addtocartbtn" onClick={()=>{
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
      
    </Layout>
  )
}

export default ProductDetail
