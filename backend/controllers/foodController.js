import foodModel from "../models/foodModel.js"
import fs from "fs"



//add food 
const addFood = async (req, res) => {

    // let image_filename = `${req.file.filename}`;

   

    const food = new foodModel ({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        // image:image_filename
    })
    try {
        await food.save();
        res.json({sucess:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({sucess:false,message:"Error"})
        
    }


}
//all food list
const listFood =async (req,res)=>{
    try {
        const foods = await foodModel.find({})
        res.json({sucess:true,data:foods})
    } catch (error) {
        console.log('error');
        res.json({sucess:false,message:"Error"})
        
    }

}
//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Respond with the food details before deletion (if necessary)
        res.json({ success: true, message: `Food found: ${food.name}` });

        // Delete the food item
        await foodModel.findByIdAndDelete(req.body.id);
        console.log(`Food with ID ${req.body.id} deleted`);

    } catch (error) {
        console.error('Error removing food:', error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
};




export { addFood ,listFood,removeFood}
