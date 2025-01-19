import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Edit2 } from 'lucide-react'

interface WorkflowCardProps {
  workflow: {
    id: string
    name: string
    description: string
    lastModified: string
  }
  onOpen: () => void
}

export default function WorkflowCard({ workflow, onOpen }: WorkflowCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{workflow.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600">{workflow.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="mr-2 h-4 w-4" />
          {workflow.lastModified}
        </div>
        <Button variant="outline" size="sm" onClick={onOpen}>
          <Edit2 className="mr-2 h-4 w-4" /> Edit
        </Button>
      </CardFooter>
    </Card>
  )
}

