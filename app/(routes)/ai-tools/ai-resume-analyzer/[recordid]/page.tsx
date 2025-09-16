"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Report from "./_components/Report";
import { Loader2 } from "lucide-react";

// Add a type for aiReport
type ResumeSection = {
  score: number;
  comment: string;
};
type AiReport = {
  overall_score?: number;
  overall_feedback?: string;
  summary_comment?: string;
  sections?: Record<string, ResumeSection>;
  improvement_tips?: string[];
  whats_good?: string[];
  needs_improvement?: string[];
};

function AiResumeAnalyzer() {
  const { recordid } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string | undefined>();
  const [aiReport, setAiReport] = useState<AiReport | undefined>();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    recordid && GetResumeAnalyzerRecord();
  }, [recordid]);

  const GetResumeAnalyzerRecord = async () => {
    setLoading(true);
    const result = await axios.get("/api/history?recordId=" + recordid);
    console.log(result.data);

    const metaData = result.data?.metaData;

    // Check if metaData contains an error message
    if (metaData && metaData.startsWith("Error:")) {
      setErrorMessage(metaData);
      setPdfUrl(undefined);
    } else {
      setPdfUrl(metaData);
      setErrorMessage(undefined);
    }

    setAiReport(result.data?.content);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex flex-1 min-h-[600px] items-center justify-center">
        <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <div className="h-[1000px]">
          <Report aiReport={aiReport} pdfUrl={pdfUrl} hideDetails />
        </div>
        <div className="h-[1000px]">
          <h2 className="font-bold text-2xl mb-5">Resume Preview</h2>
          {errorMessage ? (
            <div className="border rounded-lg p-8 h-[950px] flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20">
              <div className="text-center">
                <div className="text-6xl mb-4">❌</div>
                <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">
                  Document Processing Error
                </h3>
                <p className="text-red-600 dark:text-red-400 max-w-md">
                  {errorMessage}
                </p>
                <div className="mt-4 text-sm text-red-500 dark:text-red-400">
                  Please upload a valid PDF resume with readable text content.
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={pdfUrl + "#toolbar=0&navpanes=0&scrollbar=0"}
              width={"100%"}
              height={950}
              className="min-w-lg rounded-lg border"
              style={{ border: "none" }}
            />
          )}
        </div>
      </div>
      {/* Full-width report details below */}
      <div className="mt-8 space-y-4">
        {aiReport?.whats_good && aiReport.whats_good.length > 0 && (
          <div className="bg-green-50 dark:bg-green-900/40 border-l-4 border-green-400 dark:border-green-600 rounded p-4 transition-colors w-full">
            <div className="font-semibold text-green-800 dark:text-green-200 mb-1">
              What's Good
            </div>
            <ul className="list-disc list-inside text-green-900 dark:text-green-100">
              {aiReport.whats_good.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {aiReport?.needs_improvement && aiReport.needs_improvement.length > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/40 border-l-4 border-yellow-400 dark:border-yellow-600 rounded p-4 transition-colors w-full">
            <div className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
              Needs Improvement
            </div>
            <ul className="list-disc list-inside text-yellow-900 dark:text-yellow-100">
              {aiReport.needs_improvement.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {aiReport?.improvement_tips && aiReport.improvement_tips.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-400 dark:border-blue-600 rounded p-4 transition-colors w-full">
            <div className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
              Improvement Tips
            </div>
            <ul className="list-disc list-inside text-blue-900 dark:text-blue-100">
              {aiReport.improvement_tips.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {aiReport?.summary_comment && (
          <div className="bg-gray-50 dark:bg-neutral-800 border-l-4 border-gray-400 dark:border-neutral-600 rounded p-4 transition-colors w-full">
            <div className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
              Summary
            </div>
            <div className="text-gray-700 dark:text-gray-100">
              {aiReport.summary_comment}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AiResumeAnalyzer;
