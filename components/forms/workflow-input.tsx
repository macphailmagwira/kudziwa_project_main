"use client"

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { defaultValues, formSchema, type FormData } from "@/types/workflow-types";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { WorkflowInputLabel } from "@/components/forms/workflow-input-label";
import { Icons } from "@/components/icons";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WorkflowProps {
  onSubmit: (values: FormData, e: React.FormEvent) => void;
  isLoading: boolean;
}

export function WorkflowInput({ onSubmit, isLoading }: WorkflowProps) {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    form.handleSubmit(async (values) => {
     onSubmit(values, e);
      form.reset();
    })(e);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              {showAdditionalFields && (
                <WorkflowInputLabel
                  stepIndex="?"
                  labelIndex="e.g. Merge customer records and remove duplicates"
                />
              )}
              <FormControl>
                <div
                  style={{
                    "--spread": "90deg",
                    "--shimmer-color": "#ffffff",
                    "--radius": "12px",
                    "--speed": "1.5s",
                    "--cut": "0.1em",
                    "--bg": "radial-gradient(ellipse 80% 50% at 50% 120%,rgba(62, 61, 117),rgba(18, 18, 38))",
                  } as CSSProperties}
                  className="group relative overflow-hidden [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:shadow-[0_0_40px_8px_rgba(62,61,117,0.7)]"
                >
                  <div className="absolute inset-0 overflow-visible [container-type:size]">
                    <div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
                      <div className="absolute inset-[-100%] w-auto rotate-0 animate-spinLinear [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,hsl(0_0%_100%/1)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
                    </div>
                  </div>
                  <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]" />
                  <div className="relative">
                    <Input
                      placeholder="Start typing..."
                      {...field}
                      onClick={() => setShowAdditionalFields(true)}
                      className="border-0 bg-transparent text-white shadow-lg placeholder:text-white focus-visible:ring-0"
                      disabled={isLoading}
                    />
                    {isLoading ? (
                      <Loader2 className="absolute right-2.5 top-3 size-4 animate-spin text-secondary" />
                    ) : (
                      <Icons.input className="absolute right-2.5 top-3 size-4 text-secondary" />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
      </form>
    </Form>
  );
}