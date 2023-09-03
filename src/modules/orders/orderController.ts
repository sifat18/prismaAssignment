import { Request, RequestHandler, Response } from "express";

import catchAsync from "../../shared/catchAsync";
import reponseFormat from "../../shared/responseFormat";
import pick from "../../shared/pick";
import { Order } from "@prisma/client";
import { createOrderService, getAllOrders,  getOrdersByIdService, getOrdersByUser } from "./orderService";

// create
export const createOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...orderData } = req.body;
    const {userId}=req.user!
    const result = await createOrderService(orderData,userId);
   
    reponseFormat<Order>(res, {
      success: true,
      statusCode: 200,
      message: "Order created successfully",
      data: result,
    });
  }
);

// getorder
export const getOrders: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
        const {userId}=req.user!
        let result;
if(req.user?.role==='admin'){
     result = await getAllOrders();

}else{
     result = await getOrdersByUser(userId);
}

  
      reponseFormat<Order[]>(res, {
        statusCode: 200,
        success: true,
        message: "Orders retrieved successfully",
        data: result,
      });
    }
  );

// getorder
export const getOrdersbyId: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
    const {userId,role}=req.user!
const {orderId}=req.params
      const result = await getOrdersByIdService(userId,role,orderId);
  
      reponseFormat<Order>(res, {
        statusCode: 200,
        success: true,
        message: "Orders retrieved successfully",
        data: result,
      });
    }
  );