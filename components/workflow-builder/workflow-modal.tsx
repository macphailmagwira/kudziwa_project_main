'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import WorkflowBuilder from './workflow-builder-preview'

interface WorkflowModalProps {
  isOpen: boolean
  onClose: () => void
  data: any // Use the same WorkflowData type from WorkflowBuilder
  title: string
}

export default function WorkflowModal({ isOpen, onClose, data, title }: WorkflowModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[80vw] w-full max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Visualize your data pipeline workflow
          </DialogDescription>
        </DialogHeader>
        <WorkflowBuilder data={data} isModal={true} />
      </DialogContent>
    </Dialog>
  )
}

