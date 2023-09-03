import { Request, RequestHandler, Response } from "express";

import catchAsync from "../../shared/catchAsync";
import reponseFormat from "../../shared/responseFormat";
import { Category } from "@prisma/client";
import {
  createCategoriesService,
  deleteCategoryService,
  getAllCategories,
  getCategoryService,
  updateCategoriesService,
} from "./categoryService";

// signup
export const createCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...categoriesData } = req.body;

    const result = await createCategoriesService(categoriesData);

    reponseFormat<Category>(res, {
      success: true,
      statusCode: 200,
      message: "Category created successfully !",
      data: result,
    });
  }
);

// all Category
export const getCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllCategories();

    reponseFormat<Category[]>(res, {
      statusCode: 200,
      success: true,
      message: "Categories fetched successfully",
      data: result,
    });
  }
);
// get 1
export const getCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await getCategoryService(id);

    reponseFormat<Category>(res, {
      statusCode: 200,
      success: true,
      message: "Category fetched successfully",
      data: result,
    });
  }
);

// update
export const updateCategories = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await updateCategoriesService(id, updatedData);

    reponseFormat<Category>(res, {
      statusCode: 200,
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  }
);

export const deleteCategories = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await deleteCategoryService(id);

    reponseFormat<Category>(res, {
      statusCode: 200,
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  }
);
