import mongoose from "mongoose";
 
export const connectDB = async() =>{
    await mongoose.connect("mongodb+srv://mohaksinghal516:GGf6cy8mdr37RYIZ@cluster0.xyawi.mongodb.net/food-del").then(()=>console.log("DB COnnected"));
}