import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import DashboardConfiguration from "@/components/dashboard/configuration";

export const metadata = constructMetadata({
  title: "Kudziwa Project",
  description: "Configure your public health data dashboard",
});

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="
          flex-grow
          p-4 xl:px-8 
          pt-[5%]
          bg-gray-30 dark:bg-transparent
          [background-image:radial-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] 
          dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]
          [background-size:15px_15px]
          [background-position:-19px_-19px] pt-[12%]
        "
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl mb-6">
            Welcome to the <span className="bg-gradient-to-r from-violet-500 to-teal-300 bg-clip-text text-transparent">
              {"Kudziwa"} 
            </span> Project
          </h1>          

          <div className="text-center text-lg text-muted-foreground mb-10">
            Select a data source and program area to configure your dashboard.
          </div>
          
          <DashboardConfiguration />

          <div className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Kudziwa Project. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}