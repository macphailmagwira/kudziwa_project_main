import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CloseButton = ({ onClose }) => {
  return (
    <Button
      onClick={onClose}
      variant="ghost"
      className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
      aria-label="Close modal"
    >
      <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </Button>
  );
};

export default CloseButton;