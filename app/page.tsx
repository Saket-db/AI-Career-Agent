"use client";
import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Github, Loader2, ArrowRight, Briefcase, FileText, Map, Mail, Mic } from "lucide-react";
import React, { useState } from "react";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const [showAbout, setShowAbout] = useState(false);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navbar */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            HorizonAI
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggleButton />
          {user && <UserButton />}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Your AI Career Companion
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Streamline your job search with intelligent tools for resume optimization, 
              interview preparation, and career planning.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              onClick={() => router.push("/dashboard")}
            >
              {user ? "Go to Dashboard" : "Get Started"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors"
              onClick={() => window.open("https://github.com/Saket-db/AI-Career-Agent", "_blank")}
            >
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Career Agent</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Get personalized career advice and guidance tailored to your goals.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Resume Analyzer</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Instantly analyze and optimize your resume for better results.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Map className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Career Roadmap</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Create step-by-step plans to reach your dream career.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Cover Letter Generator</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Generate compelling cover letters in seconds.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">Mock Interview</h3>
                <span className="text-xs bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 px-2 py-1 rounded-full font-medium">New</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Practice interviews with AI and get instant feedback.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <Button
            variant="ghost"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
            onClick={() => setShowAbout((v) => !v)}
          >
            About the Creator
          </Button>
          
          {showAbout && (
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3 animate-in slide-in-from-top-2 duration-200">
              <p>
                Created by <span className="font-medium text-gray-900 dark:text-white">Saket DB</span>
              </p>
              <p>
                HorizonAI is designed to help you reach new heights in your career journey 
                with the power of artificial intelligence.
              </p>
              <a
                href="https://github.com/Saket-db/AI-Career-Agent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}