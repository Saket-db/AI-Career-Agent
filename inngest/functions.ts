import { gemini, openai } from "inngest";
import { inngest } from "./client";
import { createAgent, anthropic } from "@inngest/agent-kit";
import ImageKit from "imagekit";
import { create } from "domain";
import { parse } from "path";
import { HistoryTable } from "@/configs/schema";
import { db } from "@/configs/db";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const AiCareerChatAgent = createAgent({
  name: "HorizonAI",
  description:
    "An AI career coach agent that helps users with career advice, job search, and professional development.",
  system: `You are HorizonAI, an expert AI career coach and mentor. 
Your mission is to empower users to achieve their professional goals by providing clear, actionable, and personalized advice on career planning, job search strategies, resume and interview preparation, skill development, and navigating workplace challenges. 
Always ask clarifying questions if you need more context, and tailor your responses to the user's background, aspirations, and industry. 
Be supportive, encouraging, and honest—celebrate achievements, offer constructive feedback, and suggest practical next steps. 
If you are unsure about something, admit it and recommend reliable resources or strategies for further exploration. 
Keep your answers concise, insightful, and easy to follow, focusing on helping users make confident, informed decisions about their careers.`,
  model: gemini({
    model: "gemini-2.5-flash-lite-preview-06-17",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

export const AiResumeAnalyzerAgent = createAgent({
  name: "AiResumeAnalyzerAgent",
  description: "An AI agent that analyzes resumes and provides feedback.",
  system: `You are an advanced AI Resume Analyzer Agent.
Your task is to evaluate a candidate's resume and return a detailed analysis in the following structured JSON schema format.
The schema must match the layout and structure of a visual UI that includes overall score, section scores, summary feedback, improvement tips, strengths, and weaknesses. Sections should include whatever is there in the resume like contact info, experience, education, skills, achievements/certifications, extra curricular etc. If any section is missing, you can skip it in the report. But reduce overall scores if contact info, experience, education, or skills are missing. Also look for whitespaces, if there are many whitespaces, reduce the overall score. Ideal whitespace is 1-2 lines between sections and 1 line between bullet points. (25-35 percent whitespace is ideal).

Scoring Instructions:
- For each section present, assign a score out of 100 based on quality.
- The overall_score should be the average of all section scores included in the report.
- If any of the key sections (contact info, experience, education, skills) are missing, subtract 10 points per missing section from the average.
- If whitespace is not ideal, subtract up to 10 points from the overall score.
- The overall_score must always reflect the actual quality and completeness of the resume, and should not be a fixed or default value.

INPUT: I will provide a plain text resume.
GOAL: Output a JSON report as per the schema below. The report should reflect:
{
  "overall_score": 85,
  "overall_feedback": "Excellent!",
  "summary_comment": "Your resume is strong, but there are areas to refine.",
  "sections": {
    "contact_info": {
      "score": 95,
      "comment": "Perfectly structured and complete."
    },
    "experience": {
      "score": 88,
      "comment": "Strong bullet points and impact."
    },
    "education": {
      "score": 70,
      "comment": "Consider adding relevant coursework."
    },
    "skills": {
      "score": 60,
      "comment": "Expand on specific skill proficiencies."
    },
    "achievements": {
      "score": 80,
      "comment": "Good, but could use more quantifiable results."
    },
    "extra_curriculars": {
      "score": 75,
      "comment": "Good involvement, but could highlight leadership roles."
    },
  },
  "improvement_tips": [
    "Add more numbers and metrics to your experience section to show impact.",
    "Integrate more industry-specific keywords relevant to your target roles.",
    "Start bullet points with strong action verbs to make your achievements stand out."
  ],
  "whats_good": [
    "Clean and professional formatting.",
    "Clear and concise contact information.",
    "Relevant work experience."
  ],
  "needs_improvement": [
    "Skills section lacks detail",
    "Some experience bullet points could be stronger.",
    "Missing a professional summary/objective."
  ]
},

{
  "overall_score": 72,
  "overall_feedback": "Good, but missing key information.",
  "summary_comment": "Your resume is well-structured, but the education section is missing, which impacts your overall score.",
  "sections": {
    "contact_info": {
      "score": 90,
      "comment": "Well formatted."
    },
    "experience": {
      "score": 80,
      "comment": "Relevant experience listed."
    },
    "skills": {
      "score": 70,
      "comment": "Covers main skills, but could be more specific."
    },
    "achievements": {
      "score": 75,
      "comment": "Some achievements listed."
    }
  },
  "improvement_tips": [
    "Add an education section to provide a complete profile.",
    "Expand on your skills with more details.",
    "Include more quantifiable achievements."
  ],
  "whats_good": [
    "Professional formatting.",
    "Relevant work experience."
  ],
  "needs_improvement": [
    "Missing education section",
    "Skills section could be more detailed."
  ]
}
`,
  model: gemini({
    model: "gemini-2.5-flash-lite-preview-06-17",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

export const AiRoadmapGeneratorAgent = createAgent({
  name: "AiRoadmapGeneratorAgent",
  description:
    "An AI agent that generates personalized tree like flow career roadmaps.",
  system: `You are an advanced AI Roadmap Generator Agent.
Generate a React flow tree-structured learning roadmap for user input position/skills in the following format:
- Vertical tree structure with meaningful x/y positions to form a flow
- Structure should be similar to roadmap.sh layout
- Steps should be ordered from fundamentals to advanced
- Include branching for different specializations (if applicable)
- Each node must have a title, short description, and learning resource link
- Use unique IDs for all nodes and edges
- Make it more spacious node position
- Response in JSON format:

{
  roadmapTitle: '',
  description: <3-5 Lines>,
  duration: '',
  initialNodes: [
    {
      id: '1',
      type: 'turbo',
      position: { x: 0, y: 0 },
      data: {
        title: 'Step Title',
        description: 'Short two-line explanation of what the step covers.',
        link: 'Helpful link for learning this step',
      },
    },
    ...
  ],
  initialEdges: [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
    },
    ...
  ]
}

User Input Example: Frontend Developer`,
  model: gemini({
    model: "gemini-2.5-flash-lite-preview-06-17",
    apiKey: process.env.GEMINI_API_KEY,
  }),
});

export const AiCareerAgent = inngest.createFunction(
  { id: "ai-career-agent" },
  { event: "AiCareerAgent" },
  async ({ event, step }) => {
    const { userInput } = await event?.data;
    const result = await AiCareerChatAgent.run(userInput);
    return result;
  }
);

var imagekit = new ImageKit({
  //@ts-ignore
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  //@ts-ignore
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  //@ts-ignore
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL,
});

export const AiResumeAgent = inngest.createFunction(
  { id: "ai-resume-agent" },
  { event: "AiResumeAgent" },
  async ({ event, step }) => {
    const { recordId, base64ResumeFile, pdfText, aiAgentType, userEmail } =
      await event.data;
    
    // Check if PDF text is empty or too short
    if (!pdfText || pdfText.trim().length < 50) {
      const errorResponse = {
        overall_score: 0,
        overall_feedback: "Unable to analyze - document appears to be empty or unreadable",
        summary_comment: "The uploaded document could not be processed. Please ensure you upload a valid PDF resume with readable text content.",
        sections: {},
        improvement_tips: [
          "Upload a clear, text-based PDF resume",
          "Ensure the document is not image-only or corrupted",
          "Try converting your resume to a standard PDF format"
        ],
        whats_good: [],
        needs_improvement: [
          "Document could not be read or is empty"
        ]
      };
      
      const saveToDb = await step.run("SaveToDb", async () => {
        const result = await db.insert(HistoryTable).values({
          recordId: recordId,
          content: errorResponse,
          aiAgentType: aiAgentType,
          createdAt: new Date().toString(),
          userEmail: userEmail,
          metaData: "Error: Empty or unreadable document",
        });
        console.log("Saved error response to DB:", result);
        return errorResponse;
      });
      
      return errorResponse;
    }

    const uploadFileUrl = await step.run("uploadImage", async () => {
      const imageKitFile = await imagekit.upload({
        file: base64ResumeFile,
        fileName: `${Date.now()}.pdf`,
        isPublished: true,
      });
      return imageKitFile.url;
    });
    
    const aiResumeReport = await AiResumeAnalyzerAgent.run(pdfText);
    //@ts-ignore
    const rawContent = aiResumeReport.output[0]?.content;
    
    let parseJson;
    try {
      // Clean the raw content by removing markdown code blocks
      const rawContentJson = rawContent.replace(/```json\s*/g, "").replace(/```\s*/g, "");
      
      // Check if the content looks like JSON (starts with { and ends with })
      const trimmedContent = rawContentJson.trim();
      if (!trimmedContent.startsWith('{') || !trimmedContent.endsWith('}')) {
        throw new Error('Response is not in JSON format');
      }
      
      parseJson = JSON.parse(rawContentJson);
      
      // Validate that the parsed JSON has required fields
      if (!parseJson.overall_score && parseJson.overall_score !== 0) {
        throw new Error('Invalid JSON structure - missing overall_score');
      }
      
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      console.error("Raw content:", rawContent);
      
      // Create a fallback response when JSON parsing fails
      parseJson = {
        overall_score: 50,
        overall_feedback: "Analysis completed but response format error occurred",
        summary_comment: "The resume was processed but there was an issue formatting the detailed analysis. Please try uploading again or contact support if the issue persists.",
        sections: {
          general: {
            score: 50,
            comment: "Resume was processed but detailed analysis could not be generated due to a formatting error."
          }
        },
        improvement_tips: [
          "Try uploading the resume again",
          "Ensure the PDF is text-based and not an image",
          "Contact support if the issue continues"
        ],
        whats_good: [
          "Resume was successfully uploaded and processed"
        ],
        needs_improvement: [
          "Detailed analysis could not be completed due to processing error"
        ]
      };
    }

    const saveToDb = await step.run("SaveToDb", async () => {
      const result = await db.insert(HistoryTable).values({
        recordId: recordId,
        content: parseJson,
        aiAgentType: aiAgentType,
        createdAt: new Date().toString(),
        userEmail: userEmail,
        metaData: uploadFileUrl,
      });
      console.log("Saved to DB:", result);
      return parseJson;
    });
    
    return parseJson;
  }
);

export const AiRoadmapAgent = inngest.createFunction(
  { id: "ai-roadmap-agent" },
  { event: "AiRoadmapAgent" },
  async ({ event, step }) => {
    const { roadmapId, userInput, userEmail } = await event.data;
    const result = await AiRoadmapGeneratorAgent.run("User input" + userInput);

    //@ts-ignore
    const rawContent = result.output[0]?.content;
    const rawContentJson = rawContent.replace("```json", "").replace("```", "");
    const parseJson = JSON.parse(rawContentJson);

    const saveToDb = await step.run("SaveToDb", async () => {
      const result = await db.insert(HistoryTable).values({
        recordId: roadmapId,
        content: parseJson,
        aiAgentType: "/ai-tools/ai-roadmap-agent",
        createdAt: new Date().toString(),
        userEmail: userEmail,
        metaData: userInput,
      });
      console.log("Saved to DB:", result);
      return parseJson;
    });

    // Return the roadmap JSON so it becomes the Inngest run output
    return parseJson;
  }
);
