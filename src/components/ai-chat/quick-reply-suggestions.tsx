
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickReplySuggestionsProps {
  suggestions: string[];
  onReplySelect: (reply: string) => void;
  isVisible: boolean;
}

const QuickReplySuggestions: React.FC<QuickReplySuggestionsProps> = ({
  suggestions,
  onReplySelect,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="space-y-2 p-2 bg-gray-50 rounded-lg">
      <p className="text-xs text-gray-600 font-medium">Quick suggestions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onReplySelect(suggestion)}
            className="text-xs px-3 py-1 h-auto rounded-full hover:bg-blue-50 hover:border-blue-300"
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickReplySuggestions;
