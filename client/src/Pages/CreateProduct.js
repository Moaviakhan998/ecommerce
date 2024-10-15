import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import Adminmenu from './Adminmenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
  const {Option }= Select;
const CreateProduct = () => {
  const [categories, setCategories]= useState([]);
  const[photo, setPhoto] = useState('');
  const[name, setName] = useState('');
  const[description, setDiscription] = useState('');
  const[price, setPrice] = useState('');
  const[category, setCategory] = useState('');
  const[quantity, setQuantity] = useState('');
  const[shipping, setShipping] = useState('');
  const Navigate = useNavigate();

  /// Get All Categorey API
  const getallcategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
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
  const handlecreateProduct=async(e)=>{
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append('name', name)
        productData.append('description', description)
        productData.append('price', price)
        productData.append('quantity', quantity)
        productData.append('photo', photo)
        productData.append('category', category)
        productData.append('shipping', shipping)
         const {data} = await axios.post("http://localhost:8080/api/v1/product/create-product",productData)
         if (data?.success) {
              toast.success('Product Created')
              Navigate('/dashboard/admin/products')
         }else{
          toast.error(data?.message)
         }
      } catch (error) {
        console.log(error)
        toast.error('Error in Creating Product')
      }
  }
  return (
    <Layout title="Dashboard - Create-Product">
      <div className="row">
        <div className="col-md-3 m-3 p-3">
            <Adminmenu/>
        </div>
        <div className="col-md-6 m-3 p-3">
            <h1>Create Product</h1>
            <div className="m-1">
              <Select bordered={false} placeholder="Select a Category" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setCategory(value)}}>
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
                {photo && (
                <div className="text-center">
                  <img src={URL.createObjectURL(photo)} alt="product_photo" height={'200px'} className='img img-responsive' />
                
                </div>
                )}
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
                <Select bordered={false} placeholder="Select a Shiping" size='large' showSearch className='form-select mb-3' onChange={(value)=>{setShipping(value)}}>
                    
                  <Option  value={0}>No</Option>
                  <Option  value={1}>Yes</Option>
                </Select>
              
              </div>
              <div className="mb-3">
                <button className='btn btn-primary' onClick={handlecreateProduct}>CREATE PRODUCT</button>
              </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
