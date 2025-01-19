import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DatasetsLoading() {
  return (
    <>
      <DashboardHeader heading="Datasets" text="" />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
