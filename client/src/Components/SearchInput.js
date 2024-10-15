import React from 'react'
import {useSearch} from '../Context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const SearchInput = () => {
    const [value, setValue] = useSearch()
    const navigate = useNavigate();
    const handleSubmit =async(e)=>{
        try {
            e.preventDefault();
            const {data} = await axios.get(`http://localhost:8080/api/v1/product/search/${value.keyword}`);
           
            setValue({...value, result: data})
            console.log(data)
            navigate("/search")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2 searchinput" type="text" placeholder="Search" aria-label="Search" value={value.keyword} onChange={(e)=>{setValue({...value,keyword: e.target.value})}} />
        <button className="btn btn-outline-success searchbtn" type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchInput
