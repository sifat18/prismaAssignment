import express from "express";

import auth from "../../middlewears/auth";
import { createOrder } from "./orderController";

const router = express.Router();
router.post("/orders/create-order", auth("customer"), createOrder);

export const OrderRoutes = router;