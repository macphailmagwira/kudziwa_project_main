"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useCompletion } from "ai/react"
import { toast } from "sonner"
import { defaultValues, FormData, Workflow } from "@/types/workflow-types"
import { generatePipelinePrompt } from "@/lib/generate-prompt"
import { cn } from "@/lib/utils"
import { WorkflowInput } from "../forms/workflow-input"
import { Loader2 } from 'lucide-react'
import WorkflowModal from "../workflow-builder/workflow-modal"
import { RecentWorkflows } from "../workflow-builder/recent-workflows"
import { v4 as uuidv4 } from 'uuid';



export function GenerateWorkflow() {
  const [workflowInput, setWorkFlowInput] = useState<FormData>(defaultValues)
  const [workFlow, setWorkFlow] = useState<Workflow | null>(null)
  const [errorHistory, setErrorHistory] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [recentWorkflows, setRecentWorkflows] = useState<Workflow[]>([])
  const [isLoadingWorkflows, setIsLoadingWorkflows] = useState(true) 
  const MAX_RETRIES = 10

  const { complete, isLoading } = useCompletion({
    api: "/api/generate-workflow",
    onFinish: () => {
      // Add finish logic here
    },
  })

  const addUniqueIdsToNodes = (workflow: Workflow): Workflow => {
    // Create a deep copy of the workflow
    const updatedWorkflow = JSON.parse(JSON.stringify(workflow));

    // Generate unique node IDs
    const idMap: Record<string, string> = {}; // To track old-to-new ID mapping
    updatedWorkflow.nodes = updatedWorkflow.nodes.map((node) => {
        const newId = uuidv4();
        idMap[node.id] = newId; // Map old ID to new ID
        return {
            ...node,
            id: newId,
        };
    });

    // Update edge references to match the new node IDs
    updatedWorkflow.edges = updatedWorkflow.edges.map((edge) => ({
        ...edge,
        source: idMap[edge.source], // Replace source with the new ID
        target: idMap[edge.target], // Replace target with the new ID
    }));

    return updatedWorkflow;
};
  

 
  const tryComplete = async (prompt: string, retries = 0, prevErrors = ""): Promise<Workflow> => {
    try {
      const completion = await complete(prompt)
      if (!completion) throw new Error("No completion received")
      
      const result = JSON.parse(completion)
      setErrorHistory("")  
      return result
    } catch (error) {
      const newError = `Attempt ${retries + 1}: ${error instanceof Error ? error.message : 'Unknown error'}\n`
      const combinedErrors = prevErrors + newError
      
      if (retries >= MAX_RETRIES) {
        toast.error("Maximum retries reached. Please try again.")
        throw error
      }
  
      setErrorHistory(combinedErrors)
      const updatedPrompt = prompt + "\n\nPlease fix the following errors and return valid JSON:\n" + combinedErrors
      return tryComplete(updatedPrompt, retries + 1, combinedErrors)
    }
  }

  const loadWorkflows = async () => {
    try {
      setIsLoadingWorkflows(true)  
      const response = await fetch("/api/workflows")
      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || "Failed to load workflows")
      }
          
      const data = await response.json()
      setRecentWorkflows(data.slice(0, 5))
    } catch (error) {
      console.error("Error loading workflows:", error)
      toast.error("Failed to load recent workflows") 
    } finally {
      setIsLoadingWorkflows(false) 
    }
  }
  useEffect(() => {
    loadWorkflows()
  }, [])

  const saveWorkflow = async (workflow: Workflow) => {
    try {
      const response = await fetch("/api/workflows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workflow),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || "Failed to save workflow")
      }
      
      const savedWorkflow = await response.json()
      setRecentWorkflows(prev => [savedWorkflow, ...prev.slice(0, 9)])
      toast.success("Workflow saved successfully")
      return savedWorkflow
    } catch (error) {
      console.error("Error saving workflow:", error)
      toast.error("Failed to save workflow")
      throw error
    }
  }

  //TODO: Centralize these functions

  const handleDeleteWorkflow = async (workflowId: string) => {
    try {
      const response = await fetch(`/api/workflows?id=${workflowId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || "Failed to delete workflow")
      }

      setRecentWorkflows(prev => prev.filter(w => w.id !== workflowId))
      toast.success("Workflow deleted successfully")
    } catch (error) {
      console.error("Error deleting workflow:", error)
      toast.error("Failed to delete workflow")
    }
  }

  const onSubmit = useCallback(
    async (values: FormData) => {
      try {
        const prompt = generatePipelinePrompt(values.goal)
        setWorkFlowInput(values)
  
        const result = await tryComplete(prompt)        
        const workflowWithUniqueIds = addUniqueIdsToNodes(result);         
        const savedWorkflow = await saveWorkflow(workflowWithUniqueIds);
        setWorkFlow(savedWorkflow)
        setIsModalOpen(true)
        toast.success("Successfully generated and saved workflow")
      } catch (error) {
        console.error("Workflow generation failed:", error)
        toast.error("Failed to generate workflow")
      }
    },
    [complete]
  )

  const handleEditWorkflow = (workflow: Workflow) => {
    setWorkFlow(workflow)
    setIsModalOpen(true)
  }


  const handleRunWorkflow = (workflowId: string) => {
    // Implement the logic to run the workflow
    toast.success(`Running workflow ${workflowId}`)
  }

  

  return (
    <div className="pb-24">
      <WorkflowInput onSubmit={onSubmit} isLoading={isLoading}/>
      
      {isLoading && (
        <div className="min-h-[100px] flex flex-col items-center justify-center gap-4 mt-6">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-white dark:bg-gray-900 p-4 rounded-full shadow-lg">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500 dark:text-blue-400" />
          </div>
        </div>
        
        <p className="text-lg font-medium bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 dark:from-gray-300 dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent animate-pulse">
          Generating your workflow
          <span className="animate-bounce inline-block">.</span>
          <span className="animate-bounce inline-block delay-100">.</span>
          <span className="animate-bounce inline-block delay-200">.</span>
        </p>
      </div>
      )}
        
      {workFlow && !isLoading && (
        <WorkflowModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={workFlow}
          title="Data Pipeline Workflow"
        />
      )}

<RecentWorkflows
  isLoading={isLoading}
  isLoadingWorkflows={isLoadingWorkflows}
  workflows={recentWorkflows}
  onEdit={handleEditWorkflow}
  onDelete={handleDeleteWorkflow}
  onRun={handleRunWorkflow}
/>
    </div>
  )
}

