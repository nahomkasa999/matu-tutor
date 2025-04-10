import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, pdf, video, test, courseId } = await req.json();

  console.log("Title: ", title, "PDF: ", pdf, "Video: ", video, "Test: ", test, "CourseId: ", courseId);

  await prisma.$connect();

  // Step 1: Create the section and associate related PDFs, videos, and tests
  const section = await prisma.section.create({
    data: {
      title,
      course: {
        connect: {
          id: courseId,
        },
      },
      pdfs: {
        create: {
          title: `${title} PDF`, // You can customize the title
          cloudinaryUrl: pdf,    // Assuming pdf is a URL
        },
      },
      videos: {
        create: {
          title: `${title} Video`, // You can customize the title
          cloudinaryUrl: video,    // Assuming video is a URL
        },
      },
      test: {
        create: {
          title: `${title} Test`,  // You can customize the title
          questions: test,         // Assuming test is a string containing the questions
        },
      },
    },
  });

  await prisma.$disconnect();

  console.log("Section created with ID: ", section.id);
  return NextResponse.json({ message: "Course Created" }, { status: 200 });
}
