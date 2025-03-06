
import { Phone } from "lucide-react";
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
        className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
      >
        <Phone className="mr-2 h-4 w-4" />
        Chat Delhi Office
      </Button>
      <Button 
        onClick={() => openWhatsApp('mumbai')}
        className="rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
      >
        <Phone className="mr-2 h-4 w-4" />
        Chat Mumbai Office
      </Button>
    </div>
  );
};

export default WhatsAppButton;
