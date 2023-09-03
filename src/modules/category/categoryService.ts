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
// getAll
export const getAllCategories = async (): Promise<Category | null> => {
 
    const result = await prisma.category.findMany({  });
    return result;
};
// get 1
export const getCategoryService = async (id:string): Promise<Category | null> => {
 
    const result = await prisma.category.findUnique({
        where: {
        id:id
    },
include:{
    Book:true
}
});
    return result;
};

  // update
  export const updateCategoriesService = async (
    id: string,
    payload: Category
  ): Promise<Category | null> => {
    const isExist = await getCategoryService(id);
  
    if (!isExist) {
      throw new APIError(404, "Category not found !");
    }
  
    const result = await prisma.category.update({
        where: {
            id
        },
        data: payload,
       
    });
    return result;
  };
