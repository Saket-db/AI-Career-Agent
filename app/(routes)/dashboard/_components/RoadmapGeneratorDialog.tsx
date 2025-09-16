import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose, // <-- import DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, SparkleIcon } from "lucide-react";
import axios from "axios";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

function RoadmapGeneratorDialog({ openDialog, setOpenDialog }: any) {
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { has } = useAuth();
  const GenerateRoadmap = async () => {
    const roadmapId = v4();
    console.log("Roadmap ID: " + roadmapId);
    setLoading(true);
    try {
      //@ts-ignore
      const hasSubscription = await has({ plan: "premium" });
      console.log("Has subscription: ", hasSubscription);
    if (!hasSubscription) {
      const resultHistory = await axios.get("/api/history");
      const historyList = resultHistory.data;
      const isPresent = await historyList.find(
        (item: any) => item?.aiAgentType == "/ai-tools/ai-roadmap-agent"
      );
      router.push("billing");
      if (isPresent) {
        return null;
      }
    }
      const result = await axios.post("/api/ai-roadmap-agent", {
        roadmapId: roadmapId,
        userInput: userInput,
      });
      console.log("Result: "+result.data);
      router.push("/ai-tools/ai-roadmap-agent/" + roadmapId);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Position/Skills to Generate Roadmap</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-2">
                <Input
                  placeholder="Enter your desired position or skills"
                  onChange={(e) => setUserInput(e?.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button onClick={GenerateRoadmap} disabled={loading || !userInput}>
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <SparkleIcon />
              )}
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RoadmapGeneratorDialog;
