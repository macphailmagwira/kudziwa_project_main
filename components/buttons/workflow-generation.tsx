import { useState } from 'react';
import { Play, Loader2 } from 'lucide-react';

export default function WorkFlowExecutionButton() {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async () => {
    setIsExecuting(true);
    // Simulate execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExecuting(false);
  };

  return (
    <button
      onClick={handleExecute}
      disabled={isExecuting}
      className={`
        relative px-6 py-2 rounded-md
        bg-violet-500
        transition-all duration-300
        flex items-center gap-2
        group
        hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]
        disabled:opacity-90
      `}
    >
      <div className="
        relative z-10
        flex items-center gap-2
        text-white/90
        font-medium
        text-sm
      ">
        {!isExecuting ? (
          <>
            <Play className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            <span className="transition-opacity group-hover:opacity-90">Execute Pipeline</span>
          </>
        ) : (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="opacity-90">Executing</span>
          </>
        )}
      </div>
      
      <div className={`
        absolute inset-0 
        bg-gradient-to-r from-violet-600 to-teal-400
        rounded-md
        opacity-0
        transition-opacity duration-300
        group-hover:opacity-100
      `} />
    </button>
  );
}