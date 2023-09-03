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
        throw new Error(`User with ID ${userId} not found.`);
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
      throw new Error('Failed to create the order.');
    }
  };
  