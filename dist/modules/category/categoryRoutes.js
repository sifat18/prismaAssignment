"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewears/auth"));
const categoryController_1 = require("./categoryController");
const router = express_1.default.Router();
router.post("/categories/create-category", (0, auth_1.default)("admin"), categoryController_1.createCategories);
router.get("/categories", categoryController_1.getCategories);
router.get("/categories/:id", categoryController_1.getCategory);
router.patch("/categories/:id", (0, auth_1.default)("admin"), categoryController_1.updateCategories);
router.delete("/categories/:id", (0, auth_1.default)("admin"), categoryController_1.deleteCategories);
exports.CategoryRoutes = router;
