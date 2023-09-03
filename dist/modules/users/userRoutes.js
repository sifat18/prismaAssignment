"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("./userController");
const auth_1 = __importDefault(require("../../middlewears/auth"));
const router = express_1.default.Router();
router.get("/users", (0, auth_1.default)("admin"), userController_1.getAllUser);
router.get("/users/:id", (0, auth_1.default)("admin"), userController_1.getSingleUser);
router.patch("/users/:id", (0, auth_1.default)("admin"), userController_1.updateUser);
router.delete("/users/:id", (0, auth_1.default)("admin"), userController_1.deleteUser);
router.get("/profile", (0, auth_1.default)("admin", "customer"), userController_1.getProfile);
exports.UserRoutes = router;
