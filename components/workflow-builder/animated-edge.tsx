import React from 'react'
import { EdgeProps, getBezierPath } from '@xyflow/react';

export default function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path stroke-gray-300"
        d={edgePath}
        strokeWidth={2}
      />
      <path
        id={`${id}-animation`}
        style={style}
        className="react-flow__edge-path stroke-blue-500 animate-dash"
        d={edgePath}
        strokeWidth={2}
        strokeDasharray="5,5"
      />
    </>
  )
}

