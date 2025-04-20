import React from "react";
import prisma from "@/lib/prisma";

async function SectionDisplayer() {
  await prisma.$connect();

  const sections = await prisma.section.findMany({
    where: {
      courseId: "cm9bcf9x90006e2ylxxrda4fa",
    },
    include: {
      pdfs: true,
      videos: true,
      test: true,
    },
  });

  return (
    /// displaying the sections
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-2xl font-bold mb-4">Sections</h1>
      <div className="flex flex-col w-full max-w-md">
        {sections.map((section) => (
          <div key={section.id} className="border border-gray-800 p-2 mb-4">
            <h2 className="text-xl font-bold">{section.title}</h2>
            <p>
              PDF: {section.pdfs.map((pdf) => pdf.cloudinaryUrl).join(", ")}
            </p>
            <p>
              Video:{" "}
              {section.videos.map((video) => video.cloudinaryUrl).join(", ")}
            </p>
            <p>Test: {section.test?.questions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionDisplayer;
