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

  // update
export const updateUserService = async (
    id: string,
    payload: Partial<User>
  ): Promise<User | null> => {
    const isExist = await getSingleUserService(id);
  
    if (!isExist) {
      throw new APIError(404, "User not found !");
    }
  
    const result = await prisma.user.update({
        where: {
            id
        },
        data: payload,
       
    });
    return result;
  };