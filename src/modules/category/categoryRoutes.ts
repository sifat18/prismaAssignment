import express from "express";

import auth from "../../middlewears/auth";
import { createCategories,getCategories,getCategory,updateCategories } from "./categoryController";

const router = express.Router();
router.post("/categories/create-category", auth("admin"), createCategories);
router.get("/categories",getCategories);
router.get("/categories/:id",getCategory);
router.patch("/categories/:id", auth("admin"), updateCategories);

export const CategoryRoutes = router;