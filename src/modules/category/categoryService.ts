import APIError from "../../errorHelpers/APIError";
import {
    Prisma, Category,
} from '@prisma/client';
import prisma from "../../shared/prisma";

// creating user
export const createCategoriesService = async (category: Category): Promise<Category | null> => {
 
    const result = await prisma.category.create({
        data: category,
    });
  if (!result) {
    throw new APIError(400, "failed to create category");
  }
  return result;
};