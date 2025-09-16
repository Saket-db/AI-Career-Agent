"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import RoadmapCanvas from "./_components/RoadmapCanvas";
import RoadmapGeneratorDialog from "@/app/(routes)/dashboard/_components/RoadmapGeneratorDialog";
import { Loader2 } from "lucide-react";

function RoadmapGeneratorAgent() {
  const { roadmapid } = useParams();
  console.log("Roadmap ID: " + roadmapid);
  const [roadmapDetails, setRoadmapDetails] = useState<any>();
  const [openRoadmapGeneratorDialog, setOpenRoadmapGeneratorDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    roadmapid && GetRoadmapDetails();
  }, [roadmapid]);
  const GetRoadmapDetails = async () => {
    setLoading(true);
    const result = await axios.get("/api/history?recordId=" + roadmapid);
    console.log("Result2: " + result.data);
    setRoadmapDetails(result.data?.content);
    setLoading(false);
  };
  if (loading) {
    return (
      <div className="flex flex-1 min-h-[400px] items-center justify-center">
        <Loader2 className="animate-spin w-12 h-12 text-blue-600" />
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="border rounded-xl p-5">
          <h2 className="font-bold text-2xl">{roadmapDetails?.roadmapTitle}</h2>
          <p className="mt-3 text-gray-500">
            <strong>Description:</strong>:<br></br>
            {roadmapDetails?.description}
          </p>
          <h2 className="mt-5 font-medium text-blue-600">
            Duration: {roadmapDetails?.duration}
          </h2>
          <Button onClick={() => setOpenRoadmapGeneratorDialog(true)}   className="mt-5 w-full">Create Another Roadmap</Button>
        </div>
        <div className="md:grid-cols-2 w-full h-[80vh]">
          <RoadmapCanvas
            initialNodes={roadmapDetails?.initialNodes}
            initialEdges={roadmapDetails?.initialEdges}
          />
        </div>
        <RoadmapGeneratorDialog openDialog={openRoadmapGeneratorDialog} setOpenDialog={()=> setOpenRoadmapGeneratorDialog(false)}
        />
      </div>
    </>
  );
}

export default RoadmapGeneratorAgent;
