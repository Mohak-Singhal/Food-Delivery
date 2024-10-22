import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//placing order for from frontend
const placeorder = async (req, res) => {

    const fronent_url= "http://localhost:5173/"
  try {
    const newOrder = new orderModel({
      userId: response.body.userId,
      items: response.body.items,
      amount: response.body.amount,
      address: response.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(response.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 83,
      },
      quantity: item.quantity,
    }));
    line-items.push({
        price_data:{
            currency:"inr",
            product_data:{
                 name:"Delivery Charges"
            },
            unit_amount:2*100
        },
        quantity:1,
    })

    const session =await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url:`${fronent_url}/verify?sucess=true&orderId=${newOrder._id}`,
        cancel_url:`${fronent_url}/verify?sucess=false&orderId=${newOrder._id}`,
       
    })
    res.json({success:true,session_url:session.url})


  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: `${error}` });
  }
};

const verifyOrder =async(req,res)=>{
    const {orderId,sucess}=req.body;
    try {
        if (success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            return res.json({ success: false, message: "Paid" });

    

    


        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            return res.json({ success: false, message: `Not paid` });

        }
    } catch (error) {
        console.log(error);
    return res.json({ success: false, message: `${error}` });
        
    }

}

//user order for frontend
const userOrders = async (req,res)=>{
    try {
        const orders= await orderModel.find({userId:req.body.userId})
        return res.json({ success: true, data:orders });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: `${error}` });
        
    }

}

export { placeorder,verifyOrder,userOrders };
