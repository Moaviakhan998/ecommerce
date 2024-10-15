import React from 'react'
import Layout from '../Components/Layout/Layout'
import { useSearch } from '../Context/Search'
import { useCart } from '../Context/Cart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [value] = useSearch();
    const [cart, setcart] =useCart();
    const Navigate = useNavigate();
  return (
    <Layout title="Search Results">
      <div className="container">
        <div className="text-center">
            <h1>Search Results</h1>
            <h4>{value?.result.length <1 ? "No Product Found": `Found ${value.result.length}`}</h4>
            {value.result?.map(p => {
                       return(
                        <div className="col ">
                           <div className="card m-2 cardmap" style={{width: "18rem"}} >
                           <img src={`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top cardimg" alt={p.name} />
                           <div className="card-body">
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
    </Layout>
  )
}

export default SearchPage
