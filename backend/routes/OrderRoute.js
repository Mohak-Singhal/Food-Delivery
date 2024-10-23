import express from "express"; 
import authMiddleware from "../middleware/auth.js";
import { listOrders, placeorder, updateStatus, userOrders, verifyOrder } from "../controllers/orderController.js";
  

const ordrderRouter =express.Router();

ordrderRouter.post("/place",authMiddleware,placeorder);
ordrderRouter.post("/verify",verifyOrder);
ordrderRouter.post("/userorders",authMiddleware,userOrders);
ordrderRouter.get("/list",listOrders);
ordrderRouter.post("/status",updateStatus);

export default ordrderRouter 