import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import {
  deleteUserService,
  getAllUserService,
  getSingleUserService,
  updateUserService,
} from "./userService";
import { User } from "@prisma/client";
import { reponseFormat } from "../../shared/responseFormat";

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
  const result = await getSingleUserService(id);

  reponseFormat<Partial<User>>(res, {
    statusCode: 200,
    success: true,
    message: "User getched successfully",
    data: result,
  });
});

// update
export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const result = await updateUserService(id, updatedData);

  reponseFormat<User>(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await deleteUserService(id);

  reponseFormat<{}>(res, {
    statusCode: 200,
    success: true,
    message: "Uers deleted successfully",
    data: {},
  });
});

// single user profile
export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user!;
  const result = await getSingleUserService(userId);

  reponseFormat<Partial<User>>(res, {
    statusCode: 200,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});
