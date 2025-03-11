
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const openWhatsApp = (office: 'delhi' | 'mumbai') => {
    const phoneNumber = office === 'delhi' ? "+919968682200" : "+917042910449";
    const message = "Hi! I'd like to know more about your travel packages.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-2 z-50">
      <Button 
        onClick={() => openWhatsApp('delhi')}
        className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center gap-2"
      >
        <MessageCircle className="h-5 w-5" />
        Chat Delhi Office
      </Button>
      <Button 
        onClick={() => openWhatsApp('mumbai')}
        className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center gap-2"
      >
        <MessageCircle className="h-5 w-5" />
        Chat Mumbai Office
      </Button>
    </div>
  );
};

export default WhatsAppButton;
