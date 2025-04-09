import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const connnect = await prisma.$connect();
     
     await prisma.course.create({
        data: {
            title: "Applied Mathematics 2",
            description: "Course Description",
            price: 200,
        }
     })
     await prisma.$disconnect();
    return new Response("Course created", { status: 200 });

}