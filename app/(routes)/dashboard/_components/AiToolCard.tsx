"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ResumeUploadDialog from "./ResumeUploadDialog";
import RoadmapGeneratorDialog from "./RoadmapGeneratorDialog";
export interface TOOL {
  name: string;
  desc: string;
  icon: string;
  button: string;
  path: string;
}

type AiToolProps = {
  tool: TOOL & { disabled?: boolean };
};

function AiToolCard({ tool }: AiToolProps) {
  const id = uuidv4();
  const { user } = useUser();
  const router = useRouter();
  const [openResumeUpload, setOpenResumeUpload] = useState(false);
  const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false);
  const onClickButton = async () => {
    if (tool.disabled) return;
    if (tool.name === "AI Resume Analyzer") {
      setOpenResumeUpload(true);
      return;
    }
    if (tool.path === "/ai-tools/ai-roadmap-agent") {
      setOpenRoadmapDialog(true);
      return;
    }
    const result = await axios.post("/api/history", {
      recordId: id,
      content: [],
      aiAgentType: tool.path,
    });
    console.log(result);
    router.push(tool.path + "/" + id);
  };
  return (
    <div className="p-3 border rounded-lg ">
      <div className="flex justify-center items-center mb-2">
        <Image
          src={tool.icon}
          alt={tool.name}
          width={100}
          height={100}
          className="mx-auto"
        />
      </div>
      <h2 className="font-bold mt-2">{tool.name}</h2>
      <p className="text-gray-400">{tool.desc}</p>
      <Button
        variant={"secondary"}
        className="w-full mt-3"
        onClick={onClickButton}
        disabled={tool.disabled}
      >
        {tool.button}
      </Button>
      <ResumeUploadDialog
        openResumeUpload={openResumeUpload}
        setOpenResumeUpload={setOpenResumeUpload}
      />
      <RoadmapGeneratorDialog
        openDialog={openRoadmapDialog}
        setOpenDialog={setOpenRoadmapDialog}
      />
    </div>
  );
}

export default AiToolCard;
