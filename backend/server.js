import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import "dotenv/config.js"

// App configuration
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());
//db connection
connectDB();
//api endpoints
app.use("/api/food", foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)

// Routes
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
//mongodb+srv://reactapp:<password>@cluster0.7caqbeq.mongodb.net/?
