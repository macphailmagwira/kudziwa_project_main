import { Database, FileSpreadsheet, Filter, ArrowLeftRight, BarChart2, Workflow, Code, Table } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface Node {
    type: string;
    label: string;
    icon: React.ReactNode;
    description: string;
}

interface CategoryNode {
    category: string;
    nodes: Node[];
}

export const categoryDescriptions = {
    Input: "Nodes for importing and sourcing data",
    Processing: "Nodes for data manipulation and transformation",
    Output: "Nodes for exporting and saving processed data"
}


export const nodes: CategoryNode[] = [
    {
      category: "Input",
      nodes: [
        { type: "source", label: "Data Source", icon: "Database" ,description: "Connect to databases, APIs, or other data sources"
        },
        { type: "fileInput", label: "File Input", icon: "FileSpreadsheet" , description: "Import data from CSV, Excel, or other file formats"}
      ]
    },
    {
      category: "Processing",
      nodes: [
        { type: "filter", label: "Filter", icon: "Filter", description: "Filter rows based on specified conditions" },
        { type: "transform", label: "Transform", icon: "ArrowLeftRight" ,description: "Apply transformations to columns or rows"
        },
        { type: "aggregate", label: "Aggregate", icon: "BarChart2", description: "Perform grouping and aggregation operations" },
        { type: "join", label: "Join", icon: "Workflow",description: "Combine multiple datasets using various join types"
        },
        { type: "pythonScript", label: "Python Script", icon: "Code",  description: "Execute custom Python code for complex operations" }
      ]
    },
    {
      category: "Output",
      nodes: [
        { type: "export", label: "Export", icon: "Table",  description: "Export processed data to various formats and destinations"        }
      ]
    }
  ];
