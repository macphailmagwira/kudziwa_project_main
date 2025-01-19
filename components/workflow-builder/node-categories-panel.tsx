import React, { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { ChevronRight, Info } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { nodes as nodeCategories } from '@/lib/node-categories'
import { iconMap } from './icon-maps'
import { categoryDescriptions } from '@/lib/node-categories'

interface NodeCategoriesPanelProps {
  onAddNode: (type: string, label: string, icon: keyof typeof iconMap) => void
}

const renderIcon = (icon: React.ReactElement) => {
  return React.cloneElement(icon, {
    className: "mr-2 h-4 w-4 text-gray-500 dark:text-gray-400"
  })
}

export default function NodeCategoriesPanel({ onAddNode }: NodeCategoriesPanelProps) {
  const [openCategories, setOpenCategories] = useState<string[]>(['Input'])

  return (
    <TooltipProvider>
      <div className="w-72 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 pt-2 mb-3">
          <h2 className="text-lg font-semibold dark:text-gray-100 flex items-center gap-2">
            Pipeline Blocks
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select blocks to build your pipeline
          </p>
        </div>

        <ScrollArea className="flex-grow px-2">
          <Accordion
            type="multiple"
            value={openCategories}
            onValueChange={setOpenCategories}
            className="space-y-2"
          >
            {nodeCategories.map((category) => (
              <AccordionItem
                key={category.category}
                value={category.category}
                className="border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4 shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-200" />
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {category.category}
                    </span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent>{categoryDescriptions[category.category]}</TooltipContent>
                    </Tooltip>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-4 py-2 space-y-2">
                    {category.nodes.map((node) => (
                      <Tooltip key={node.type}>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={() => onAddNode(node.type, node.label, node.icon)}
                            className="w-full justify-start bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            variant="outline"
                            size="sm"
                          >
                            {iconMap[node.icon as any]}
                            <span className="text-sm text-gray-700 dark:text-gray-200 pl-2">
                              {node.label}
                            </span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-[200px]">
                          {node.description}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </div>
    </TooltipProvider>
  )
}