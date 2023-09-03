import express from "express";

import auth from "../../middlewears/auth";
import { createOrder,getOrders,getOrdersbyId } from "./orderController";

const router = express.Router();
router.post("/orders/create-order", auth("customer"), createOrder);

router.get("/orders", auth("admin","customer"), getOrders);
router.get("/orders/:orderId", auth("admin","customer"), getOrdersbyId);


export const OrderRoutes = router;