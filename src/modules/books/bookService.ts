import APIError from "../../errorHelpers/APIError";
import {
    Book,
    Prisma,
} from '@prisma/client';
import prisma from "../../shared/prisma";
import { IGenericResponse } from "../../interfaces/error";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelpers } from "../../shared/paginationHelpers";
import { IBookFilterRequest,  bookRelationalFields,  bookRelationalFieldsMapper,  bookSearchableFields } from "./bookConstant";

// creating book
export const createBookService = async (book: Book): Promise<Book | null> => {
 
    const result = await prisma.book.create({
        data: book,
        include:{
            category:true
        },
    });
  if (!result) {
    throw new APIError(400, "failed to create book");
  }
  return result;
};


// getAll
export const getAllBooks = async (
    filters: IBookFilterRequest,
    options: IPaginationOptions
  ): Promise<IGenericResponse<Book[]>> => {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(options);
    const { search, maxPrice, minPrice,category, ...filterData } = filters;
  
    const andConditions = [];
  
    if (search) {
        andConditions.push({
            OR: bookSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive'
                }
            }))
        });
    }
  
    if (minPrice !== undefined) {
      andConditions.push({
        price: {
          gte: parseFloat(minPrice.toString()),
        },
      });
    }
  
    if (maxPrice !== undefined) {
      andConditions.push({
        price: {
          lte: parseFloat(maxPrice.toString()),
        },
      });
    }

    if (category) {
        // Include the category filter if it exists
        andConditions.push({
            categoryId: category, // Change this to match your Prisma schema
        });
    }
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.keys(filterData).map((key) => {
          if (bookRelationalFields.includes(key)) {
            return {
              [bookRelationalFieldsMapper[key]]: {
                id: (filterData as any)[key],
              },
            };
          } else if (bookSearchableFields.includes(key)) {
            return {
              [key]: {
                contains: (filterData as any)[key],
                mode: 'insensitive',
              },
            };
          } else {
            return {
              [key]: {
                equals: (filterData as any)[key],
              },
            };
          }
        }),
      });
    }
  
    const whereConditions: Prisma.BookWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};
  
    const result = await prisma.book.findMany({
      include: {
        category: true,
      },
      skip,
      take: Number(limit),
      orderBy: {
        [sortBy]: sortOrder,
      },
      where: whereConditions,
    });
  
    const total = await prisma.book.count({
      where: whereConditions,
    });
  const totalPages = Math.ceil(total / Number(limit));
    return {
      meta: {
        total,
        page,
        limit,
        totalPages
        
      },
      data: result,
    };
  };

// get by category
export const getBooksbyCategoryService = async (
  id:string,
  options: IPaginationOptions
  ): Promise<IGenericResponse<Book[]>> => {
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
    const andConditions = [];
  
    
    if (id) {
        // Include the category filter if it exists
        andConditions.push({
            categoryId: id, // Change this to match your Prisma schema
        });
    }
    
  
    const whereConditions: Prisma.BookWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};
  
    const result = await prisma.book.findMany({
      include: {
        category: true,
      },
      skip,
      take: Number(limit),
    
      where: whereConditions,
    });
  
    const total = await prisma.book.count({
      where: whereConditions,
    });
  const totalPages = Math.ceil(total / Number(limit));
    return {
      meta: {
        total,
        page,
        limit,
        totalPages
        
      },
      data: result,
    };
  };