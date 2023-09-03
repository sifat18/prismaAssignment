import express from "express";

import auth from "../../middlewears/auth";
import { createBook,getBooks } from "./bookController";

const router = express.Router();
router.post("/books/create-book", auth("admin"), createBook);
router.get("/books",getBooks);
export const BookRoutes = router;