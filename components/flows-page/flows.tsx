'use client'

import React, { useState,useEffect} from 'react'
import { 
  Plus, 
  Search, 
  Activity, 
  Calendar, 
  ArrowRight, 
  Gauge,
  Edit,
  Trash2,
  Play,
  MoreVertical,
  Settings,
  FileStack
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import WorkflowCard from './workflow-card'
import WorkflowModal from './workflow-builder-modal'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { sampleWorkflows } from '@/lib/sample-data/flows-page-sample-data'
import { toast } from "sonner"
import { defaultValues, FormData, Workflow } from "@/types/workflow-types"
import { RecentWorkflowSkeleton } from '../skeletons/recent-workflow-skeleton'


export default function DataPipelineWorkflows() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedWorkflow, setSelectedWorkflow] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [recentWorkflows, setRecentWorkflows] = useState<Workflow[]>([])
  const [isLoadingWorkflows, setIsLoadingWorkflows] = useState(true) 

  // Filter workflows based on search term
  const filteredWorkflows = recentWorkflows.filter(workflow => 
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.workflowDescription.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenWorkflow = (workflow: any) => {
    setSelectedWorkflow(workflow)
    setIsModalOpen(true)
  }

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

  const handleCreateNewWorkflow = () => {
    setSelectedWorkflow(null)
    setIsModalOpen(true)
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
      setRecentWorkflows(data)
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

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
              Workflows
            </h1>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
              <Activity className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                0 active
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Design and manage your data processing pipelines
          </p>
        </div>
        <Button 
          onClick={handleCreateNewWorkflow}
          className="group relative overflow-hidden bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 shadow-sm transition-all duration-300 rounded-lg h-10 hover:shadow-md"
        >
          <span className="relative z-10 flex items-center">
            <Plus className="mr-2 h-4 w-4 transition-all duration-300 group-hover:rotate-90 group-hover:scale-110" />
            <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
              New Workflow
            </span>
          </span>
          <div className="absolute inset-0 w-0 bg-gray-700 dark:bg-gray-200 transition-all duration-300 ease-out group-hover:w-full" />
        </Button>
      </div>

      {/* Search and Stats Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10 bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg w-full h-10 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-700 transition-all duration-200"
            placeholder="Search workflows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <FileStack className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            {filteredWorkflows.length} workflow{filteredWorkflows.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Workflows Grid */}
      { isLoadingWorkflows ? (<RecentWorkflowSkeleton/>) :
      
      filteredWorkflows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-6 mb-6">
            <Activity className="h-10 w-10 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
            {searchTerm ? 'No matching workflows' : 'No workflows yet'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-md">
            {searchTerm 
              ? 'Try adjusting your search terms or clear the search to see all workflows' 
              : 'Create your first workflow pipeline to start processing your data'}
          </p>
          {!searchTerm && (
            <Button 
              onClick={handleCreateNewWorkflow}
              className="group bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 rounded-lg h-10"
            >
              <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90 duration-200" />
              Create First Workflow
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow) => (
            <Card 
              key={workflow.id} 
              className="relative overflow-hidden bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] dark:hover:shadow-2xl dark:hover:shadow-blue-950/30 border-gray-100 dark:border-gray-800 group"
              onMouseEnter={() => setHoveredCard(workflow.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
              
              <CardHeader className="pb-2 relative">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-indigo-500 dark:group-hover:from-blue-400 dark:group-hover:to-indigo-400 transition-all duration-300">
                    {workflow.name}
                  </CardTitle>
                </div>
                <CardDescription className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <Calendar className="mr-1.5 h-3 w-3" />
                  {new Date(workflow.createdAt).toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {workflow.workflowDescription}
                </p>
              </CardContent>

              <CardFooter className="flex items-center justify-between pt-4 pb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Activity className="h-4 w-4" />
                  <span>Last run 2h ago</span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleOpenWorkflow(workflow)}
                    className="h-8 px-3 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 dark:hover:from-blue-950 dark:hover:to-indigo-950 dark:hover:text-blue-400 transition-all duration-300 rounded-full"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteWorkflow(workflow.id)}
                    className="h-8 px-3 text-gray-600 dark:text-gray-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400 transition-all duration-300 rounded-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>

              {hoveredCard === workflow.id && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/5 to-blue-50/10 dark:from-transparent dark:via-blue-950/5 dark:to-blue-950/10 pointer-events-none transition-opacity duration-300" />
              )}
            </Card>
          ))}
        </div>
      )}

      <WorkflowModal   
        loadWorkflows={loadWorkflows}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedWorkflow}
        title={selectedWorkflow ? `Edit: ${selectedWorkflow.name}` : 'Create New Workflow'}
      />
    </div>
  )
}