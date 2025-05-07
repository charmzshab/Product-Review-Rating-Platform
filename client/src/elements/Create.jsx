import React, { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Create() {
    const [values, setValues] = useState({
        name: '',
        description: '',
        category: '',
        price: ''
    })

    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        axios.post('/add_product', values)
        .then((res)=>{
            
            navigate('/')
            console.log(res)
        })
        .catch((err)=>console.log(err))
    }
  return (
    <div className='container vh-100 vw-100 bg-primary'>
        <div className='row'>
            <h3>Add Product</h3>
            <div className='d-flex justify-content-end'>
                <Link to='/' class='btn btn-success'>Home</Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-group my-3'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' required onChange={(e)=> setValues({...values, name: e.target.value})} />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='description'>Description</label>
                    <input type='text' name='description' required onChange={(e)=> setValues({...values, description: e.target.value})} />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='category'>Category</label>
                    <input type='text' name='category' required onChange={(e)=> setValues({...values, category: e.target.value})} />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='price'>Price</label>
                    <input type='number' name='price' required onChange={(e)=> setValues({...values, price: e.target.value})} />
                </div>
                <div className='form-group my-3'>
                    <button type='submit' className='btn btn-success'>Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Create