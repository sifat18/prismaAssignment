import express from "express";

import auth from "../../middlewears/auth";
import { createCategories,getCategories,getCategory,updateCategories,deleteCategories } from "./categoryController";

const router = express.Router();
router.post("/categories/create-category", auth("admin"), createCategories);
router.get("/categories",getCategories);
router.get("/categories/:id",getCategory);
router.patch("/categories/:id", auth("admin"), updateCategories);
router.delete("/categories/:id", auth("admin"), deleteCategories);

export const CategoryRoutes = router;