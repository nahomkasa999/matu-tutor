import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: Request) {
    const {title, description, price} = await req.json();
    console.log("Title: ", title,   "Description: ", description, "Price: ", price);
    await prisma.$connect();
     
     await prisma.course.create({
        data: {
            title,
            description,
            price,
        }
     })
     await prisma.$disconnect();
    return  NextResponse.json({message: "Course Created"}, {status: 200});

}
export async function GET(req: Request) {
    await prisma.$connect();
     console.log("I got called")
     const courses = await prisma.course.findMany({});
     await prisma.$disconnect();
    return NextResponse.json(courses, {status: 200});

}