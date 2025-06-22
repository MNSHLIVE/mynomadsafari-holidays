
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Mic, MicOff, Send, X, Volume2, VolumeX, User, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [showWhatsAppOption, setShowWhatsAppOption] = useState(false);
  const [showItineraryForm, setShowItineraryForm] = useState(false);
  const [leadInfo, setLeadInfo] = useState<any>(null);
  const isMobile = useIsMobile();
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
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
        content: 'Hello! I\'m your personal travel assistant at MyNomadSafariHolidays. I\'m here to help you plan your perfect trip within your budget! 🌟\n\nWhether you\'re dreaming of Kerala\'s backwaters, Rajasthan\'s palaces, or international destinations like Bali and Dubai, I can help you find the perfect package that suits your needs and budget.\n\nTo get started, could you tell me your name and where you\'d like to travel?',
        timestamp: new Date()
      }]);
    }
  }, []);

  // Check for lead completion and show options
  useEffect(() => {
    const checkLeadCompletion = async () => {
      try {
        const { data, error } = await supabase
          .from('ai_chat_conversations')
          .select('*')
          .eq('session_id', sessionId)
          .single();

        if (data && !error) {
          setLeadInfo(data);
          
          // Show options if we have key information
          if (data.visitor_name && (data.visitor_email || data.visitor_phone) && data.destination) {
            setShowWhatsAppOption(true);
            setShowItineraryForm(true);
          }
        }
      } catch (error) {
        console.error('Error checking lead completion:', error);
      }
    };

    if (messages.length > 4) { // Check after a few exchanges
      checkLeadCompletion();
    }
  }, [messages, sessionId]);

  const sendTextMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message: inputMessage,
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
      toast.error('Sorry, I\'m having trouble connecting right now. Please try again in a moment.');
      
      // Add helpful fallback message
      const fallbackMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: 'I\'m here to help you plan your perfect trip! I can assist you with destinations like Kerala, Rajasthan, Goa, Bali, Dubai, and many more. What destination interests you, and what\'s your budget range?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppConnect = () => {
    const message = `Hi! I was chatting with your AI assistant about travel plans. Here are my details:
    
Name: ${leadInfo?.visitor_name || 'Not provided'}
Email: ${leadInfo?.visitor_email || 'Not provided'}
Phone: ${leadInfo?.visitor_phone || 'Not provided'}
Destination: ${leadInfo?.destination || 'Not specified'}
Travel Date: ${leadInfo?.travel_date || 'Not specified'}
Adults: ${leadInfo?.adults || 1}
Children: ${leadInfo?.children || 0}
Special Requests: ${leadInfo?.special_requests || 'None'}

Please help me with a personalized travel package!`;

    const whatsappUrl = `https://wa.me/+919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Update handoff status
    supabase
      .from('ai_chat_conversations')
      .update({ whatsapp_handoff: true, lead_status: 'whatsapp_connected' })
      .eq('session_id', sessionId)
      .then(() => {
        toast.success('Connected to WhatsApp! Our team will assist you shortly.');
      });
  };

  const handleItineraryRequest = () => {
    if (!leadInfo) return;
    
    // Generate sample itinerary data
    const itineraryData = {
      customerName: leadInfo.visitor_name || 'Guest',
      email: leadInfo.visitor_email || '',
      phone: leadInfo.visitor_phone || '',
      destination: leadInfo.destination || 'India',
      departureDate: leadInfo.travel_date || new Date().toISOString().split('T')[0],
      returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      adults: leadInfo.adults || 2,
      children: leadInfo.children || 0,
      totalCost: 45000,
      perPersonCost: 22500,
      hotelCategory: '3-Star',
      packageType: leadInfo.package_type || 'Standard',
      specialRequests: leadInfo.special_requests || '',
      sessionId: sessionId
    };

    // Call the PDF generation function
    supabase.functions.invoke('generate-itinerary-pdf', {
      body: itineraryData
    }).then(({ data, error }) => {
      if (error) {
        console.error('Error generating itinerary:', error);
        toast.error('Failed to generate itinerary. Please try again.');
      } else {
        toast.success('Itinerary sent to your email! Check your inbox.');
        
        // Update lead status
        supabase
          .from('ai_chat_conversations')
          .update({ lead_status: 'itinerary_sent' })
          .eq('session_id', sessionId);
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  };

  if (!isOpen) return null;

  // Mobile responsive styling
  const widgetClasses = isMobile 
    ? "fixed inset-x-2 bottom-20 top-20 shadow-xl z-50 flex flex-col bg-white rounded-lg max-h-[80vh]"
    : "fixed bottom-20 left-4 w-80 h-96 shadow-xl z-50 flex flex-col bg-white rounded-lg";

  return (
    <Card className={widgetClasses}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg px-3 py-2 flex-shrink-0">
        <CardTitle className={`font-semibold ${isMobile ? 'text-base' : 'text-sm'}`}>
          Travel Assistant
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-blue-800 p-1">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
        <ScrollArea className="flex-1 p-3 overflow-y-auto" ref={scrollAreaRef}>
          <div className="space-y-3 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`${isMobile ? 'max-w-[85%]' : 'max-w-[80%]'} p-2.5 rounded-lg shadow-sm ${
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
            {(showWhatsAppOption || showItineraryForm) && (
              <div className="space-y-2">
                {showItineraryForm && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center shadow-sm">
                    <p className="text-sm text-green-800 mb-2">
                      Get your detailed itinerary with pricing!
                    </p>
                    <Button 
                      onClick={handleItineraryRequest}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs mr-2"
                      size="sm"
                    >
                      📧 Send Itinerary
                    </Button>
                  </div>
                )}
                
                {showWhatsAppOption && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center shadow-sm">
                    <p className="text-sm text-blue-800 mb-2">
                      Ready for personalized assistance?
                    </p>
                    <Button 
                      onClick={handleWhatsAppConnect}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                      size="sm"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Connect via WhatsApp
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t bg-gray-50 p-3 flex-shrink-0">
          {leadInfo && (
            <div className="mb-2 p-2 bg-blue-50 rounded text-xs border border-blue-200">
              <div className="flex items-center gap-1 text-blue-700">
                <User className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">Info: {leadInfo.visitor_name || 'Name pending'}</span>
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            <Input
              placeholder={isMobile ? "Ask about travel..." : "Ask about destinations, packages, dates..."}
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
      </CardContent>
    </Card>
  );
};

export default AIChatWidget;
