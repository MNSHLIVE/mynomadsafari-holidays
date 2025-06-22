
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Mic, MicOff, Send, X, Volume2, VolumeX, User, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
  const [leadInfo, setLeadInfo] = useState<any>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        type: 'assistant',
        content: 'Hello! I\'m your personal travel assistant at MyNomadSafariHolidays. I\'m here to help you plan your perfect trip! 🌟\n\nWhether you\'re dreaming of Kerala\'s backwaters, Rajasthan\'s palaces, or international destinations like Bali and Dubai, I can help you find the perfect package.\n\nTo get started, could you tell me your name and where you\'d like to travel?',
        timestamp: new Date()
      }]);
    }
  }, []);

  // Check for lead completion and show WhatsApp option
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
          
          // Show WhatsApp option if we have key information
          if (data.visitor_name && (data.visitor_email || data.visitor_phone) && data.destination) {
            setShowWhatsAppOption(true);
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

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
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

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-20 left-4 w-80 h-96 shadow-lg z-50 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">AI Travel Assistant</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="text-xs">
            Lead Generation
          </Badge>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-3">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {showWhatsAppOption && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-sm text-green-800 mb-2">
                  Ready for personalized assistance?
                </p>
                <Button 
                  onClick={handleWhatsAppConnect}
                  className="bg-green-600 hover:bg-green-700 text-white text-xs"
                  size="sm"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Connect via WhatsApp
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="mt-3">
          {leadInfo && (
            <div className="mb-2 p-2 bg-blue-50 rounded text-xs">
              <div className="flex items-center gap-1 text-blue-700">
                <User className="h-3 w-3" />
                <span>Lead Info: {leadInfo.visitor_name || 'Name pending'}</span>
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            <Input
              placeholder="Ask about destinations, packages, dates..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendTextMessage()}
              disabled={isLoading}
              className="text-sm"
            />
            <Button onClick={sendTextMessage} disabled={isLoading || !inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatWidget;
