import APIError from "../../errorHelpers/APIError";
import {
    Book,
    Prisma,
} from '@prisma/client';
import prisma from "../../shared/prisma";

// creating user
export const createBookService = async (book: Book): Promise<Book | null> => {
 
    const result = await prisma.book.create({
        data: book,
    });
  if (!result) {
    throw new APIError(400, "failed to create book");
  }
  return result;
};