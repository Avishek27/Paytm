import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransactions(amount: number,provider: string){
      const session = await getServerSession(authOptions);

      const userId = session?.user?.id;
      if(!userId){
        return ({
            message: "Unauthenticated request",
        })
      };
      const token = (Math.random()*100).toString();
      await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            token: token,
            amount: amount*100,
            status: "Processing",
            provider,
            startTime: new Date(),
        }
      });
      
      return ({
        message: "On ramp transaction is created"
      });

}