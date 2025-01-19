// workflow-skeleton.tsx
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function RecentWorkflowSkeleton() {
  return (
    <div className="mt-12 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
          <div className="h-4 w-64 bg-gray-100 dark:bg-gray-800/60 rounded-md animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-gray-100 dark:bg-gray-800/60 rounded-full animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800">
            <CardHeader className="pb-2">
              <div className="space-y-2">
                <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
                <div className="h-4 w-1/3 bg-gray-100 dark:bg-gray-800/60 rounded-md animate-pulse" />
              </div>
            </CardHeader>

            <CardContent className="pb-4">
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-800/60 rounded-md animate-pulse" />
                <div className="h-4 w-4/5 bg-gray-100 dark:bg-gray-800/60 rounded-md animate-pulse" />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-4 pb-4">
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-100 dark:bg-gray-800/60 rounded-full animate-pulse" />
                <div className="h-8 w-8 bg-gray-100 dark:bg-gray-800/60 rounded-full animate-pulse" />
              </div>
              <div className="h-8 w-8 bg-gray-100 dark:bg-gray-800/60 rounded-full animate-pulse" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}