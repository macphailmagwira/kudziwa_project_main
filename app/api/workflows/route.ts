import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { createWorkflow, deleteWorkflow, getWorkflows, updateWorkflow} from "@/lib/database/workflows"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const workflow = await req.json()
    const savedWorkflow = await createWorkflow(workflow)
    
    return NextResponse.json(savedWorkflow)
  } catch (error) {
    console.error("[WORKFLOWS_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PUT(
  req: Request,
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const workflow = await req.json();    
    
    const updatedWorkflow = await updateWorkflow(
     workflow.id,
      workflow,
      session.user.id
    )
    
    return NextResponse.json(updatedWorkflow)
  } catch (error) {
    console.error("[WORKFLOW_PUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const workflows = await getWorkflows(session.user.id)
    return NextResponse.json(workflows)
  } catch (error) {
    console.error("[WORKFLOWS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const workflowId = searchParams.get("id")

    if (!workflowId) {
      return new NextResponse("Workflow ID required", { status: 400 })
    }

    await deleteWorkflow(workflowId, session.user.id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[WORKFLOWS_DELETE]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}