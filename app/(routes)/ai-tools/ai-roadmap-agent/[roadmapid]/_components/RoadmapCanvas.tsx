import React from "react";
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import TurboNode from "./TurboNode";

const nodeTypes = {
  turbo:TurboNode,
};

function RoadmapCanvas({initialNodes, initialEdges}: any) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes}>
        <Controls />
        <MiniMap />
        {/*@ts-ignore */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default RoadmapCanvas;
