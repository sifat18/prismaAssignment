import APIError from "../../errorHelpers/APIError";
import {
    Order,
    Prisma,
} from '@prisma/client';
import prisma from "../../shared/prisma";


// creating book
export const createOrderService = async (order: Order, userId: string): Promise<Order | null> => {
    try {
      // Fetch the user to ensure it exists
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
  
      if (!user) {
        throw new APIError(404, "User not found !");
      }
  
      // Create the order
      const result = await prisma.order.create({
        data: {
          userId: user.id,
          orderedBooks: order.orderedBooks!, 
        },
      });
  
      return result;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new APIError(404, "faield to create Order !");
    }
  };
  
  // getting all
export const getAllOrders = async (): Promise<Order[] | null> => {
    const result = await prisma.order.findMany({  });
  return result;
}
  // getting all
export const getOrdersByUser = async (id:string): Promise<Order[] | null> => {
    const result = await prisma.order.findMany({ 
      where:  {userId:id},
     });
  return result;
}
  // getting ID
export const getOrdersByIdService = async (userId:string,role:string,orderId:string): Promise<Order | null> => {
    let result
if(role==="admin"){
    result= await prisma.order.findUnique({
      where: { id:orderId}
    })
}else{
    result=await prisma.order.findUnique({
        where: {
          userId: userId,
          id: orderId, 
        },
      });
}


  return result;
}
