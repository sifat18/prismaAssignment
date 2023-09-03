import express from "express";

import auth from "../../middlewears/auth";
import { createBook } from "./bookController";

const router = express.Router();
router.post("/books/create-book", auth("admin"), createBook);

export const BookRoutes = router;