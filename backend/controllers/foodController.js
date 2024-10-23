import foodModel from "../models/foodModel.js"
import fs from "fs"



//add food 


// add food 
const addFood = async (req, res) => {
    try {
        // Check if the file was uploaded by multer
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image upload failed, no file provided" });
        }

        // Access the file's filename
        const image_filename = req.file.filename; // This will work if multer correctly processed the file

        // Create a new food item and assign the image filename
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename // Store the filename in the database
        });

        // Save the food item to the database
        await food.save();
        res.json({ success: true, message: "Food Added" });

    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};


//all food list
const listFood =async (req,res)=>{
    try {
        const foods = await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log('error');
        res.json({success:false,message:"Error"})
        
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
