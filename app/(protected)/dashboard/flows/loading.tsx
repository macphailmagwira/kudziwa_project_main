'use client'

import React from 'react'
import { Plus, Search, Activity, FileStack } from 'lucide-react'

export default function DataPipelineWorkflowsLoading() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Header Section Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-9 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse">
              <Activity className="h-4 w-4 text-gray-300 dark:text-gray-700" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="h-10 w-36 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
      </div>

      {/* Search and Stats Section Skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300 dark:text-gray-700" />
          <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
          <FileStack className="h-4 w-4 text-gray-300 dark:text-gray-700" />
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>

      {/* Workflows Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}