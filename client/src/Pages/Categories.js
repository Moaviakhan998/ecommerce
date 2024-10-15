import React from 'react'
import Layout from '../Components/Layout/Layout'
import useCategory from '../Components/Hooks/useCategory'
import { Link } from 'react-router-dom';
const Categories = () => {
    const categories = useCategory();
  return (
    <Layout>
        <div className="container">
            <div className="row">
            <h1 className='text-center mt-1'>All Categories</h1>
                {categories.map((c)=>{
                    return(
                        <div className="col-md-6" key={c._id}>
                            <Link to={`/category/${c.slug}`} className='btn btn-primary m-4 text-center'>{c.name}</Link>
                        </div>
                    )
                })}
            </div>
        </div>
      
    </Layout>
  )
}

export default Categories
