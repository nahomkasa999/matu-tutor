"use client";
import { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function SectionDisplayer() {
  const [sections, setSections] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<any | null>(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const fetchSections = async () => {
    try {
      const res = await fetch("/api/Create/Section");
      const data = await res.json();
      setSections(data);
    } catch (err) {
      console.error("Failed to fetch sections:", err);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleSectionClick = (section: any) => {
    setActiveSection(section);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-80 p-4 border-r border-gray-500 backdrop-blur-md overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Course Sections</h2>
        <div className="space-y-4">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`w-full text-left font-semibold text-lg p-2 rounded-lg ${
                activeSection?.id === section.id ? "bg-blue-800" : "hover:bg-gray-900 hover:text-white"
              }`}
              onClick={() => handleSectionClick(section)}
            >
              {section.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto flex flex-col items-center justify-center">
        {activeSection ? (
          <div className="w-full max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">{activeSection.title}</h1>

            {/* Videos */}
            {activeSection.videos?.map((video: any) => (
              <div key={video.id} className="aspect-video w-full mb-6">
                <iframe
                  src={convertToEmbed(video.cloudinaryUrl)}
                  className="w-full h-full rounded-xl"
                  allowFullScreen
                />
              </div>
            ))}

            {/* PDFs */}
            {activeSection.pdfs?.map((pdf: any) => (
              <div key={pdf.id} className="mb-6">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={pdf.cloudinaryUrl}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </div>
            ))}

            {/* Test */}
            {activeSection.test && (
              <a
                href={`http://res.cloudinary.com/dzimvdwb2/raw/upload/${activeSection.test.questions}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block underline text-blue-600"
              >
                🧪 {activeSection.test.title}
              </a>
            )}
          </div>
        ) : (
          <h1 className="text-2xl font-bold text-center">Click a section to start learning</h1>
        )}
      </main>
    </div>
  );
}

function convertToEmbed(url: string): string {
  if (url.includes("youtu")) {
    const videoId = new URL(url).searchParams.get("v");
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    const id = url.split("/").pop()?.split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
}