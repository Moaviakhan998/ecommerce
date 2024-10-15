import React, { useEffect, useState } from 'react'

import Layout from '../Components/Layout/Layout'
import axios from 'axios';

import {Checkbox, Radio} from 'antd';
import { toast } from 'react-toastify';
import {Prices} from '../Components/Prices.js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/Cart';
// import type { RadioChangeEvent } from 'antd';

// import { useAuth } from '../Context/auth'
const HomePage = () => {
    const [products, setProducts]= useState([]);
    const [Categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0);
    const [page, setPage]= useState(1);
   const [loading, setloading]= useState(false);
   const [cart, setcart] = useCart();
  const Navigate = useNavigate();
    /// Get All Categories
    const getallcategories = async () => {
      try {
        setloading(true);
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/category/get-category"
          
        );
        setloading(true)
        if (data.success) {
          setCategories(data.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error ocur in display category");
      }
    };
    //get Total Count function
    const getTotal = async()=>{
      try {
        const {data} = await axios.get('http://localhost:8080/api/v1/product/product-count');
        setTotal(data?.totalcount)
      } catch (error) {
        console.log(error);
        
      }
    }
    
    // Load more Function
   
    useEffect(()=>{
      getallcategories();
      getTotal();
     
  },[])
    // get Products Function

    const getAllProducts = async()=>{
      try {
        setloading(true)
        const {data}=  await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
        setloading(false)
        
        setProducts(data?.products);
       
        
      } catch (error) {
        console.log(error)
      }
    }
    //Filter by categorey
    const handFillter =(value, id)=>{
        let all = [...checked]
        if (value) {
          all.push(id)
        }else{
          all = all.filter((c)=> c !== id)

        }
        setChecked(all)
    }
    useEffect(()=>{
      if (!checked.length && !radio.length) getAllProducts()
      //eslint-disable-next-line
    },[checked.length, radio.length])
    useEffect(()=>{
      if(checked.length || radio.length){ filterProducts()};
      //eslint-disable-next-line
    },[checked, radio])
    // Filter Function
    const filterProducts = async()=>{
      try {
        const data = await axios.post('http://localhost:8080/api/v1/product/product-filters', {checked, radio});
        setProducts(data?.data.products)
        
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      if (page===1) return;
        loadMore();
        //eslint-disable-next-line
    },[page])
    const loadMore = async()=>{
      try {
        setloading(true);
        const {data} = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
       
        setProducts([...products, ...data?.products])
        setloading(false);
      } catch (error) {
        console.log(error)
        setloading(false)
      }
    }
    
  return (
    <Layout title="All Products - Best Offers">
      <div className="bannerimmg row">
        
      </div>
      <div className="row mt-3">
        <div className="col-md-2 filterside">
          <h4 className="text-center ms-1">Filter By Category</h4>
          <div className="d-flex flex-column ms-3">
          {Categories.map(c=>{
            return(
              <Checkbox key={c._id} onChange={(e)=>{handFillter(e.target.checked, c._id)}}>
                {c.name}
              </Checkbox>
            )
          })}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column ms-3">
              <Radio.Group onChange={ (e)=> {setRadio(e.target.value)}} >
                {Prices.map(p=>{
                 return( 
                 <div>
                    <Radio value={p.array}>{p.name}</Radio>
                    
                 </div>)
                })}
              </Radio.Group>
          </div>
          <div className="d-flex flex-column ms-3">
              <button className='btn btn-danger mt-4' onClick={()=>{window.location.reload()}}>Clear All Filters</button>
          </div>
        </div>
        <div className="col-md-9">
          <div className="text-center">
            <h1 className='text-center'>All Products</h1>
            <div className="d-flex flex-wrap">
             
            {products?.map(p => {
                      return(
                        <div className="col ">
                           <div className="card m-2 cardmap" style={{width: "18rem"}} >
                           <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} className="card-img-top cardimg" alt={p.name} />
                           <div className="card-body ">
                               <h5 className="card-title">{p.name}</h5>
                               <p className="card-text">{p.description}</p>
                               <p className="card-text text-start"><b>$</b>{p.price}</p>
                               <button className="btn btn-primary ms-2 morebtn" onClick={()=>{Navigate(`/productdetail/${p.slug}`)}}>More Details</button>
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
          </div>
          <div className='m-2 p-3'>
            {
              products && products.length < total && (
                <button className='btn btn-warning loadmorebtn' onClick={(e)=>{
                  e.preventDefault();
                  setPage(page + 1)
                 
                }}>
                  {loading? "loading": "LoadeMore"}
                </button>
              )
            }
          </div>
        
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
