"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { UserRoutes } from "./modules/user/userRoutes";
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = require("./middlewears/globalErrorHandler");
const authRoutes_1 = require("./modules/auth/authRoutes");
const userRoutes_1 = require("./modules/users/userRoutes");
const categoryRoutes_1 = require("./modules/category/categoryRoutes");
const bookRoutes_1 = require("./modules/books/bookRoutes");
const orderRoutes_1 = require("./modules/orders/orderRoutes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", authRoutes_1.authRoutes);
app.use("/api/v1", userRoutes_1.UserRoutes);
app.use("/api/v1", categoryRoutes_1.CategoryRoutes);
app.use("/api/v1", bookRoutes_1.BookRoutes);
app.use("/api/v1", orderRoutes_1.OrderRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// error handler
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
