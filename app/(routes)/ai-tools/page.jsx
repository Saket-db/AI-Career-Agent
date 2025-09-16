"use client"; 
import React, { Suspense, useState } from 'react'
import AiToolList from './../dashboard/_components/AiToolList'
import { Loader2 } from "lucide-react";
function AiTools() {
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
          <div className="flex flex-1 min-h-[400px] items-center justify-center">
            <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
          </div>
        }
      >
        <AiToolList />
      </Suspense>
    </div>
  )
}

export default AiTools