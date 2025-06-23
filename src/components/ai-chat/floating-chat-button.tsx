
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bot, Sparkles } from 'lucide-react';
import AIChatWidget from './ai-chat-widget';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingChatButton: React.FC = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const isMobile = useIsMobile();

  // Show pulse animation for first 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPulse(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const toggleWidget = () => {
    setIsWidgetOpen(!isWidgetOpen);
    setShowPulse(false);
  };

  return (
    <>
      {/* AI Chat Button */}
      <div className={`fixed ${isMobile ? 'bottom-4 left-4' : 'bottom-4 left-4'} z-40`}>
        <div className="relative group">
          <Button
            onClick={toggleWidget}
            className={`${
              isMobile ? 'h-14 w-14' : 'h-12 w-12'
            } rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-110 transition-all duration-200 flex items-center justify-center relative overflow-hidden`}
            size="icon"
            title="AI Travel Assistant"
          >
            {/* Pulse animation */}
            {showPulse && (
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
            )}
            
            {/* Icon with sparkle effect */}
            <div className="relative flex items-center justify-center">
              <Bot className={`${isMobile ? 'h-7 w-7' : 'h-6 w-6'} text-white z-10`} />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
            </div>
          </Button>

          {/* Tooltip */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            AI Travel Assistant
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
          </div>

          {/* Badge for new messages */}
          {!isWidgetOpen && (
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">!</span>
            </div>
          )}
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
