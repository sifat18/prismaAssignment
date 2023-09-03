import { Request, RequestHandler, Response } from "express";

import catchAsync from "../../shared/catchAsync";
import reponseFormat from "../../shared/responseFormat";
import { Category } from "@prisma/client";
import { createCategoriesService } from "./categoryService";

// signup
export const createCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...categoriesData } = req.body;
console.log('in')
console.log({categoriesData})
    const result = await createCategoriesService(categoriesData);
   
    reponseFormat<Category>(res, {
      success: true,
      statusCode: 200,
      message: "Category created successfully !",
      data: result,
    });
  }
);