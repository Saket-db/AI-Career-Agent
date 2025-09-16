"use client"; 
import React, { Suspense, useState } from 'react'
import { UserProfile } from '@clerk/nextjs'
import { Loader2 } from "lucide-react";

function Profile() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-horizon">
        <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-horizon transition-colors duration-700">
      <Suspense
        fallback={
          <div className="flex flex-1 min-h-[200px] items-center justify-center">
            <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
          </div>
        }
      >
        <UserProfile/>
      </Suspense>
    </div>
  )
}

export default Profile
