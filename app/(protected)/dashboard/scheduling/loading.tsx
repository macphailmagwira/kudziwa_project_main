import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/dashboard/header";

export default function SchedulingLoading() {
  return (
    <>
      <DashboardHeader heading="Scheduling" text="" />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
