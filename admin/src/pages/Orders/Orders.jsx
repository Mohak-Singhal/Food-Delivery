import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        console.log("Error");
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error fetching orders");
    }
  };

  const statusHandler= async(event,orderId)=>{
    const response = await axios.post(url + "/api/order/status",{orderId,status:event.target.value});
      if (response.data.success) {
        await fetchAllOrders();
        
      } else {
        console.log("Error");
        toast.error("Error");
      }

  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders available</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon}  />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) =>
                    index === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `
                  )}
                </p>
                <p className="order-item-name">
                  {order.address.firstname} {order.address.lastname} 
                </p>
                <p className="order-item-address">
                  <p>{order.address.street},</p>
                  <p>{order.address.city},{order.address.state},{order.address.country},{order.address.zipcode}</p>
                  <p className="order-item-phone">{order.address.phone}</p>
                  {/* <p>Items:{order.item.length}</p> */}
                  <p>${order.amount}</p>
                  <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                
                </p>
                
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
 