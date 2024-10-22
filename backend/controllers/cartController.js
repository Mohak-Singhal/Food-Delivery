import userModel from "../models/userModel.js";
// add to cart

const addToCart =async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);


        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        let cartData =await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]+=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({sucess:true,message:"Added to Cart"});

    } catch (error) {
        console.log(error);
        return res.json({success:false,message:`${error}`})
        
    }

}

//remover user cart data
const removeFromCart =async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData =await userData.cartData;
        if(cartData[req.body.itemId]){
            cartData[req.body.itemId]-=1;

        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({sucess:true,message:"Removed From Cart"});
        
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:`${error}`})
        
        
    }

}

// fetch user cart data
const getCart =async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData =await userData.cartData;
       
       
        res.json({sucess:true,cartData});
        
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:`${error}`})
        
        
    }

}
export{addToCart,removeFromCart,getCart}