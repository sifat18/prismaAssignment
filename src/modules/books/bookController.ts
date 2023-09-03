import { Request, RequestHandler, Response } from "express";

import catchAsync from "../../shared/catchAsync";
import reponseFormat from "../../shared/responseFormat";
import { Book } from "@prisma/client";
import { createBookService } from "./bookService";

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