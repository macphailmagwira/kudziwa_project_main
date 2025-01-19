-- CreateTable
CREATE TABLE "node_data" (
    "id" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "node_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "node_data_workflowId_nodeId_idx" ON "node_data"("workflowId", "nodeId");

-- AddForeignKey
ALTER TABLE "node_data" ADD CONSTRAINT "node_data_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;
