import express from "express";

import auth from "../../middlewears/auth";
import { createOrder,getOrders } from "./orderController";

const router = express.Router();
router.post("/orders/create-order", auth("customer"), createOrder);
router.get("/orders", auth("admin"), getOrders);

export const OrderRoutes = router;