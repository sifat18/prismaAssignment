"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByIdService = exports.getOrdersByUser = exports.getAllOrders = exports.createOrderService = void 0;
const APIError_1 = __importDefault(require("../../errorHelpers/APIError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
// creating book
const createOrderService = (order, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the user to ensure it exists
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new APIError_1.default(404, "User not found !");
        }
        // Create the order
        const result = yield prisma_1.default.order.create({
            data: {
                userId: user.id,
                orderedBooks: order.orderedBooks,
            },
        });
        return result;
    }
    catch (error) {
        console.error('Error creating order:', error);
        throw new APIError_1.default(404, "faield to create Order !");
    }
});
exports.createOrderService = createOrderService;
// getting all
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({});
    return result;
});
exports.getAllOrders = getAllOrders;
// getting all
const getOrdersByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        where: { userId: id },
    });
    return result;
});
exports.getOrdersByUser = getOrdersByUser;
// getting ID
const getOrdersByIdService = (userId, role, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    if (role === "admin") {
        result = yield prisma_1.default.order.findUnique({
            where: { id: orderId }
        });
    }
    else {
        result = yield prisma_1.default.order.findUnique({
            where: {
                userId: userId,
                id: orderId,
            },
        });
    }
    return result;
});
exports.getOrdersByIdService = getOrdersByIdService;
