import ResumeUploadDialog from "@/app/(routes)/dashboard/_components/ResumeUploadDialog";
import React, { useState } from "react";

// Card background color based on score
function getCardBg(score: number) {
  if (score >= 90) return "bg-green-700/80 text-white";
  if (score >= 80) return "bg-green-500/80 text-white";
  if (score >= 70) return "bg-lime-400/80 text-black";
  if (score >= 60) return "bg-yellow-300/80 text-black";
  if (score >= 50) return "bg-yellow-400/80 text-black";
  if (score >= 40) return "bg-orange-400/80 text-white";
  if (score >= 30) return "bg-orange-600/80 text-white";
  if (score >= 20) return "bg-red-500/80 text-white";
  return "bg-red-800/90 text-white";
}

// Score badge color
function getScoreColor(score: number) {
  if (score >= 90) return "bg-green-900 text-white";
  if (score >= 80) return "bg-green-700 text-white";
  if (score >= 70) return "bg-lime-600 text-black";
  if (score >= 60) return "bg-yellow-600 text-black";
  if (score >= 50) return "bg-yellow-700 text-black";
  if (score >= 40) return "bg-orange-700 text-white";
  if (score >= 30) return "bg-orange-900 text-white";
  if (score >= 20) return "bg-red-700 text-white";
  return "bg-red-900 text-white";
}

// Helper to render section cards
const renderSection = (title: string, section: any, key: string) => (
  <div
    key={key}
    className={`rounded-lg shadow p-4 flex flex-col justify-between h-full transition-colors ${getCardBg(section?.score ?? 0)}`}
  >
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold text-base md:text-lg">{title}</span>
      <span
        className={`px-2 py-1 rounded text-xs md:text-sm font-bold transition-colors ${getScoreColor(section?.score ?? 0)}`}
      >
        {section?.score ?? "--"}/100
      </span>
    </div>
    <div className="text-sm md:text-base">{section?.comment}</div>
  </div>
);

function Report({ aiReport, hideDetails }: any) {
  const [openResumeUpload, setOpenResumeDialog] = useState(false);

  // Section-wise scores and overall score in a scrollable card
  return (
    <>
      <div className="relative h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Resume Analysis</h2>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition-colors"
            onClick={() => setOpenResumeDialog(true)}
          >
            Re-analyze
          </button>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden rounded-lg">
          <div className="flex-1 overflow-y-auto pr-1" style={{ maxHeight: "900px" }}>
            {/* Overall Score Card */}
            <div className={`mb-4 rounded-lg shadow p-6 flex flex-col items-center ${getCardBg(aiReport?.overall_score ?? 0)}`}>
              <div className="text-3xl md:text-4xl font-extrabold mb-2">
                {aiReport?.overall_score ?? "--"}/100
              </div>
              <div className="text-base md:text-lg font-semibold mb-1">Overall Score</div>
              <div className="text-center text-sm md:text-base">{aiReport?.overall_feedback}</div>
            </div>
            {/* Section-wise Cards in 2-column grid */}
            {aiReport?.sections && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(aiReport.sections).map(([key, section]: [string, any]) =>
                  renderSection(
                    key
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase()),
                    section,
                    key
                  )
                )}
              </div>
            )}
          </div>
        </div>
        <ResumeUploadDialog openResumeUpload={openResumeUpload} setOpenResumeDialog={setOpenResumeDialog} />
      </div>
      {/* Full-width report details below */}
      {!hideDetails && (
        <div className="mt-8 space-y-4">
          {aiReport?.whats_good?.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900/40 border-l-4 border-green-400 dark:border-green-600 rounded p-4 transition-colors w-full">
              <div className="font-semibold text-green-800 dark:text-green-200 mb-1">What's Good</div>
              <ul className="list-disc list-inside text-green-900 dark:text-green-100">
                {aiReport.whats_good.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {aiReport?.needs_improvement?.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/40 border-l-4 border-yellow-400 dark:border-yellow-600 rounded p-4 transition-colors w-full">
              <div className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Needs Improvement</div>
              <ul className="list-disc list-inside text-yellow-900 dark:text-yellow-100">
                {aiReport.needs_improvement.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {aiReport?.improvement_tips?.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 dark:border-blue-600 rounded p-4 transition-colors w-full">
              <div className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Improvement Tips</div>
              <ul className="list-disc list-inside text-blue-900 dark:text-blue-100">
                {aiReport.improvement_tips.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {aiReport?.summary_comment && (
            <div className="bg-gray-50 dark:bg-neutral-800 border-l-4 border-gray-400 dark:border-neutral-600 rounded p-4 transition-colors w-full">
              <div className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Summary</div>
              <div className="text-gray-700 dark:text-gray-100">{aiReport.summary_comment}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Report;
