"use client";
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const pointsFail = [
  {
    icon: <XCircle className="text-red-500 w-5 h-5" />,
    title: "Campus Isn’t Built for Studying",
    description:
      "Campus is full of distraction — math needs focus, and you don’t get it here.",
  },
  {
    icon: <XCircle className="text-red-500 w-5 h-5" />,
    title: "Everyone Starts Too Late",
    description:
      "90% of students begin studying only a week before the exam (source: AAU survey 2023).",
  },
  {
    icon: <XCircle className="text-red-500 w-5 h-5" />,
    title: "The Materials Are Wrong",
    description:
      "You’re solving basic YouTube questions — exams are way harder.",
  },
  {
    icon: <XCircle className="text-red-500 w-5 h-5" />,
    title: "You’re on Your Own",
    description:
      "Most professors don’t invest time to help you deeply understand the course.",
  },
  {
    icon: <XCircle className="text-red-500 w-5 h-5" />,
    title: "Class Lectures Miss the Point",
    description: "Classes often don’t reflect what’s asked in real exams.",
  },
];

const pointsWin = [
  {
    icon: <CheckCircle className="text-green-500 w-5 h-5" />,
    title: "Built for Busy Students",
    description:
      "I know campus life — this course is designed so you can pass even if you start late.",
  },
  {
    icon: <CheckCircle className="text-green-500 w-5 h-5" />,
    title: "Designed for Last-Minute Study",
    description:
      "Learn everything you need in a few days, with prioritized, exam-focused content.",
  },
  {
    icon: <CheckCircle className="text-green-500 w-5 h-5" />,
    title: "Real Exam Questions",
    description: "Includes only questions modeled after AAU exams — no filler.",
  },
  {
    icon: <CheckCircle className="text-green-500 w-5 h-5" />,
    title: "Exam-Focused Lessons",
    description:
      "Every module is tuned to what actually appears in your department’s exams.",
  },
  {
    icon: <CheckCircle className="text-green-500 w-5 h-5" />,
    title: "You’re Not Alone",
    description:
      "This isn’t just video lessons — I’ll guide you like a private tutor with a mission: your A+.",
  },
];

export default function Benefits() {
  return (
   <section className="flex flex-col gap-10 mt-10 p-10 items-center justify-center">
    <h1 className="text-[68px] font-extrabold leading-none mt-30 ]">Why Students Fail Math</h1>
    <div className="border-3 border-red-300 p-10 rounded-xl h-[98vh] w-[40%]">
        {pointsFail.map((point, index) => (
            <div key={index} className="flex items-center gap-9 mb-4 text-2xl">
            ❌ 
            <div>
                <h2 className="text-[31px] font-bold">{point.title}</h2>
                <p className="text-gray-600 text-[25px] text-justify w-[90%]">{point.description}</p>
            </div>
            </div>
        ))}
    </div>
    <div className="flex flex-col gap-10 mt-10 p-10 items-center justify-center">
        <h1 className="text-[68px] font-extrabold leading-none mt-30 mb-9 text-center w-[60%]">This Isn’t Just a Course. It’s Your Shortcut to an A+.</h1>
        <div className="border-3 border-green-300 p-12 items-center justify-center rounded-xl h-[98vh] w-[45%]">
            {pointsWin.map((point, index) => (
                <div key={index} className="flex items-center gap-9 mb-4 text-2xl">
                ✅
                <div>
                    <h2 className="text-[31px] font-bold">{point.title}</h2>
                    <p className="text-gray-600 text-[25px] text-justify w-[90%]">{point.description}</p>
                </div>
                </div>
            ))}
        </div>
    </div>

   </section>
  );
}
