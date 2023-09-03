import { Request, RequestHandler, Response } from "express";

import catchAsync from "../../shared/catchAsync";
import reponseFormat from "../../shared/responseFormat";
import { Book } from "@prisma/client";
import { createBookService, getAllBooks, getBooksbyCategoryService } from "./bookService";
import pick from "../../shared/pick";
import { bookFilterableFields } from "./bookConstant";

// create
export const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...bookData } = req.body;

    const result = await createBookService(bookData);
   
    reponseFormat<Book>(res, {
      success: true,
      statusCode: 200,
      message: "Book created successfully",
      data: result,
    });
  }
);

// all books
export const getBooks: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const filters = pick(req.query, bookFilterableFields);
   
 const result = await getAllBooks(filters,options);
  
      reponseFormat<Book[]>(res, {
        statusCode: 200,
        success: true,
        message: "Books fetched successfully",
        meta: result.meta,
        data: result.data
      });
    }
  );
// all books
export const getBooksbyCategory: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const { categoryId } = req.params;
        const options = pick(req.query, ['limit', 'page']);
 const result = await getBooksbyCategoryService(categoryId,options);
  
      reponseFormat<Book[]>(res, {
        statusCode: 200,
        success: true,
        message: "Books with associated category data fetched successfully",
        meta: result.meta,
        data: result.data
      });
    }
  );