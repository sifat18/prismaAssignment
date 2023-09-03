import express from "express";

import auth from "../../middlewears/auth";
import { createCategories } from "./categoryController";

const router = express.Router();
router.post("/categories/create-category", auth("admin"), createCategories);

export const CategoryRoutes = router;