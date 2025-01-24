'use client';

import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const dataSources = [
  { value: "who", label: "World Health Organization" },
  { value: "cdc", label: "CDC" },
  { value: "local", label: "Local Health Department" }
];

const programAreas = [
  { value: "hiv", label: "HIV/AIDS" },
  { value: "malaria", label: "Malaria" },
  { value: "tb", label: "Tuberculosis" },
  { value: "maternal", label: "Maternal Health" }
];

export default function DashboardConfiguration() {
  const [dataSource, setDataSource] = useState("");
  const [programArea, setProgramArea] = useState("");
  const [saveAsDefault, setSaveAsDefault] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!dataSource || !programArea) {
      alert("Please select both a data source and program area.");
      return;
    }

    try {
      const response = await fetch('/api/user/configuration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dataSource,
          programArea,
          saveAsDefault
        })
      });

      if (response.ok) {
        console.log("Configuration saved successfully");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to save configuration");
      }
    } catch (error) {
      console.error("Configuration save error:", error);
      alert("An error occurred while saving configuration");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="dataSource" className="block mb-2">
              Select Data Source
            </Label>
            <Select 
              value={dataSource} 
              onValueChange={setDataSource}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a data source" />
              </SelectTrigger>
              <SelectContent>
                {dataSources.map((source) => (
                  <SelectItem 
                    key={source.value} 
                    value={source.value}
                  >
                    {source.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Label htmlFor="programArea" className="block mb-2">
              Select Program Area
            </Label>
            <Select 
              value={programArea} 
              onValueChange={setProgramArea}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a program area" />
              </SelectTrigger>
              <SelectContent>
                {programAreas.map((area) => (
                  <SelectItem 
                    key={area.value} 
                    value={area.value}
                  >
                    {area.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="saveDefault"
              checked={saveAsDefault}
              onCheckedChange={setSaveAsDefault}
            />
            <Label 
              htmlFor="saveDefault" 
              className="text-sm font-medium leading-none"
            >
              Save as default configuration
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-auto"
            disabled={!dataSource || !programArea}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}