"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { AiToolsList } from "./AiToolList";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

function History() {
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetHistory();
  }, []);
  const GetHistory = async () => {
    setLoading(true);
    const result = await axios.get("/api/history");
    console.log("Result: " + result.data);
    setUserHistory(result.data);
    setLoading(false);
  };
  const GetAgentName = (path: string) => {
    const agent = AiToolsList.find((item) => item.path == path);
    return agent;
  };
  return (
    <div className="mt-5 p-5 border rounded-xl">
      <h2 className="font-bold text-lg">Previous History</h2>
      <p>Find your previous works here</p>
      {loading && (
        <div>
          {" "}
          {[1, 2, 3, 4, 5].map((item,index) => (
            <div key={item}>
              <Skeleton className="h-[50px] mt-4 w-full rounded-md" key={index} />
            </div>
          ))}{" "}
        </div>
      )}
      {userHistory?.length == 0 && !loading ? (
        <div className="flex items-center justify-center mt-5 flex-col">
          <Image src={"/bulb.png"} alt="bulb" width={50} height={50} />
          <h2>You do not have any history</h2>
          <Button variant="secondary" className="mt-5">
            Explore AI Tools
          </Button>
        </div>
      ) : (
        <div>
          {userHistory?.map((history: any, index: number) => {
            const agentData = GetAgentName(history?.aiAgentType);
            return (
              <Link
                href={history?.aiAgentType + "/" + history?.recordId}
                className="flex justify-between items-center space-y-6 border p-3 rounded-lg my-3"
                key={index}
              >
                <div className="flex gap-5">
                  <Image
                    src={agentData?.icon || "/default-icon.png"}
                    alt={"image"}
                    width={20}
                    height={20}
                  />
                  <h2>{agentData?.name || "Unknown Tool"}</h2>
                </div>
                <h2>{history.createdAt}</h2>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;
