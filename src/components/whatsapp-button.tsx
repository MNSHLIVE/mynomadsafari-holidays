
import { Phone } from "lucide-react";

const WhatsAppButton = () => {
  const openWhatsApp = (phone: string) => {
    const message = encodeURIComponent("Hi! I'd like to know more about your travel packages.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button 
        onClick={() => openWhatsApp("919968682200")}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg transition-colors"
      >
        <Phone className="h-5 w-5" />
        <span className="hidden md:inline">Chat on WhatsApp (1)</span>
      </button>
      <button 
        onClick={() => openWhatsApp("917042910449")}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-lg transition-colors"
      >
        <Phone className="h-5 w-5" />
        <span className="hidden md:inline">Chat on WhatsApp (2)</span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
