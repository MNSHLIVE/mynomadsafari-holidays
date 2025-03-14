import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatInterface from "./chat-interface";

const WhatsAppButton = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200"
        aria-label="Open WhatsApp Chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Interface */}
      {showChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <ChatInterface onClose={() => setShowChat(false)} />
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;
