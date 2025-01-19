import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { GenerateWorkflow } from "@/components/generate-workflow/generate-workflow";

export const metadata = constructMetadata({
  title: "Harmony - clean, quality, standard, compliant data pipelines on autopilot",
  description: "Clean, quality, compliant data pipelines on autopilot",
});

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className=" pt-[10%]
          flex-1 p-4 xl:px-8 
          bg-gray-30 dark:bg-transparent
          [background-image:radial-gradient(rgba(0,0,0,0.1)_1px,transparent_1px)] 
          dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]
          [background-size:15px_15px]
          [background-position:-19px_-19px]
        "
      >
<h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
  
Start Building Your Data <br/> Pipeline 
          <span className="bg-gradient-to-r from-violet-500 to-teal-300 bg-clip-text text-transparent">
            {" Workflow"}
          </span>
          </h1>          
      <div className="text-center text-lg text-muted-foreground mt-5 mb-10">
      Describe your goal, and let AI create a pipeline workflow for your data or start <br/>from scratch by creating a new workflow
    </div>

          <GenerateWorkflow/>
            
      </div>
    </div>
  );
}
