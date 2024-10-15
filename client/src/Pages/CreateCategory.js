import React from "react";
import Layout from "../Components/Layout/Layout";
import Adminmenu from "./Adminmenu";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {Modal} from 'antd'
import axios from "axios";
import CategoryForm from "../Components/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const[name, setname] = useState('');
  const [visible,  setVisible] = useState(false);
  const [selected, setselected] = useState(null);
  const [updatename, setUpdatedName] = useState("");
  const handlesubmit =  async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:8080/api/v1/category/create-category',{name});
      if (data?.success) {
        toast.success(`${name} is created`)
        getallcategories();
        setname('')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast("Error In Submit Form")
    }
  }
  const getallcategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error ocur in display category");
    }
  };
  useEffect(() => {
    getallcategories();
  }, []);

  // update Catgeory
  const hanldeUpdate =async (e)=>{
    e.preventDefault();
    try {
        const {data }= await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`,  {name: updatename})
        if (data.success) {
          toast.success( `${updatename} is updated`);
          setselected(null);
          setUpdatedName('');
          setVisible(false);
          getallcategories();
        }else{
          toast.error(data.message)
        }
    } catch (error) {
      console.log(error);
      toast.error("error in updating name")
    }
  }
  // Delete Category 
  const deleteCategory =async(pId)=>{
    
    try {
     const{ data}=  await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${pId}`,)
      if (data.success) {
        getallcategories();
      toast("Deleted SuccessFully")
      }
      
    } catch (error) {
      console.log(Error);
      toast.error("Error In Deleting Category")
    }
  }
  return (
    <Layout title="Dashboard - Create-Category">
      <div className="row">
        <div className="col-md-3 m-3 p-3">
          <Adminmenu />
        </div>
        <div className="col-md-6 m-3 p-3">
          <h1>Manage Category</h1>
          <div>
            <CategoryForm handlesubmit={handlesubmit} value={name} SetValue={setname}/>
          </div>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                
                  {categories.map((c) => {
                    return (
                      <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true); setUpdatedName(c.name); setselected(c)}}>Edit</button>
                          <button className="btn btn-danger ms-2" onClick={()=>{deleteCategory(c._id); setselected(c)}}>Delete</button>
                        </td>
                      </tr>
                      </>
                    )

                  })}
                
              </tbody>
            </table>
          </div>
          <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}>
                  <CategoryForm value={updatename} SetValue={setUpdatedName} handlesubmit={hanldeUpdate}/>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
