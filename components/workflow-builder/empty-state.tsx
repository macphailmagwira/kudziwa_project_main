import { FileStack, Plus, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmptyState() {
  return (
    <div className="relative group">
      <div className="flex flex-col items-center justify-center h-72 border-2 border-dashed border-gray-200/60 dark:border-gray-800/60 rounded-2xl transition-all duration-300 group-hover:border-blue-200/60 dark:group-hover:border-blue-900/60">
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <div className="bg-white dark:bg-gray-900 p-3 rounded-full shadow-lg relative transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-blue-500/20">
              <FileStack className="w-6 h-6 stroke-[1.5] text-blue-500 dark:text-blue-400" />
              <Sparkles className="absolute -right-4 -top-2 w-4 h-4 text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </div>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              No pipelines yet
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              Create your first workflow and start automating your processes
            </p>
          </div>

          <Button 
            className="mt-6 group/button"
            size="default"
          >
            <Plus className="mr-2 h-4 w-4 group-hover/button:rotate-90 transition-transform duration-300" />
            Create Workflow
            <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover/button:opacity-100 transform -translate-x-2 group-hover/button:translate-x-0 transition-all duration-300" />
          </Button>
        </div>
      </div>
    </div>
  )
}