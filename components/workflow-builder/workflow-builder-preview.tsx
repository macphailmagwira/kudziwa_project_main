'use client'

import React, { useMemo } from 'react'
import {ReactFlow} from '@xyflow/react';
import  {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  EdgeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import { Database, Filter, ArrowLeftRight, BarChart2, Table, FileSpreadsheet, Workflow, Code } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import WorkflowNode from './workflow-node'
import AnimatedEdge from './animated-edge'
import { iconMap } from './icon-maps';

interface WorkflowData {
  nodes: {
    id: string
    type: string
    label: string
    icon: string
    description: string
    position: {
      x: number
      y: number
    }
  }[]
  edges: {
    source: string
    target: string
  }[]
  workflowDescription: string
}

interface WorkflowBuilderProps {
  data: WorkflowData
  isModal?: boolean
}

const nodeTypes: NodeTypes = {
  workflowNode: WorkflowNode,
}

const edgeTypes: EdgeTypes = {
  animated: AnimatedEdge,
}


export default function WorkflowBuilder({ data, isModal = false }: WorkflowBuilderProps) {
  const nodes: Node[] = useMemo(() => {
    return data.nodes.map((node) => ({
      id: node.id,
      type: 'workflowNode',
      position: node.position,
      data: { ...node, icon: iconMap[node.icon] },
    }))
  }, [data.nodes])

  const edges: Edge[] = useMemo(() => {
    return data.edges.map((edge, index) => ({
      id: `e${index}`,
      source: edge.source,
      target: edge.target,
      type: 'animated',
      animated: true,
    }))
  }, [data.edges])

  return (
    <div className={`bg-gray-50 ${isModal ? 'h-full' : 'h-screen'}`}>
      <div className="h-full flex flex-col">
        <ScrollArea className="flex-grow">
          <div className={`${isModal ? 'h-[60vh]' : 'h-[calc(100vh-8rem)]'}`}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              
            >
              <Background />
              <Controls />
            
            </ReactFlow>
          </div>
        </ScrollArea>
        <div className="bg-white p-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Workflow Description</h3>
          <p className="text-sm text-gray-600">{data.workflowDescription}</p>
        </div>
      </div>
    </div>
  )
}

