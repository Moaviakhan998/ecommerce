import React from 'react'

const CategoryForm = ({ handlesubmit, value, SetValue }) => {
    return (
        <>
            <form action="" onSubmit={handlesubmit}>
                <div style={{ background: "rgb(250, 243, 243)", width: "450px", borderRadius: "10px" }}>
                    <div>
                        <input type="text" className='m-3 p-2' style={{ border: "none", borderRadius: "20px", outline: "none", width: "400px", height: "40px", background: "rgb(221, 207, 207)" }} placeholder='Enter Category Name' onChange={(e) => SetValue(e.target.value)} value={value} />
                    </div>
                    <button type='submit' style={{ height: "40px", background: "rgb(221, 207, 207)", color: "black" }} className='btn btn-primary'>Submit</button>
                </div>
            </form>
        </>
    )
}

export default CategoryForm
