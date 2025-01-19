import * as z from "zod";

// Form Schema
export const formSchema = z.object({
  goal: z.string().min(2, {
    message: "Please describe the goal of your data pipeline",
  }),
});

export type FormData = z.infer<typeof formSchema>;

export const defaultValues: FormData = {
  goal: "",
};

export interface Node {
  id: string;
  type: string;
  label: string;
  icon: string;
  description: string;
  position: { x: number; y: number };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface Workflow {
  id: string;
  name: string;
  createdAt: string;
  nodes: Node[];
  edges: Edge[];
  workflowDescription: string;
}

