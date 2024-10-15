import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../Components/Layout/Layout';
import Adminmenu from '../Adminmenu';
  const {Option }= Select;

const UpdateProduct = () => {
        const [categories, setCategories]= useState([]);
        const params = useParams()
    const[photo, setPhoto] = useState('');
    const[name, setName] = useState('');
    const[description, setDiscription] = useState('');
    const[price, setPrice] = useState('');
    const[category, setCategory] = useState('');
    const[quantity, setQuantity] = useState('');
    const[shipping, setShipping] = useState('');
    const[id, setId] = useState("");
    const Navigate = useNavigate();
    console.log(category)
    //get single product
    const getsingleproduct =async()=>{
        try { 
            const {data} =await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/get-product/${params.slug}`);
            
            setName(data.product.name)
            setPrice(data.product.price)
            setId(data.product._id)
            setDiscription(data.product.description)
            setPhoto(data.product.photo)
            setCategory(data.product.category._id)
            setQuantity(data.product.quantity)
            setShipping(data.product.shipping)
            
        } catch (error) {
          console.log(error);
          toast.error("Some thing went wrong in getting single product")   
        }
    }
    useEffect(()=>{
      getsingleproduct();
      //eslint-disable-next-line
    },[])
    // get All prodcts
    const getallcategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error ocur in display category");
    }
  };
  useEffect(() => {
    getallcategories();
  }, []);
  //////////////////////////////////////////////////////////////////////////////
  ////////////////Createing PRoduct
  const handleupdateProduct =async(e)=>{
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append('name', name)
        productData.append('description', description)
        productData.append('price', price)
        productData.append('quantity', quantity)
        photo && productData.append('photo', photo)
        productData.append('category', category)
        productData.append('shipping', shipping)
         const {data} = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/update-product/${id}`,productData)
         if (data?.success) {
              toast.success('Product updated')
              Navigate('/dashboard/admin/products')
         }else{
          toast.error(data?.message)
         }
      } catch (error) {
        console.log(error)
        toast.error('Error in Creating Product')
      }
  }
  ////////////////Handle delete product

  const handledeleteProduct = async()=>{
    try {
      let answer = window.prompt("Are you sure you want to Delete the Product")
      if (!answer) {
        return
      }
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/delete-product/${id}`)
      Navigate('/dashboard/admin/products')
    } catch (error) {
      console.log(error)
      toast.error('Error in Deleting the Product')
    }
  }
  return (
    <Layout title="Dashboard - Create-Product">
      <div className="row">
        <div className="col-md-3 m-3 p-3">
            <Adminmenu/>
        </div>
        <div className="col-md-6 m-3 p-3">
            <h1>Update Product</h1>
            <div className="m-1">
              <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}} value={category}>
                  {categories?.map((c)=>{
                    return <Option key={c._id} value={c._id}>{c.name}</Option>
                  })}
              </Select>
              <div className="mb-3">
                <label className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name :"Upload Photo"}
                  <input type="file" name='photo' accept='image/*' onChange={(e)=>{setPhoto(e.target.files[0])}} hidden/>
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                <div className="text-center">
                  <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className='img img-responsive' />
                
                </div>
                ) : (
                  <div className="text-center">
                  <img src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${id}`} alt="product_photo" height={'200px'} className='img img-responsive' />
                
                </div>
                )
                }
              </div>
              <div className="mb-3">
                <input type="text" value={name} placeholder='Enter the  Product Name' className='form-control' onChange={(e)=>{setName(e.target.value)}}/>
              
              </div>
              <div className="mb-3">
                <textarea type="text-area" value={description} placeholder='Enter the  Product Discription' className='form-control' onChange={(e)=>{setDiscription(e.target.value)}}/>
              
              </div>
              <div className="mb-3">
                <input type="number" value={price} placeholder='Enter the  Price' className='form-control' onChange={(e)=>{setPrice(e.target.value)}}/>
              
              </div>
              <div className="mb-3">
                <input type="number" value={quantity} placeholder='Enter the  Product Quantity' className='form-control' onChange={(e)=>{setQuantity(e.target.value)}}/>
              
              </div>
              <div className="mb-3">
                <Select bordered={false} placeholder="Select a Shiping" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setShipping(value)}} value={shipping ? "yes" : "No"}>
                    
                  <Option  value={0}>No</Option>
                  <Option  value={1}>Yes</Option>
                </Select>
              
              </div>
              <div className="mb-3">
                <button className='btn btn-primary' onClick={handleupdateProduct}>UPDATE PRODUCT</button>
              </div>
              <div className="mb-3">
                <button className='btn btn-danger' onClick={handledeleteProduct}>DELETE PRODUCT</button>
              </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
