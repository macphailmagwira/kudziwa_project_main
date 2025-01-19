import { prisma } from "@/lib/db"
import { Workflow } from "@prisma/client"
import { Workflow as WorkflowType } from "@/types/workflow-types"
import { auth } from "@/auth"


export async function createWorkflow(workflow: WorkflowType) {
  const { nodes, edges, name, workflowDescription } = workflow
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("User is not authenticated")
  }

  try {
    return await prisma.workflow.create({
      data: {
        name,
        workflowDescription,
        nodes: nodes as any,
        edges: edges as any,
        userId: session.user.id, 
      },
      include: {
        executions: true,
      },
    })
  } catch (error) {
    console.error("Error creating workflow:", error)
    throw new Error("Failed to create workflow")
  }
}
  


  export async function getWorkflows(userId: string,) {
    try {
      return await prisma.workflow.findMany({
        where: {
          userId, // Filter by userId
        },
        orderBy: {
          createdAt: 'desc',
        },
      
        include: {
          executions: true,
        },
      })
    } catch (error) {
      console.error("Error fetching workflows:", error)
      throw new Error("Failed to fetch workflows")
    }
  }

  export async function updateWorkflow(
    workflowId: string,
    workflow: any,
    userId: string
  ) {
    try {
      const updatedWorkflow = await prisma.workflow.update({
        where: {
          id: workflowId,
          userId: userId 
        },
        data: {
          name: workflow.name,
          nodes: workflow.nodes,
          edges: workflow.edges,
          workflowDescription: workflow.workflowDescription,
          }
      })
      
      return updatedWorkflow
    } catch (error) {
      console.error("[DB_UPDATE_WORKFLOW]", error)
      throw new Error("Failed to update workflow")
    }
  }
  
  export async function deleteWorkflow(id: string, userId: string) {
    try {
      return await prisma.workflow.delete({
        where: {
          id,
          userId, // Ensure user owns the workflow
        },
      })
    } catch (error) {
      console.error("Error deleting workflow:", error)
      throw new Error("Failed to delete workflow")
    }
  }
  