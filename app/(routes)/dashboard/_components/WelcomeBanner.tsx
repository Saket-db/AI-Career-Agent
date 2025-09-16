import React from 'react'
import { useUser } from "@clerk/nextjs";

function WelcomeBanner() {
  const { user } = useUser();
  return (
    <div className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-xl p-8 shadow-lg text-white mb-8">
      <h2 className="text-3xl font-bold mb-2">
        Welcome{user?.firstName ? `, ${user.firstName}` : ""}!
      </h2>
      <p className="text-lg font-medium">
        PrepAIre is your personalized AI career coach agent. Get tailored career roadmaps, expert advice, and resume scans designed just for you. Take the next step in your career journey with confidence and clarity.
      </p>
    </div>
  )
}

export default WelcomeBanner