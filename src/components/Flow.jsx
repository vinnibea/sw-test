import React from "react";
import { useShallow } from "zustand/react/shallow";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import useStore from "../stores/store";
import selector from "../stores/selector";

//flow itself
function Flow({ viewId }) {
  const { nodes, edges } = useStore(useShallow(selector));

  return <ReactFlow nodes={nodes[viewId]} edges={edges[viewId]} fitView />;
}

export default Flow;
