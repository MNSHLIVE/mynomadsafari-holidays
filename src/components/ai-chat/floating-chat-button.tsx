
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bot } from 'lucide-react';
import AIChatWidget from './ai-chat-widget';

const FloatingChatButton: React.FC = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  const toggleWidget = () => {
    setIsWidgetOpen(!isWidgetOpen);
  };

  return (
    <>
      {/* AI Chat Button - positioned to avoid WhatsApp buttons */}
      <div className="fixed bottom-4 left-4 z-40">
        <Button
          onClick={toggleWidget}
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 hover:scale-110 transition-all duration-200 flex items-center justify-center"
          size="icon"
          title="AI Travel Assistant"
        >
          <Bot className="h-7 w-7 text-white" />
        </Button>
        {/* Helper text for first-time users */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          AI Travel Help
        </div>
      </div>

      {/* Chat Widget */}
      <AIChatWidget 
        isOpen={isWidgetOpen} 
        onClose={() => setIsWidgetOpen(false)} 
      />
    </>
  );
};

export default FloatingChatButton;
