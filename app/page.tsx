"use client";
import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Github, Loader2 } from "lucide-react";
import React, { useState } from "react";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const [showAbout, setShowAbout] = useState(false);
  const [loading, setLoading] = useState(false);

  // Optionally, you can show a loading spinner on initial mount or for async logic
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-horizon">
        <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-horizon transition-colors duration-700">
      {/* Navbar */}
      <header className="w-full px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-neutral-700 bg-white/80 dark:bg-[#23272f]/80 z-10">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="PrepAIre Logo" width={40} height={40} className="rounded-lg shadow-md" />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent tracking-tight animate-fade-in">
            PrepAIre
          </span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggleButton />
          {/* {user && <UserButton />} */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 animate-fade-in">
        <div className="max-w-2xl w-full text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent drop-shadow-lg animate-slide-down">
            Welcome to PrepAIre
          </h1>
          {/* Buttons below the heading */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6 animate-fade-in">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
              onClick={() => router.push("/dashboard")}
            >
              {user ? "Go to Dashboard" : "Get Started"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex items-center gap-2 px-8 py-3 border-2 border-blue-600 dark:border-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-[#232946] transition"
              onClick={() => window.open("https://github.com/Saket DB83/PrepAIre", "_blank")}
            >
              <Github className="w-5 h-5" />
              Learn More
            </Button>
          </div>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 animate-fade-in">
            Your all-in-one AI-powered career companion. Unlock your potential with:
          </p>
          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 animate-fade-in">
            <div className="rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-[#2a2e39] dark:to-[#3a3f4b] shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 backdrop-blur-md bg-opacity-80">
              <span className="text-blue-600 dark:text-blue-300 text-3xl mb-2">🧑‍💼</span>
              <h3 className="font-bold text-lg text-blue-700 dark:text-blue-200 mb-1">AI Career Agent</h3>
              <p className="text-gray-700 dark:text-gray-200 text-base">Personalized career advice and guidance.</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-[#2d273a] dark:to-[#4b3a5a] shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 backdrop-blur-md bg-opacity-80">
              <span className="text-purple-600 dark:text-purple-300 text-3xl mb-2">📄</span>
              <h3 className="font-bold text-lg text-purple-700 dark:text-purple-200 mb-1">Resume Analyzer</h3>
              <p className="text-gray-700 dark:text-gray-200 text-base">Instantly scan and improve your resume.</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-[#232946] dark:to-[#2d3142] shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 backdrop-blur-md bg-opacity-80">
              <span className="text-indigo-600 dark:text-indigo-300 text-3xl mb-2">🗺️</span>
              <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-200 mb-1">Career Roadmap Generator</h3>
              <p className="text-gray-700 dark:text-gray-200 text-base">Build a step-by-step plan for your dream job.</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-pink-100 to-pink-200 dark:from-[#3a273a] dark:to-[#4b3a4b] shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 backdrop-blur-md bg-opacity-80">
              <span className="text-pink-600 dark:text-pink-300 text-3xl mb-2">✉️</span>
              <h3 className="font-bold text-lg text-pink-700 dark:text-pink-200 mb-1">Cover Letter Generator</h3>
              <p className="text-gray-700 dark:text-gray-200 text-base">Create compelling cover letters in seconds.</p>
            </div>
            {/* Mock Interview Section */}
            <div className="rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#23272f] dark:to-[#3a3f4b] shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 backdrop-blur-md bg-opacity-80 col-span-1 sm:col-span-2">
              <span className="text-gray-700 dark:text-yellow-200 text-3xl mb-2">🎤</span>
              <h3 className="font-bold text-lg text-gray-800 dark:text-yellow-200 mb-1">Mock Interview <span className="text-xs bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 px-2 py-0.5 rounded ml-2">New</span></h3>
              <p className="text-gray-700 dark:text-gray-200 text-base">Practice interviews with AI and get instant feedback.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto py-6 px-4 bg-white/80 dark:bg-[#23272f]/80 border-t border-gray-200 dark:border-neutral-700 text-center animate-fade-in">
        <div className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 text-base">
          <Button
            variant="outline"
            className="mb-3 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-semibold"
            onClick={() => setShowAbout((v) => !v)}
          >
            About Creator
          </Button>
          {showAbout && (
            <div className="mt-3 animate-fade-in">
              <p>
                Hi, I&apos;m <span className="font-bold text-blue-600 dark:text-blue-400">Saket DB</span>, the creator of PrepAIre.<br />
                {/* The name <span className="font-bold text-violet-600 dark:text-violet-400">PrepAIre</span> is inspired by my own name – <span className="italic">Saket DB</span> – which means <span className="font-semibold">horizon</span> in English.<br /> */}
                PrepAIre is here to help you reach new heights in your career journey.
              </p>
              <div className="mt-3">
                <a
                  // href="https://github.com/Saket DB83/PrepAIre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline transition"
                >
                  <Github className="w-4 h-4" />
                  Visit PrepAIre on GitHub
                </a>
              </div>
            </div>
          )}
        </div>
      </footer>

      {/* Animations and improved dark theme */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 1s ease;
        }
        .animate-slide-down {
          animation: slide-down 1s cubic-bezier(0.4,0,0.2,1);
        }
        html.dark {
          background: linear-gradient(135deg, #23272f 0%, #232946 60%, #2d3142 100%);
        }
        body {
          background: none !important;
        }
      `}</style>
    </div>
  );
}