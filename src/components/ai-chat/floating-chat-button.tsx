
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import AIChatWidget from './ai-chat-widget';

const FloatingChatButton: React.FC = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  const toggleWidget = () => {
    setIsWidgetOpen(!isWidgetOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={toggleWidget}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-40 hover:scale-110 transition-transform"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Widget */}
      <AIChatWidget 
        isOpen={isWidgetOpen} 
        onClose={() => setIsWidgetOpen(false)} 
      />
    </>
  );
};

export default FloatingChatButton;
