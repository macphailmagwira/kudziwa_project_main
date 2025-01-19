import React, { useState } from 'react';
import { Workflow } from "@/types/workflow-types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Edit, Play, Trash2, AlertCircle, ChevronRight, Calendar, Activity } from 'lucide-react';
import { EmptyState } from "./empty-state";
import { RecentWorkflowSkeleton } from '../skeletons/recent-workflow-skeleton';

interface RecentWorkflowsProps {
  workflows: Workflow[];
  onEdit: (workflow: Workflow) => void;
  onDelete: (workflowId: string) => void;
  onRun: (workflowId: string) => void;
  isLoading:boolean;
  isLoadingWorkflows: boolean ;
}

export function RecentWorkflows({ workflows, onEdit, onDelete, onRun, isLoading, isLoadingWorkflows}: RecentWorkflowsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  if (isLoadingWorkflows) {
    return <RecentWorkflowSkeleton/>
  }


  if (workflows.length === 0 && !isLoading) {
    return (
      <div className="mt-12">
        <h4 className="text-2xl font-bold mb-8 ">
          Recent Pipelines
        </h4>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-8">
      {!isLoading && (<div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-2xl font-bold ">
            Recent Pipelines
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and run your workflow pipelines
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-full text-sm">
          <Activity className="h-4 w-4 text-blue-500 dark:text-blue-400" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400 font-medium">
            {workflows.length} recent workflow{workflows.length !== 1 ? 's' : ''} 
          </span>
        </div>
      </div>)}

      {!isLoading && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
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
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onEdit(workflow)}
                  className="h-8 px-3 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 dark:hover:from-blue-950 dark:hover:to-indigo-950 dark:hover:text-blue-400 transition-all duration-300 rounded-full"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDelete(workflow.id)}
                  className="h-8 px-3 text-gray-600 dark:text-gray-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400 transition-all duration-300 rounded-full"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Activity className="h-4 w-4" />
              <span>Last run 2h ago</span>
            </div>
            </CardFooter>

            {hoveredCard === workflow.id && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/5 to-blue-50/10 dark:from-transparent dark:via-blue-950/5 dark:to-blue-950/10 pointer-events-none transition-opacity duration-300" />
            )}
          </Card>
        ))}
      </div>)}
    </div>
  );
}

export default RecentWorkflows;