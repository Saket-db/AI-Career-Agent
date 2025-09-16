import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "@/inngest/client";
import axios from "axios";
import { currentUser } from "@clerk/nextjs/server";

async function getRuns(runId: String) {
  try {
    const url =
      process.env.INNGEST_SERVER_HOST + "/v1/events/" + runId + "/runs";
    console.log("Calling getRuns with URL:", url);
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
      },
    });
    console.log("getRuns result:", result.data);
    return result.data;
  } catch (error: any) {
    console.error("Error in getRuns:", error);
    return {
      error:
        typeof error === "object" && error !== null && "message" in error
          ? (error as any).message
          : String(error),
    };
  }
}

export async function POST(req: NextRequest) {
  try {
    const FormData = await req.formData();
    const resumeFile: any = FormData.get("resumeFile");
    const recordId = FormData.get("recordId");
    const user = await currentUser();
    const loader = new WebPDFLoader(resumeFile);
    const docs = await loader.load();
    console.log(docs[0]);
    // Process the PDF data as needed
    const arrayBuffer = await resumeFile.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const resultIds = await inngest.send({
      name: "AiResumeAgent",
      data: {
        recordId: recordId,
        base64ResumeFile: base64,
        pdfText: docs[0]?.pageContent,
        aiAgentType: "/ai-tools/ai-resume-analyzer",
        userEmail: user?.primaryEmailAddress?.emailAddress,
      },
    });
    console.log("Result IDs from inngest.send:", resultIds);
    const runId = resultIds?.ids?.[0];
    console.log("Run ID:", runId);

    if (!runId) {
      return NextResponse.json(
        { error: "No runId returned from inngest.send" },
        { status: 500 }
      );
    }

    let runStatus;
    let attempts = 0;
    const maxAttempts = 40; // 20 seconds max
    while (attempts < maxAttempts) {
      runStatus = await getRuns(runId);
      console.log("Run status:", runStatus);
      if (runStatus?.data?.[0]?.status === "Completed") {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      attempts++;
    }
    if (attempts === maxAttempts) {
      return NextResponse.json(
        { error: "Timeout waiting for run to complete" },
        { status: 500 }
      );
    }

    // Fix the output extraction to handle the actual structure
    const runData = runStatus?.data?.[0];
    if (!runData || !runData.output) {
      return NextResponse.json(
        { error: "No output found in run" },
        { status: 500 }
      );
    }

    // The output is directly in runData.output, not nested in output[0]
    const output = runData.output;

    return NextResponse.json(
      typeof output === "object" && output !== null
        ? output
        : { result: output ?? null }
    );
  } catch (error: any) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      {
        error:
          typeof error === "object" && error !== null && "message" in error
            ? (error as any).message
            : String(error),
      },
      { status: 500 }
    );
  }
}
