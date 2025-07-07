import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, Calculator, FileText, Phone, User, Plane, Train, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';
import EmbeddedCalculator from './embedded-calculator';
import ContactForm from './contact-form';

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
  const [showContactForm, setShowContactForm] = useState(false);
  const [userDetails, setUserDetails] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [calculatedData, setCalculatedData] = useState<any>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const isMobile = useIsMobile();
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Optimized quick replies for faster engagement
  const quickReplies = [
    "Kerala trip cost?",
    "Rajasthan packages", 
    "Bali pricing",
    "Dubai deals",
    "Goa packages",
    "Visa help",
    "Flight booking"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Shorter, focused welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        type: 'assistant',
        content: 'Hi! I\'m your travel assistant. Share your destination interest and get instant quotes! 🌟\n\nFirst, please share your contact details using "Your Details" button below.',
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
          conversationData: messages.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content,
            timestamp: msg.timestamp.toISOString()
          }))
        }
      });

      if (error) {
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
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Short fallback message
      const fallbackMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: 'Quick help available! Contact: Delhi +91-9968682200 | Mumbai +91-7042910449. Which destination interests you?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
      toast.info('Chat ready! Ask about any destination or use booking forms.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendTextMessage = () => sendMessage(inputMessage);
  const sendQuickReply = (reply: string) => sendMessage(reply);

  const handleContactSubmit = (contactData: { name: string; email: string; phone: string }) => {
    setUserDetails(contactData);
    setShowContactForm(false);
    
    // Store user details
    const storeUserDetails = async () => {
      try {
        await supabase
          .from('ai_chat_conversations')
          .upsert({
            session_id: sessionId,
            visitor_name: contactData.name,
            visitor_email: contactData.email,
            visitor_phone: contactData.phone,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'session_id'
          });
      } catch (error) {
        console.error('Failed to store user details:', error);
      }
    };
    
    storeUserDetails();
    
    const contactMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: `Thanks ${contactData.name}! Now tell me your dream destination and I'll share instant pricing! 🏖️`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, contactMessage]);
  };

  const handleCalculatorResult = (data: any) => {
    setCalculatedData(data);
    setShowCalculator(false);
    
    const costMessage = `${data.destination} trip: ₹${data.totalCost.toLocaleString()} total (₹${data.perPersonCost.toLocaleString()}/person)\n${data.adults} adults${data.children > 0 ? `, ${data.children} kids` : ''}\n\nReady to book? Contact: Delhi +91-9968682200 | Mumbai +91-7042910449`;

    const calculatorMessage: Message = {
      id: (Date.now() + 3).toString(),
      type: 'assistant',
      content: costMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, calculatorMessage]);
  };

  const generateItineraryPDF = async () => {
    if (!calculatedData || !userDetails) {
      if (!userDetails) {
        setShowContactForm(true);
        return;
      }
      toast.error('Please calculate trip cost first');
      return;
    }
    
    try {
      const itineraryData = {
        customerName: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
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
        toast.error('Failed to generate itinerary. Please try again.');
      } else {
        toast.success('Itinerary sent to your email!');
        
        const pdfMessage: Message = {
          id: (Date.now() + 4).toString(),
          type: 'assistant',
          content: `PDF sent! Your ${calculatedData.destination} itinerary with ₹${calculatedData.totalCost.toLocaleString()} costing is in your email. Ready to book?`,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, pdfMessage]);
      }
    } catch (error) {
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const openWhatsApp = (office: 'delhi' | 'mumbai') => {
    const phoneNumber = office === 'delhi' ? "+919968682200" : "+917042910449";
    const message = userDetails ? 
      `Hi! I'm ${userDetails.name}. Interested in ${calculatedData?.destination || 'travel'} packages. Email: ${userDetails.email}, Phone: ${userDetails.phone}` :
      "Hi! Interested in travel packages. Please share details.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const openBookingForm = (type: 'visa' | 'flight' | 'train') => {
    const urls = {
      visa: '/visa',
      flight: '/book-tickets',
      train: '/book-tickets'
    };
    window.open(urls[type], '_blank');
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
        {showContactForm ? (
          <div className="p-3">
            <ContactForm 
              onSubmit={handleContactSubmit}
              onClose={() => setShowContactForm(false)}
            />
          </div>
        ) : showCalculator ? (
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

                {/* Streamlined action buttons */}
                <div className="space-y-2">
                  <div className="flex gap-2 flex-wrap">
                    {!userDetails && (
                      <Button 
                        onClick={() => setShowContactForm(true)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-xs"
                      >
                        <User className="h-3 w-3 mr-1" />
                        Your Details
                      </Button>
                    )}
                    
                    <Button 
                      onClick={() => userDetails ? setShowCalculator(true) : setShowContactForm(true)}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                    >
                      <Calculator className="h-3 w-3 mr-1" />
                      Quick Quote
                    </Button>
                    
                    {calculatedData && userDetails && (
                      <Button 
                        onClick={generateItineraryPDF}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-xs"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Get PDF
                      </Button>
                    )}
                  </div>

                  {/* Quick booking buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <Button 
                      onClick={() => openWhatsApp('delhi')}
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-xs"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Delhi
                    </Button>
                    <Button 
                      onClick={() => openWhatsApp('mumbai')}
                      size="sm"
                      className="bg-green-500 hover:bg-green-600 text-xs"
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Mumbai
                    </Button>
                    <Button 
                      onClick={() => openBookingForm('visa')}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-xs"
                    >
                      Visa
                    </Button>
                  </div>
                </div>

                {/* Optimized Quick Replies */}
                {showQuickReplies && messages.length <= 2 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600 px-1">Popular destinations:</p>
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
                  placeholder={isMobile ? "Ask about destinations..." : "Which destination interests you?"}
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
