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
