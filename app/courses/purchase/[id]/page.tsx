"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

const MathematicsCoursePayment = () => {
  const { id } = useParams();
  const courseId = id as string;

  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handlePayment = async () => {
    if (!transactionId.trim()) {
      setErrorMessage("Please enter a transaction number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, courseId }),
      });

      if (response.ok) {
        setSuccessMessage("Payment submitted successfully!");
        setTransactionId("");
      } else {
        const errText = await response.text();
        setErrorMessage(errText || "Failed to submit payment. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`h-[85vh] overflow-hidden rounded-2xl ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <Head>
        <title>Mathematics Applied I - Payment</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="flex flex-col md:flex-row min-h-screen p-5 rounded-xl">
        <div className="flex-1 p-5 relative">
          <h1 className="text-[50px] md:text-[70px] font-bold mb-8 leading-tight">
            Mathematics Applied I
          </h1>
          <div className="bg-yellow-100 text-black rounded-xl p-4 flex items-center justify-center w-32 h-12">
            <span>200 Birr</span>
          </div>
          <ul className="mt-16 space-y-4 text-[24px] md:text-[31px] ml-4">
            <li className="flex items-start"><span className="mr-3 font-bold">✓</span>100+ Video lessons by the professor</li>
            <li className="flex items-start"><span className="mr-3 font-bold">✓</span>Practice questions + solution videos & worksheets</li>
            <li className="flex items-start"><span className="mr-3 font-bold">✓</span>Focused only on exam-relevant content</li>
            <li className="flex items-start"><span className="mr-3 font-bold">✓</span>New worksheets for Mid & Final Exams</li>
            <li className="flex items-start"><span className="mr-3 font-bold">✓</span>Worksheets 90% similar to the real exam</li>
          </ul>
        </div>

        <div className={`flex-1 rounded-lg p-6 mt-5 md:mt-0 flex flex-col justify-center items-center max-w-md mx-auto ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
          <div className="flex flex-col items-center mb-10">
            <div className="w-64 h-64 bg-blue-100 mb-5 relative overflow-hidden">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  repeating-linear-gradient(to right, transparent 0, transparent 10px, #6b7dff 10px, #6b7dff 20px, transparent 20px, transparent 30px),
                  repeating-linear-gradient(to bottom, transparent 0, transparent 10px, #6b7dff 10px, #6b7dff 20px, transparent 20px, transparent 30px)
                `,
                backgroundSize: "80px 80px",
                backgroundPosition: "center center",
              }}></div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">Nahom Kasa</p>
              <p className="text-lg font-bold">0929333563</p>
            </div>
          </div>

          <div className="w-full">
            <input
              type="text"
              placeholder="Enter Transaction Number"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-2xl text-left text-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handlePayment}
              disabled={isSubmitting}
              className={`w-full ${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"} py-3 rounded-full font-bold text-lg transition duration-300`}
            >
              {isSubmitting ? "Submitting..." : "Submit Payment"}
            </button>
            {errorMessage && <p className="text-red-500 mt-4 text-center text-sm">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mt-4 text-center text-sm">{successMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathematicsCoursePayment;