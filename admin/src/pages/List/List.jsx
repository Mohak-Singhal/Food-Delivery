import React, { useState } from 'react'
import "./List.css"
import axios from 'axios';
import { toast } from 'react-toastify';
const List = () => {
    const url ='http://localhost:4000';
    const[list,setList]=useState([]);
     
    const fetchlist= async()=>{
        const response=await axios.get(`$(url)/api/food/list`);
        if(response.data.success){
             setList(response.data.data)
        }
        else{
            toast.error("Error")
        }
    }
    const removeFood =async(foodId )=>{
        console.log(foodId)

    }    
  return (
   <div className="flex-col list add">
    <p>All Food List</p>
    <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          
        </div>
        {list.map((item,index)=>{
            return(
                <div  key={index} className="list-table-format title">
                    <img src={`${url}/images/`+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                    <p onClick={()=>removeFood(item._id)} >  X</p>
                </div>
            )

        })}
    </div>
   </div>
  )
}

export default List