export const sampleWorkflows = [
    {
        "name": "Customer Records Deduplication Pipeline",
        "nodes": [
            {
                "id": "node1",
                "type": "source",
                "label": "Data Source",
                "icon": "Database",
                "description": "Fetch customer records from a database.",
                "position": {
                    "x": 400,
                    "y": 100
                }
            },
            {
                "id": "node2",
                "type": "fileInput",
                "label": "File Input",
                "icon": "FileSpreadsheet",
                "description": "Read additional customer records from an input file.",
                "position": {
                    "x": 400,
                    "y": 350
                }
            },
            {
                "id": "node3",
                "type": "join",
                "label": "Join",
                "icon": "Workflow",
                "description": "Merge customer records from the data source and the input file.",
                "position": {
                    "x": 400,
                    "y": 600
                }
            },
            {
                "id": "node4",
                "type": "pythonScript",
                "label": "Python Script",
                "icon": "Code",
                "description": "Remove duplicate customer records using a Python script.",
                "position": {
                    "x": 400,
                    "y": 850
                }
            },
            {
                "id": "node5",
                "type": "export",
                "label": "Export",
                "icon": "Table",
                "description": "Export the deduplicated customer records to the destination.",
                "position": {
                    "x": 400,
                    "y": 1100
                }
            }
        ],
        "edges": [
            {
                "id": "edge1",
                "source": "node1",
                "target": "node3"
            },
            {
                "id": "edge2",
                "source": "node2",
                "target": "node3"
            },
            {
                "id": "edge3",
                "source": "node3",
                "target": "node4"
            },
            {
                "id": "edge4",
                "source": "node4",
                "target": "node5"
            }
        ],
        "workflowDescription": "\"This pipeline merges customer records from a database and a file, removes duplicates using a Python script, and exports the cleaned data.\"",
        "id": "bb4fffc9-2834-4689-95f6-dd758bd9c478",
        "createdAt": "2025-01-04T09:15:36.248Z"
    }
  ]
  
  