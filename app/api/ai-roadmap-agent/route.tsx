import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req : NextRequest) {
  try {
    const {roadmapId, userInput} = await req.json();
    const user = await currentUser();
    const resultIds = await inngest.send({
        name: "AiRoadmapAgent",
        data: { userInput: userInput,
          roadmapId: roadmapId,
          userEmail: user?.primaryEmailAddress?.emailAddress
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
        if (runStatus?.data?.[0]?.status === "Cancelled") {
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
      // Defensive checks and logging
      console.log("Final runStatus:", JSON.stringify(runStatus, null, 2));
      const runData = runStatus?.data?.[0];
      if (!runData || !runData.output) {
        return NextResponse.json(
          { error: "No output found in Inngest run", runStatus },
          { status: 500 }
        );
      }
      const output = runData.output;
      let result;
      if (typeof output === "string") {
        try {
          result = JSON.parse(output);
        } catch {
          result = { result: output };
        }
      } else if (typeof output === "object" && output !== null) {
        result = output;
      } else {
        console.log(typeof output, output);
        result = {};
      }
      // Log output and result for debugging
      console.log("API output:", output);
      console.log("API result:", result);
      try {
        return NextResponse.json(result);
      } catch (e) {
        console.error("Serialization error:", e);
        return NextResponse.json(
          { error: "Output not serializable", details: String(e), output: result },
          { status: 500 }
        );
      }
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