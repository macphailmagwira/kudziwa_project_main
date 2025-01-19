'use client'

import React, { useMemo ,useState, useCallback } from 'react'
import{ ReactFlow, 
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
  NodeTypes,
  EdgeTypes,
  Panel,BackgroundVariant 
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { RotateCcw,Save} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import WorkflowNode from './workflow-node'
import AnimatedEdge from './animated-edge'
import DraggableNodeConfigPanel from './node-config-panel'
import { iconMap } from './icon-maps'
import WorkFlowExecutionButton from '../buttons/workflow-generation'
import NodeCategoriesPanel from './node-categories-panel'
import { nodes as nodeCategories } from '@/lib/node-categories'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { v4 as uuidv4 } from 'uuid';



interface NodeData extends Record<string, unknown> {
  label: string
  icon: React.ReactNode
  type: 'source' | 'filter' | 'transform' | 'aggregate'
  config?: {
    sourceUrl?: string
    filterCondition?: string
    transformFunction?: string
    aggregateFunction?: string
  }
}

const nodeTypes: NodeTypes = {
  workflowNode: WorkflowNode,
}

const edgeTypes: EdgeTypes = {
  animated: AnimatedEdge,
}




interface Workflow {
  id?: string
  name: string
  nodes: Node[]
  edges: Edge[]
  workflowDescription: string
  createdAt?: string
  updatedAt?: string
  userId?: string
}


type CustomNode = Node<NodeData>;




export default function DataPipelineBuilder({loadWorkflows, data, workflowName,workflowDescription}) {

console.log('Here is the data coming in', data);

  const nodesInput: Node[] = useMemo(() => {
    return data?.nodes.map((node) => ({
      id: node.id,
      type: 'workflowNode',
      position: node.position,
      data: { ...node, icon: iconMap[node.icon] },
    }))
  }, [data?.nodes])
  
 

  const edgesInput: Edge[] = useMemo(() => {
    return data?.edges.map((edge, index) => ({
      id: `e${index}`,
      source: edge.source,
      target: edge.target,
      type: 'animated',
      animated: true,
    }))
  }, [data?.edges])

  console.log('Here is the data coming out', nodesInput,edgesInput);



  const [nodes, setNodes, onNodesChange] = useNodesState(nodesInput ? nodesInput: [])
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesInput ? edgesInput: [])
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const [isSaving, setIsSaving] = useState(false);





  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const getIconNameFromReactElement = (iconElement: any): string | null => {
    // If no icon, return null
    if (!iconElement) return null;
    
    // Find the matching icon name by comparing component types
    const iconEntry = Object.entries(iconMap).find(([_, value]) => {
      const elementType = (iconElement.type as any)?.render || iconElement.type;
      const valueType = (value as any)?.type?.render || (value as any)?.type;
      return elementType === valueType;
    });
    
    return iconEntry ? iconEntry[0] : null;
  };
  
  


  const prepareWorkflowData = (
    workflowName: string,
    nodes: Node[],
    edges: Edge[],
    workflowDescription: string,
    existingWorkflow: Workflow 
  ) => {
   
    console.log('Here is whats happening at preparation', existingWorkflow);

    const newWorkflow = {
      name: workflowName,
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        icon: getIconNameFromReactElement(node.data.icon),
        label: node.data.label,
        position: node.position,
        description: node.data.description
      })),
      edges: edges.map(edge => ({
        id: edge.id || `edge-${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target
      })),
      workflowDescription,
    };
  
    // If updating, include the existing ID and timestamps
    if (existingWorkflow?.id) {
      return {
        ...newWorkflow,
        id: existingWorkflow.id,
        };
    }
  
    // For new workflows, let Prisma handle ID and timestamps
    return newWorkflow;
  };

  const handleReset = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setIsResetDialogOpen(false);
  }, [setNodes, setEdges]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    ));
  }, [setNodes, setEdges]);


  const onConnect = useCallback((params: Edge | Connection) => {
    const newEdge = { ...params, type: 'animated', animated: true }
    setEdges((eds) => addEdge(newEdge, eds))
  }, [setEdges])


  const findNodeDescription = (type: string,nodes: any): string => {
    for (const category of nodes) {
      const node = category.nodes.find(n => n.type === type);
      if (node?.description) {
        return node.description;
      }
    }
    return 'No description available';
  };

  const addNode = (type: string, label: string, icon: any) => {
    const newNode: Node = {
      id: uuidv4(),
      type: 'workflowNode',
      data: { 
        label: label,
        icon: iconMap[icon], 
        type: type,
        description: findNodeDescription (type,nodeCategories)
      },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as any)
  }

  const updateNodeData = (id: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = { ...node.data, ...newData }
        }
        return node
      })
    )
  }

  
  const handleSave = async () => {
    if (!workflowName.trim()) {
      toast.error("Please enter a workflow name");
      return;
    }
  
    if (!workflowDescription.trim()) {
      toast.error("Please enter a workflow description");
      return;
    }
  
    setIsSaving(true);
    try {
      console.log('name', workflowName, 'nodes', nodes, 'edges', edges, 'description', workflowDescription);
  
      const workflowData = prepareWorkflowData(workflowName, nodes, edges, workflowDescription, data);
  
      console.log('here is preparedData', workflowData);
  
      // Fix the method assignment logic
      const method = data != null ? "PUT" : "POST";
      
      const response = await fetch("/api/workflows", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workflowData),
      });
  
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to save workflow");
      }
  
      const savedWorkflow = await response.json();
      // Use workflowData.id instead of data.id for the success message
      toast.success(workflowData?.id ? "Workflow updated successfully" : "Workflow saved successfully");
      await loadWorkflows();
    
    } catch (error) {
      console.error("Error saving workflow:", error);
      toast.error("Failed to save workflow");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full w-full flex bg-gray-50 relative"> 
  <div className="flex-grow relative h-full"> 
      <ReactFlow
  nodes={nodes}
  edges={edges}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
  onNodeClick={onNodeClick}
  nodeTypes={nodeTypes}
  edgeTypes={edgeTypes}
  fitView
  snapToGrid
  snapGrid={[15, 15]}
>
<Controls className="z-50 dark:bg-gray-800 dark:text-gray-200" />
  <Background variant={BackgroundVariant.Dots} gap={12} size={1} className="z-0" />
  <Panel position="top-left" className="z-50">
    <WorkFlowExecutionButton/>
  </Panel>
  <Panel position="top-right" className="z-50">
            <div className="flex gap-2">
              
              <Button
                onClick={() => setIsResetDialogOpen(true)}
                variant="ghost"
                size="sm"
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={handleSave}
                variant="ghost"
                size="sm"
                disabled={isSaving}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : (data?.id ? "Update" : "Save")}
              </Button>
            </div>
          </Panel>
</ReactFlow>
      </div>
   
      <NodeCategoriesPanel onAddNode={addNode} />

   
      {selectedNode && (
        <div className="absolute inset-0">
          <DraggableNodeConfigPanel
            selectedNode={selectedNode}
            updateNodeData={updateNodeData}
            onClose={() => setSelectedNode(null)}
            onDeleteNode={handleDeleteNode}  
          />
        </div>
      )}

<AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent className="max-w-[400px] bg-white dark:bg-gray-900 p-6">
          <AlertDialogHeader className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-3">
              <RotateCcw className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <AlertDialogTitle className="text-xl font-semibold text-center">
              Reset Workflow
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-500 dark:text-gray-400">
              Are you sure you want to reset the workflow? This action will remove all nodes and connections.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2 mt-6">
            <AlertDialogCancel 
              className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 border-0"
              onClick={() => setIsResetDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              onClick={handleReset}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}

