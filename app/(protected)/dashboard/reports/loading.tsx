import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function ReportsLoading() {
  return (
    <>
      <DashboardHeader heading="Reports" text="" />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
