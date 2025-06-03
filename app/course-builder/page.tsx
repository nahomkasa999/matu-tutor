"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CourseBuilder() {
  const [courses, setCourses] = useState<{ id: string; title: string; description: string; price: number }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/Create/Course");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!courseTitle || !courseDescription || !coursePrice) {
      setMessage({ type: "error", text: "All fields are required." });
      return;
    }

    const courseData = {
      title: courseTitle,
      description: courseDescription,
      price: coursePrice,
    };

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/Create/Course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Course created successfully!" });
        setCourseTitle("");
        setCourseDescription("");
        setCoursePrice("");
        const updatedCourses = await response.json();
        setCourses((prevCourses) => [...prevCourses, updatedCourses]);
        setShowForm(false);
      } else {
        setMessage({ type: "error", text: "Failed to create the course. Please try again." });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6">Course Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
              <p className="text-lg mb-4">{course.description}</p>
              <p className="text-lg font-semibold">Price: {course.price} Birr</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <Link 
                href={`/course-builder/${course.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Add Sections
              </Link>
              <p className="text-sm text-gray-500">ID: {course.id}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mt-8 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-bold dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
      >
        {showForm ? "Cancel" : "Create Course"}
      </button>

      {showForm && (
        <div className="mt-8 w-full max-w-lg">
          <form
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8"
            onSubmit={handleSubmit}
          >
            {message && (
              <div
                className={`mb-4 p-3 rounded ${
                  message.type === "success"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="courseTitle"
                className="block text-lg font-medium mb-2 dark:text-gray-200"
              >
                Course Title
              </label>
              <input
                id="courseTitle"
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter course title"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="courseDescription"
                className="block text-lg font-medium mb-2 dark:text-gray-200"
              >
                Course Description
              </label>
              <textarea
                id="courseDescription"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter course description"
                rows={4}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="coursePrice"
                className="block text-lg font-medium mb-2 dark:text-gray-200"
              >
                Course Price (Birr)
              </label>
              <input
                id="coursePrice"
                type="number"
                value={coursePrice}
                onChange={(e) => setCoursePrice(Number(e.target.value))}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter course price"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg text-white font-bold transition-colors ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed dark:bg-gray-600"
                  : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
              }`}
            >
              {isSubmitting ? "Creating..." : "Create Course"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}