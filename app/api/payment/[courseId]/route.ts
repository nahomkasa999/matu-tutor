import { NextRequest, NextResponse } from "next/server";
import prisma  from "@/lib/prisma"
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest, { params }: { params: { courseId: string } }) {
  //const clerkid  = getAuth(req).userId

 
  const clerkId  =  "user_2vUN28EOwM8R8yUdgdgru0bUIw4";
  const userIdobject = await prisma.user.findFirst({
    where: {clerkId: clerkId},
    select:{
        id: true,
    }
  }) 
  const userId = userIdobject?.id
 
  if (!userId) return new Response("Unauthorized", { status: 401 })

  const { transactionId } = await req.json()
  const {courseId} = await params

  const course = await prisma.course.findUnique({
    where: { id: courseId },
  })

  

  const user = await prisma.user.findUnique({ where: { id  : userId } });
if (!user) {
  return Response.json({ error: 'User not found' }, { status: 404 });
}

console.log(user)

  if (!course) return new Response("Course not found", { status: 404 })

  const transaction = await prisma.transaction.findUnique({
    where: { transactionId },
  })


  if (!transaction) {
    return new Response("Transaction not found. Please wait a few minutes for it to sync.", {
      status: 404,
    })
  }

  if (transaction.used) {
    return new Response("This transaction has already been used.", { status: 400 })
  }

  if (transaction.transactionAmount < course.price) {
    return new Response("Insufficient payment for this course.", { status: 400 })
  }

  const existingEnrollment = await prisma.enrollment.findFirst({
    where: {
      userId,
      courseId,
    },
  })
  if (existingEnrollment) {
    return new Response("You are already enrolled in this course.", { status: 400 })
  }

// //   // Mark transaction as used
try {
    await prisma.transaction.update({
      where: { transactionId },
      data: {
        used: true,
        usedById: userId,
        courseId: courseId,
      },
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return new Response("Failed to update transaction", { status: 500 });
  }

  // Create enrollment

  if (!existingEnrollment) {
    await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
      },
    })
  }

  return new Response("Enrollment successful", { status: 200 })
}


export async function GET(req: NextRequest) {
    const {userId} = getAuth(req)
    console.log(userId)
}