import express from "express";

import auth from "../../middlewears/auth";
import { createBook,deleteBook,getBooks,getBooksbyCategory,getBooksbyId,updateBook } from "./bookController";

const router = express.Router();
router.post("/books/create-book", auth("admin"), createBook);
router.get("/books",getBooks);
router.get("/books",getBooks);
router.get("/books/:id",getBooksbyId);
router.patch("/books/:id", auth("admin"), updateBook);
router.delete("/books/:id", auth("admin"), deleteBook);

router.get("/books/:categoryId/category",getBooksbyCategory);
export const BookRoutes = router;