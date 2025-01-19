import React, { useState } from 'react';
import { Node } from '@xyflow/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { X, GripHorizontal, Trash2 } from 'lucide-react';
import Draggable from 'react-draggable';

interface NodeData extends Record<string, unknown> {
  label: string;
  icon: React.ReactNode;
  type: 'source' | 'filter' | 'transform' | 'aggregate';
  config?: {
    sourceUrl?: string;
    filterCondition?: string;
    transformFunction?: string;
    aggregateFunction?: string;
  };
}

interface NodeConfigPanelProps {
  selectedNode: Node<NodeData> | null;
  updateNodeData: (id: string, newData: Partial<NodeData>) => void;
  onClose: () => void;
  onDeleteNode: (id: string) => void;  // New prop for handling node deletion
}

const DraggableNodeConfigPanel: React.FC<NodeConfigPanelProps> = ({
  selectedNode,
  updateNodeData,
  onClose,
  onDeleteNode,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 20 });

  if (!selectedNode) {
    return null;
  }

  const handleConfigUpdate = (key: string, value: string) => {
    updateNodeData(selectedNode.id, {
      config: {
        ...selectedNode.data.config,
        [key]: value,
      },
    });
  };

  const handleDelete = () => {
    onDeleteNode(selectedNode.id);
    onClose();
  };

  const renderConfigFields = () => {
    switch (selectedNode.data.type) {
      case 'source':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="sourceUrl">Source URL</Label>
              <Input
                id="sourceUrl"
                value={selectedNode.data.config?.sourceUrl || ''}
                onChange={(e) => handleConfigUpdate('sourceUrl', e.target.value)}
                placeholder="Enter data source URL"
              />
            </div>
          </div>
        );
      
      case 'filter':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="filterCondition">Filter Condition</Label>
              <Input
                id="filterCondition"
                value={selectedNode.data.config?.filterCondition || ''}
                onChange={(e) => handleConfigUpdate('filterCondition', e.target.value)}
                placeholder="Enter filter condition"
              />
            </div>
          </div>
        );

      case 'transform':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="transformFunction">Transform Function</Label>
              <Input
                id="transformFunction"
                value={selectedNode.data.config?.transformFunction || ''}
                onChange={(e) => handleConfigUpdate('transformFunction', e.target.value)}
                placeholder="Enter transform function"
              />
            </div>
          </div>
        );

      case 'aggregate':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="aggregateFunction">Aggregate Function</Label>
              <Input
                id="aggregateFunction"
                value={selectedNode.data.config?.aggregateFunction || ''}
                onChange={(e) => handleConfigUpdate('aggregateFunction', e.target.value)}
                placeholder="Enter aggregate function"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Draggable
      handle=".drag-handle"
      position={position}
      onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
      bounds="parent"
    >
      <div className="absolute w-80 shadow-xl">
        <Card>
          <CardHeader className="cursor-move drag-handle border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripHorizontal className="h-4 w-4 text-gray-500" />
                <CardTitle className="text-sm">Configure {selectedNode.data.label}</CardTitle>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="nodeLabel">Node Label</Label>
                <Input
                  id="nodeLabel"
                  value={selectedNode.data.label}
                  onChange={(e) => updateNodeData(selectedNode.id, { label: e.target.value })}
                />
              </div>
              {renderConfigFields()}
              <div className="flex gap-2">
                <Button
                  className="flex-grow"
                  onClick={() => {
                    console.log('Configuration saved:', selectedNode.data);
                  }}
                >
                  Apply Changes
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleDelete}
                  title="Delete Node"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Draggable>
  );
};

export default DraggableNodeConfigPanel;