
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, Calculator, FileText, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';
import EmbeddedCalculator from './embedded-calculator';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatWidget: React.FC<AIChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random()}`);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatedData, setCalculatedData] = useState<any>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const isMobile = useIsMobile();
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick reply suggestions
  const quickReplies = [
    "Plan a Kerala trip",
    "Rajasthan heritage tour", 
    "International packages",
    "Honeymoon destinations",
    "Adventure tours",
    "Budget travel options"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        type: 'assistant',
        content: 'Hello! I\'m your personal travel assistant at MyNomadSafariHolidays. I\'m here to help you plan your perfect trip within your budget! 🌟\n\nWhether you\'re dreaming of Kerala\'s backwaters, Rajasthan\'s palaces, or international destinations like Bali and Dubai, I can help you find the perfect package.\n\nTo get started, tell me where you\'d like to travel and I can help you with instant cost calculations!',
        timestamp: new Date()
      }]);
    }
  }, []);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setShowQuickReplies(false);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message: messageText,
          sessionId: sessionId,
          conversationData: messages
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (data && data.response) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('No response received from AI');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Having trouble connecting. Please try again.');
      
      const fallbackMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: 'I\'m here to help plan your perfect trip! I can assist with destinations like Kerala, Rajasthan, Goa, Bali, Dubai, and many more. Try our Trip Calculator for instant cost estimates!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendTextMessage = () => sendMessage(inputMessage);
  const sendQuickReply = (reply: string) => sendMessage(reply);

  const handleCalculatorResult = (data: any) => {
    setCalculatedData(data);
    setShowCalculator(false);
    
    const costMessage = `Based on your ${data.destination} trip for ${data.adults} adults${data.children > 0 ? ` and ${data.children} children` : ''} from ${data.departureDate} to ${data.returnDate}:

💰 **Total Cost**: ₹${data.totalCost.toLocaleString()}
👤 **Per Person**: ₹${data.perPersonCost.toLocaleString()}
🏨 **Hotel Category**: ${data.hotelCategory}
📦 **Package Type**: ${data.packageType}

This includes accommodation, meals, transfers, and sightseeing. Would you like me to generate a detailed itinerary PDF with this costing?`;

    const calculatorMessage: Message = {
      id: (Date.now() + 3).toString(),
      type: 'assistant',
      content: costMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, calculatorMessage]);
  };

  const generateItineraryPDF = async () => {
    if (!calculatedData) return;
    
    try {
      const itineraryData = {
        customerName: 'Guest Traveler',
        email: 'guest@example.com',
        phone: '',
        destination: calculatedData.destination,
        departureDate: calculatedData.departureDate,
        returnDate: calculatedData.returnDate,
        adults: calculatedData.adults,
        children: calculatedData.children,
        totalCost: calculatedData.totalCost,
        perPersonCost: calculatedData.perPersonCost,
        hotelCategory: calculatedData.hotelCategory,
        packageType: calculatedData.packageType,
        specialRequests: '',
        sessionId: sessionId
      };

      const { data, error } = await supabase.functions.invoke('generate-itinerary-pdf', {
        body: itineraryData
      });

      if (error) {
        console.error('Error generating itinerary:', error);
        toast.error('Failed to generate itinerary. Please try again.');
      } else {
        toast.success('Itinerary generated! Check your email for the PDF.');
        
        const pdfMessage: Message = {
          id: (Date.now() + 4).toString(),
          type: 'assistant',
          content: `Perfect! I've generated your detailed ${calculatedData.destination} itinerary with the calculated costing. The PDF includes day-wise activities, inclusions, exclusions, and the total cost breakdown of ₹${calculatedData.totalCost.toLocaleString()}.

Is there anything else you'd like to customize in your trip?`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, pdfMessage]);
      }
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  if (!isOpen) return null;

  const widgetClasses = isMobile 
    ? "fixed inset-x-2 bottom-2 top-20 shadow-2xl z-50 flex flex-col bg-white rounded-lg overflow-hidden"
    : "fixed bottom-20 left-4 w-80 h-[500px] shadow-2xl z-50 flex flex-col bg-white rounded-lg overflow-hidden";

  return (
    <Card className={widgetClasses}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex-shrink-0 px-3 py-2">
        <CardTitle className={`font-semibold flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-sm'}`}>
          <MessageCircle className="h-4 w-4" />
          Travel Assistant
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-blue-800 p-1 h-6 w-6">
          <X className="h-3 w-3" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
        {showCalculator ? (
          <div className="p-3">
            <EmbeddedCalculator 
              onCalculate={handleCalculatorResult}
              onClose={() => setShowCalculator(false)}
            />
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-3 overflow-y-auto" ref={scrollAreaRef}>
              <div className="space-y-3 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`${isMobile ? 'max-w-[90%]' : 'max-w-[85%]'} p-3 rounded-lg shadow-sm ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white rounded-br-sm text-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm text-sm'
                      }`}
                    >
                      <div className="whitespace-pre-wrap break-words leading-relaxed">
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg text-sm rounded-bl-sm shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="space-y-2">
                  <div className="flex gap-2 flex-wrap">
                    <Button 
                      onClick={() => setShowCalculator(true)}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                    >
                      <Calculator className="h-3 w-3 mr-1" />
                      Trip Calculator
                    </Button>
                    
                    {calculatedData && (
                      <Button 
                        onClick={generateItineraryPDF}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-xs"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Generate PDF
                      </Button>
                    )}
                  </div>
                </div>

                {/* Quick Replies */}
                {showQuickReplies && messages.length <= 2 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600 px-1">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply) => (
                        <Button
                          key={reply}
                          variant="outline"
                          size="sm"
                          onClick={() => sendQuickReply(reply)}
                          className="text-xs px-2 py-1 h-auto rounded-full"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t bg-gray-50 p-3 flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  placeholder={isMobile ? "Type your message..." : "Ask about destinations, get quotes..."}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className={`flex-1 ${isMobile ? 'text-base' : 'text-sm'}`}
                />
                <Button 
                  onClick={sendTextMessage} 
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                  size={isMobile ? "default" : "sm"}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AIChatWidget;
