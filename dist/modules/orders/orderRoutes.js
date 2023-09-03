"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewears/auth"));
const orderController_1 = require("./orderController");
const router = express_1.default.Router();
router.post("/orders/create-order", (0, auth_1.default)("customer"), orderController_1.createOrder);
router.get("/orders", (0, auth_1.default)("admin", "customer"), orderController_1.getOrders);
router.get("/orders/:orderId", (0, auth_1.default)("admin", "customer"), orderController_1.getOrdersbyId);
exports.OrderRoutes = router;
