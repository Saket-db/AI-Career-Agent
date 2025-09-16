import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import { File, Loader2Icon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

function ResumeUploadDialog({ openResumeUpload, setOpenResumeUpload }: any) {
  const [file, setFile] = useState<any>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { has } = useAuth();
  const onFileChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const onUploadAndAnalyze = async () => {
    setLoading(true);
    const recordId = uuidv4();
    const formData = new FormData();
    formData.append("recordId", recordId);
    formData.append("resumeFile", file);
    //@ts-ignore
    const hasSubscription = await has({ plan: "premium" });
    console.log("Has subscription: ", hasSubscription);
    if (!hasSubscription) {
      const resultHistory = await axios.get("/api/history");
      const historyList = resultHistory.data;
      const isPresent = await historyList.find(
        (item: any) => item?.aiAgentType == "/ai-tools/ai-resume-analyzer"
      );
      router.push("billing");
      if (isPresent) {
        setLoading(false);
        return null;
      }
    }
    const result = await axios.post("/api/ai-resume-agent", formData);
    setLoading(false);
    router.push("/ai-tools/ai-resume-analyzer/" + recordId);
    setOpenResumeUpload(false);
  };

  return (
    <Dialog open={openResumeUpload} onOpenChange={setOpenResumeUpload}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload resume pdf file</DialogTitle>
          <DialogDescription>
            Upload your resume as a PDF file for instant AI analysis.
          </DialogDescription>
        </DialogHeader>
        <label
          htmlFor="resumeUpload"
          className="flex items-center flex-col justify-center p-7 border border-dashed rounded-xl hover:bg-slate-200 cursor-pointer"
        >
          <File className="h-10 w-10" />
          {file ? (
            <span className="mt-3 text-blue-600">{file?.name}</span>
          ) : (
            <span className="mt-3">Click here to upload resume</span>
          )}
        </label>
        <input
          type="file"
          id="resumeUpload"
          accept="application/pdf"
          className="hidden"
          onChange={onFileChange}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={!file || loading} onClick={onUploadAndAnalyze}>
            {loading ? <Loader2Icon className="animate-spin" /> : <Sparkles />}{" "}
            Upload & Analyze
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ResumeUploadDialog;
