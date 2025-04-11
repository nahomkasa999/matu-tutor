"use client";
import React, { useEffect, useState } from "react";

function SectionBuilder() {
  const courseId = "cm9bcf9x90006e2ylxxrda4fa";
  const [sections, setSections] = useState<Section[]>([
    { title: "", pdf: null, video: "", test: null, pdfUrl: "", testUrl: "" },
  ]);

  type Section = {
    title: string;
    pdf: File | null;
    video: string;
    test: File | null;
    pdfUrl: string;
    testUrl: string;
  };

  const handleSectionChange = (
    index: number,
    field: keyof Section,
    value: any
  ) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      { title: "", pdf: null, video: "", test: null, pdfUrl: "", testUrl: "" },
    ]);
  };

  const uploadToCloud = async (file: File, preset: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
    const res = await fetch("/api/pdf_upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.publicId;
  };
   
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const uploadedSections = await Promise.all(
        sections.map(async (section) => {
          let pdfUrl = section.pdfUrl;
          let testUrl = section.testUrl;
          
          if (section.pdf) pdfUrl = await uploadToCloud(section.pdf, "pdfs");
          if (section.test) testUrl = await uploadToCloud(section.test, "pdfs");
  
          return {
            title: section.title,
            pdf: pdfUrl,
            video: section.video,
            test: testUrl,
          };
        })
      );

    const payload = {
      courseId,
      sections: uploadedSections,
    };

    try {
      console.log("Payload: ", payload);
        const res = await fetch("/api/Create/Section", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            console.log("All sections created!");
        } else {
            console.error("Something went wrong");
        }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Section Builder</h1>
      <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit}>
        {sections.map((section, index) => (
          <div key={index} className="mb-6">
            <label className="mb-2">Section Title {index + 1}</label>
            <input
              type="text"
              value={section.title}
              onChange={(e) =>
                handleSectionChange(index, "title", e.target.value)
              }
              className="border border-gray-800 p-2 mb-4 w-full"
              required
            />
            <label className="mb-2">Section PDF</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                handleSectionChange(index, "pdf", e.target.files?.[0] || null)
              }
              className="border border-gray-800 p-2 mb-4 w-full"
            />
            <label className="mb-2">Section Video</label>
            <input
              type="text"
              value={section.video}
              onChange={(e) =>
                handleSectionChange(index, "video", e.target.value)
              }
              className="border border-gray-800 p-2 mb-4 w-full"
              required
            />
            <label className="mb-2">Section Test PDF</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                handleSectionChange(index, "test", e.target.files?.[0] || null)
              }
              className="border border-gray-800 p-2 mb-4 w-full"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mb-2"
        >
          Submit All Sections
        </button>
      </form>
      <button
        onClick={handleAddSection}
        className="bg-green-500 text-white p-2 rounded"
      >
        Add Section
      </button>
    </div>
  );
}

export default SectionBuilder;
