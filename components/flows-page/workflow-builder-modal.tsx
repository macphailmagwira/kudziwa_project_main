'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Save, RotateCcw } from 'lucide-react'
import DataPipelineBuilder from '../workflow-builder/data-pipeline-builder'
import CloseButton from '../buttons/close-button'

interface WorkflowModalProps {
  loadWorkflows: () => void
  isOpen: boolean
  onClose: () => void
  data?: any
  title: string
}

export default function WorkflowModal({ loadWorkflows,isOpen, onClose, data, title }: WorkflowModalProps) {
  const [workflowName, setWorkflowName] = useState('')
  const [workflowDescription, setWorkflowDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [workflowData, setWorkflowData] = useState(data ||  [])


  useEffect(() => {
    if (data) {
      setWorkflowName(data.name || '')
      setWorkflowDescription(data.workflowDescription || '')
    } else {
      setWorkflowName('')
      setWorkflowDescription('')
    }
  }, [data])

 
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-full w-screen h-screen p-0 overflow-hidden bg-white dark:bg-gray-900  [&>button]:hidden">
      {/* Header Section */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 py-2 flex justify-between items-center">
          <DialogHeader className="flex-1">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </DialogTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {data ? 'Edit your existing workflow' : 'Create a new data pipeline workflow'}
            </p>
          </DialogHeader>
          <div className="flex items-center gap-2">
    <CloseButton onClose={onClose} />
  </div>
        </div>
      </div>
  
      {/* Main Content */}
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        {/* Form Section - Reduced height */}
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-4 max-w-8xl">
            <div className="flex-1 max-w-2xl">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Workflow Name
              </Label>
              <Input
                id="name"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                placeholder="Enter workflow name"
              />
            </div>
            <div className="flex-1 max-w-4xl">
              <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </Label>
              <Input
                id="description"
                value={workflowDescription}
                onChange={(e) => setWorkflowDescription(e.target.value)}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                placeholder="Enter workflow description"
              />
            </div>
          </div>
        </div>
  
        {/* Pipeline Builder Section - Takes remaining space */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-2">
          <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
            <DataPipelineBuilder  loadWorkflows={loadWorkflows}  data={data} workflowName={workflowName} workflowDescription={workflowDescription}  />
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  )
}