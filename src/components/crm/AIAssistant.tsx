
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AIAssistantProps {
  onQuickEntry: (data: any) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onQuickEntry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your CRM AI assistant. I can help you add contacts, create tasks, set reminders, and answer questions about your travel business. What would you like to do?"
    }
  ]);

  const quickActions = [
    { label: 'Add New Contact', action: 'add_contact' },
    { label: 'Create Task', action: 'create_task' },
    { label: 'Set Reminder', action: 'set_reminder' },
    { label: 'Search Customer', action: 'search_customer' }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: message
    };

    // Simple AI response logic (in real implementation, this would call your AI service)
    let aiResponse = "I understand you want to: " + message + ". Let me help you with that.";
    
    if (message.toLowerCase().includes('add contact')) {
      aiResponse = "I'll help you add a new contact. Please provide the name, email, and phone number, and I'll create the entry for you.";
    } else if (message.toLowerCase().includes('task') || message.toLowerCase().includes('reminder')) {
      aiResponse = "I can create a task or reminder for you. What would you like to be reminded about and when?";
    } else if (message.toLowerCase().includes('search')) {
      aiResponse = "I can help you search for customers. What details do you remember about the customer you're looking for?";
    }

    const aiMessage = {
      id: messages.length + 2,
      type: 'ai',
      content: aiResponse
    };

    setMessages([...messages, userMessage, aiMessage]);
    setMessage('');
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      add_contact: "Great! To add a new contact, I'll need: Full Name, Email, Phone Number, and any notes. You can tell me these details and I'll create the contact for you.",
      create_task: "I'll help you create a task. What task do you need to create and when should it be completed?",
      set_reminder: "I can set a reminder for you. What should I remind you about and when?",
      search_customer: "I'll help you find a customer. What information do you have about them? (name, email, phone, or destination they've traveled to)"
    };

    const aiMessage = {
      id: messages.length + 1,
      type: 'ai',
      content: actionMessages[action as keyof typeof actionMessages]
    };

    setMessages([...messages, aiMessage]);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 z-50"
        size="lg"
      >
        <Sparkles className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-50 shadow-2xl transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-80 h-96'
    } sm:w-96`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-sm">AI Assistant</CardTitle>
            <Badge variant="secondary" className="text-xs">Online</Badge>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-4 flex flex-col h-80">
          {/* Quick Actions */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Quick Actions:</p>
            <div className="flex flex-wrap gap-1">
              {quickActions.map((action) => (
                <Button
                  key={action.action}
                  variant="outline"
                  size="sm"
                  className="text-xs h-6"
                  onClick={() => handleQuickAction(action.action)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-2 rounded-lg text-sm ${
                    msg.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-sm"
            />
            <Button size="sm" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
