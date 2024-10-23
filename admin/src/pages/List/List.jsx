import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = ({ url }) => {
  const [lists, setList] = useState([]);

  const fetchlist = async () => {
    try {
        const response = await axios.get(`${url}/api/food/list`);
        
        console.log(response); 
        
        if (response.data.success) {
          setList(response.data.data);
        } else {
         
          console.error(response.data);
          toast.error("Error fetching the list.");
        }
      } catch (error) {
        console.error("An error occurred: ", error);
        toast.error("An error occurred while fetching the list.");
      }
    };
  useEffect(() => {
    fetchlist();
  }, []);
  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    console.log(response);
    await fetchlist();
    console.log(response);
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
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
        {lists.map((item, index) => {
          return (
            <div key={index} className="list-table-format title">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                {" "}
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
