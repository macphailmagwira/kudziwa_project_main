import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import DataPipelineWorkflows from "@/components/flows-page/flows";

export const metadata = constructMetadata({
  title: "Flows",
  description: "Create and manage content.",
});

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <>
      
     <DataPipelineWorkflows />
    </>
  );
}
