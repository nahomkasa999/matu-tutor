"use client";
import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b-3 border-gray-950 dark:border-gray-700">
      <Link href="/">
        <span className={`text-3xl font-bold font-lato ${theme === "light" ? "text-black" : "text-white"}`}>
          Matu Tutor
        </span>
      </Link>

      <div className="flex items-center gap-10">
        <nav className="flex gap-6 text-xl font-medium">
          <Link href="/#pricing" className="hover:text-gray-600 transition-colors">Pricing</Link>
          <SignedIn>
            <Link href="/Home" className="hover:text-gray-600 transition-colors">My Courses</Link>
            <Link href="/course-builder" className="hover:text-gray-600 transition-colors">Course Builder</Link>
          </SignedIn>
        </nav>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleTheme}
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg transition-all duration-300 hover:scale-110"
          >
            {theme === "light" ? (
              <Moon className="h-6 w-6 text-gray-800" />
            ) : (
              <Sun className="h-6 w-6 text-yellow-400" />
            )}
          </button>

          <SignedOut>
            <div className="flex items-center gap-4">
              <SignInButton mode="modal">
                <button className="text-xl hover:text-gray-600 transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="border-3 border-black dark:border-white w-20 h-10 text-xl rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="w-12 h-12 bg-cover flex items-center justify-center rounded-full">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-12 h-12",
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

export default Navbar;