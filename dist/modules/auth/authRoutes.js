"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("./authController");
const router = express_1.default.Router();
router.post("/auth/signup", authController_1.createUser);
router.post("/auth/signin", authController_1.loginUser);
router.post("/auth/refresh-token", authController_1.getRefreshToken);
exports.authRoutes = router;
