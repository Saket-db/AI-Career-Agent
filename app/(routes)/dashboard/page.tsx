"use client";
import React, { useEffect, useState } from "react";
import WelcomeBanner from './_components/WelcomeBanner';
import { useUser, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";

function CircularProgress({ value, max }: { value: number; max: number }) {
  const percent = Math.min((value / max) * 100, 100);
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="mx-auto block">
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#6366f1"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="1.2em"
        fill="#232946"
        className="dark:fill-gray-200"
      >
        {value}/{max}
      </text>
    </svg>
  );
}

function Dashboard() {
  const { user } = useUser();
  const { has } = useAuth();
  const router = useRouter();
  const [isPremium, setIsPremium] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Check premium status
  useEffect(() => {
    async function checkPremium() {
      //@ts-ignore
      const premium = await has?.({ plan: "premium" });
      setIsPremium(!!premium);
    }
    checkPremium();
  }, [has]);

  // Fetch today's history count
  useEffect(() => {
    async function fetchHistory() {
      setLoading(true);
      try {
        const result = await axios.get("/api/history");
        const today = new Date().toDateString();
        const count = (result.data || []).filter(
          (item: any) =>
            item.createdAt && new Date(item.createdAt).toDateString() === today
        ).length;
        setHistoryCount(count);
      } catch {
        setHistoryCount(0);
      }
      setLoading(false);
    }
    fetchHistory();
  }, []);

  const maxRequests = isPremium ? Infinity : 10;
  const limitReached = !isPremium && historyCount >= 10;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-horizon">
        <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-horizon transition-colors duration-700">
      <WelcomeBanner />
      <div className="mt-8 flex flex-col items-center gap-8 w-full">
        {/* Daily Usage Tracker */}
        <div className="w-full max-w-3xl mx-auto bg-white dark:bg-[#181c2a] rounded-xl shadow-md p-8 flex flex-col items-center">
          <h3 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-200">
            Daily Usage
          </h3>
          {!isPremium ? (
            <>
              <div className="mb-2">
                <CircularProgress value={historyCount} max={10} />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {limitReached
                  ? "Daily Limit Reached"
                  : `You have ${10 - historyCount} requests left today.`}
              </p>
              {limitReached && (
                <Button
                  className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold px-6 py-2 rounded-lg shadow hover:scale-105 transition mb-2"
                  onClick={() => router.push("/billing")}
                >
                  Go Premium
                </Button>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Want unlimited requests?{" "}
                <Button
                  variant="link"
                  className="text-blue-600 dark:text-blue-400 p-0 h-auto align-baseline"
                  onClick={() => router.push("/billing")}
                >
                  Upgrade to Premium
                </Button>
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-green-600 dark:text-green-400 font-semibold mb-2">
                Unlimited requests (Premium)
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                Requests made today: <span className="font-bold">{historyCount}</span>
              </p>
            </div>
          )}
        </div>
        {/* Explore AI Tools */}
        <div className="w-full max-w-3xl mx-auto bg-white dark:bg-[#181c2a] rounded-xl shadow-md p-8 flex flex-col items-center">
          <h3 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-200">
            Explore AI Tools
          </h3>
          <Button
            className="bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold px-8 py-3 rounded-lg shadow hover:scale-105 transition"
            onClick={() => router.push("/ai-tools")}
          >
            Get Started
          </Button>
        </div>
        {/* View History */}
        <div className="w-full max-w-3xl mx-auto bg-white dark:bg-[#181c2a] rounded-xl shadow-md p-8 flex flex-col items-center">
          <h3 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-200">
            Keep Track of Your History
          </h3>
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-3 rounded-lg shadow hover:scale-105 transition"
            onClick={() => router.push("/my-history")}
          >
            View History
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;