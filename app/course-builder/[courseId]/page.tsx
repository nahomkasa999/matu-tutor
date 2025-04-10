"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import cloudinary from "cloudinary"

function sectionBuilder() {
  const courseId = "cm9bcf9x90006e2ylxxrda4fa";
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionPdf, setSectionPdf] = useState<File | null>(null);
  const [sectionVideo, setSectionVideo] = useState("");
  const [sectionTest, setSectionTest] = useState<File | null>(null);

  // sectionpdfurl and sectiontesturl
  const [sectionPdfUrl, setSectionPdfUrl] = useState("");
  const [sectionTestUrl, setSectionTestUrl] = useState("");

  //number of section tracter
  const [sectionNumber, setSectionNumber] = useState(0);

  //handling the section addition
  const handleSectionAddtion = () => {
    setSectionNumber(sectionNumber + 1);
    console.log(sectionNumber);
  };

  //handling form submistion to cloudinary
  useEffect(() => {
    const uploadFiles = async () => {
      if (sectionPdf) {
        const formData = new FormData();
        formData.append("file", sectionPdf);
        formData.append("upload_preset", "pdfs");

        try {
          const response = await fetch(
            "/api/pdf_upload",
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
          setSectionPdfUrl(data.publicId);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };

    uploadFiles();
  }, [sectionPdf]);
 
  
  useEffect(() => {
    const uploadFiles = async () => {
      if (sectionPdf) {
        const formData = new FormData();
        formData.append("file", sectionPdf);
        formData.append("upload_preset", "pdfs");

        try {
          const response = await fetch(
            "/api/pdf_upload",
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
          setSectionTestUrl(data.publicId);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };

    uploadFiles();
  }, [sectionTest]);


  //handling the form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const sectionData = {
        title: sectionTitle,
        pdf: sectionPdfUrl,
        video: sectionVideo,
        test: sectionTestUrl,
        courseId: courseId,
        };


    
        try {
        const response = await fetch("/api/Create/Section", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(sectionData),
        });
    
        if (response.ok) {
            console.log("Section created successfully");
        } else {
            console.error("Error creating section");
        }
        } catch (error) {
        console.error("Error:", error);
        }
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Section Builder</h1>
      <form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit}>
        {/* map through the number of sections and create a form for each section */}
        {Array.from({ length: sectionNumber }).map((_, index) => (
          <>
            <label className="mb-2">Section Title: {index}</label>
            <input
              type="text"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="border border-gray-800 p-2 mb-4"
              required
            />
            <label className="mb-2">Section PDF:</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSectionPdf(e.target.files[0]);
                //   setSectionPdfExist(true);
                }
              }}
              className="border border-gray-800 p-2 mb-4"
            />
            <label className="mb-2">Section Video:</label>
            <input
              type="text"
              value={sectionVideo}
              onChange={(e) => setSectionVideo(e.target.value)}
              className="border border-gray-800 p-2 mb-4"
                required
            />
            <label className="mb-2">Section Test:</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSectionTest(e.target.files[0]);
                //   setSectionTestExist(true);
                }
              }}
              className="border border-gray-800 p-2 mb-4"
            />
          </>
        ))}

        <button type="submit" className="bg-blue-500 text-black p-2 rounded">
          Create Section
        </button>
      </form>

      {/* number of quesiton adder */}
      <button
        type="submit"
        onClick={handleSectionAddtion}
        className="bg-blue-300 text-black p-2 rounded"
      >
        {" "}
        add section
      </button>
    </div>
  );
}

export default sectionBuilder;
