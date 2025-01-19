import React, { memo } from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react';

const WorkflowNode = ({ data }: NodeProps) => {
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-gray-200 w-48 transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="flex items-center mb-2">
        <div className="rounded-full w-8 h-8 flex justify-center items-center bg-blue-100 text-blue-500">
          {data.icon as any}
        </div>
        <div className="ml-2">
          <div className="text-sm font-medium text-gray-800">{data.label  as any}</div>
          {/*<div className="text-xs text-gray-500 capitalize">{data.type as any}</div>*/}
        </div>
      </div>
      <div className="text-xs text-gray-600">{data.description  as any}</div>

      <Handle 
        type="target" 
        position={Position.Left
        } 
        className="w-3 h-3 !bg-blue-500 !rounded-full" 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 !bg-blue-500 !rounded-full" 
      />
    </div>
  )
}

export default memo(WorkflowNode)

