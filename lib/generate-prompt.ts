import { type ReactNode } from 'react';
import { nodes } from './node-categories';

interface PositionedNode extends Node {
  id: string;
  position: {
    x: number;
    y: number;
  };
  description: string;
}

interface Edge {
  source: string;
  target: string;
}

interface PipelineConfig {
  nodes: PositionedNode[];
  edges: Edge[];
  workflowDescription: string;
}


export function generatePipelinePrompt(userGoal: string): string {
  const MAIN_VERTICAL_SPACING = 250;
  const HORIZONTAL_SPACING = 300;
  const MAIN_X = 400;
  const START_Y = 100;
  const HORIZONTAL_OFFSET_LEFT = -HORIZONTAL_SPACING;
  const HORIZONTAL_OFFSET_RIGHT = HORIZONTAL_SPACING;



  const stagePositions = nodes.map((category, index) => ({
    mainX: MAIN_X,
    mainY: START_Y + (index * MAIN_VERTICAL_SPACING),
    leftX: MAIN_X + HORIZONTAL_OFFSET_LEFT,
    rightX: MAIN_X + HORIZONTAL_OFFSET_RIGHT,
    category: category.category,
    nodeCount: category.nodes.length
  }));

  const nodeDocumentation = nodes.map(category => `
${category.category}:
  ${category.nodes.map(node => `- ${node.label} (type: "${node.type}", icon: "${node.icon}")`).join('\n  ')}
`).join('\n');

  return `You are a data engineering expert. Design a data pipeline workflow using only the nodes listed below:

Available Nodes:
${nodeDocumentation}

Goal: ${userGoal}

Rules:
- Response must be raw JSON without any markdown formatting or code blocks
- Each node must connect to at least one other node
- The workflow must start with an Input node
- The workflow must end with an Output node
- Each node and edge must have a unique ID
- Use exact node types, labels, description and icons from the list above
- Nodes should follow these positioning guidelines:
  - Horizontal spacing between main nodes should be ${MAIN_VERTICAL_SPACING}px
  ${stagePositions.map(stage => 
    `- ${stage.category} nodes can start at y=${stage.mainY}`
  ).join('\n  ')}

Return a JSON object with this structure:
{
 
  "name": string,
  "nodes": [
    {
      "id": string,
      "type": string (must match available node types),
      "label": string (must match available node labels),
      "icon": string (must match available node icons),
      "description": string,
      "position": {
        "x": number,
        "y": number
      }
    }
  ],
  "edges": [
    {
      "id": string,
      "source": string (node id),
      "target": string (node id)
    }
  ],
  "workflowDescription": string
}

Important: Return only the raw JSON object, with no markdown formatting, code blocks, or additional text.`;
}