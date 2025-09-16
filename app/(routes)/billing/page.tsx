"use client"; 
import React, { Suspense, useState } from 'react'
import { PricingTable } from '@clerk/nextjs'
import { Loader2 } from "lucide-react";


function Billing() {
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
      <h2 className='font-bold text-3xl text-center'>Choose Your Plan</h2>
      <p className='text-lg text-center'>Select a subscription bundle to get all AI Tools Access</p>
      <div>
        <Suspense
          fallback={
            <div className="flex flex-1 min-h-[200px] items-center justify-center">
              <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
            </div>
          }
        >
          <PricingTable/>
        </Suspense>
      </div>
    </div>
  )
}

export default Billing