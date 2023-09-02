import APIError from "../../errorHelpers/APIError";
import bcrypt from "bcrypt";
import config from "../../config";
import {
    Prisma, User,
} from '@prisma/client';
import prisma from "../../shared/prisma";

// getting all
export const getAllUserService = async (): Promise<User[] | null> => {
    const allUsers = await prisma.user.findMany({  });
    const result = allUsers.map(({password,...rest}) => {
  return rest;
})

return result;
}

// single
export const getSingleUserService = async (
    id: string
  ): Promise<Partial<User> | null> => {
    const user = await prisma.user.findUnique({
        where: {
            id:id
        }
    });
    const {password,...rest} = user;
    return rest;
  };