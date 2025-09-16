import { inngest } from "@/inngest/client";
import axios from "axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { run } from "node:test";
import { resolve } from "path";

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

export async function POST(req: any) {
  try {
    const { userInput } = await req.json();
    console.log("Received userInput:", userInput);

    const resultIds = await inngest.send({
      name: "AiCareerAgent",
      data: { userInput: userInput },
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
    return NextResponse.json(runStatus.data?.[0].output?.output[0]);
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
