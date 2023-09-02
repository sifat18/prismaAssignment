import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import {
  getAllUserService, getSingleUserService,
} from "./userService";
import reponseFormat from "../../shared/responseFormat";
import { User } from "@prisma/client";

// all user
export const getAllUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getAllUserService();

    reponseFormat<Partial<User[]>>(res, {
      statusCode: 200,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  }
);

// single user
export const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
  console.log({id})
    const result = await getSingleUserService(id);
  
    reponseFormat<Partial<User>>(res, {
      statusCode: 200,
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  });
  