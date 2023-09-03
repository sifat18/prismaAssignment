import express from "express";

import auth from "../../middlewears/auth";
import { createBook,getBooks,getBooksbyCategory } from "./bookController";

const router = express.Router();
router.post("/books/create-book", auth("admin"), createBook);
router.get("/books",getBooks);
router.get("/books/:categoryId/category",getBooksbyCategory);
export const BookRoutes = router;