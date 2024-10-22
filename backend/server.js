import "dotenv/config.js"
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/CartRoute.js";
import ordrderRouter from "./routes/OrderRoute.js";


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
app.use("/api/cart",cartRouter)
app.use("/api/order",ordrderRouter)


// Routes
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
