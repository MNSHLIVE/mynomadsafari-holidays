
interface Window {
  elfsightWhatsAppChatConfig?: {
    phone: string;
    name: string;
    message: string;
    position: string;
    availability: string;
    welcomeMessage: string;
    buttonText: string;
    buttonIcon: string;
    buttonPosition: string;
    headerTitle: string;
    headerSubtitle: string;
    style: {
      buttonColor: string;
      headerColor: string;
    };
  };
  ElfSight?: any;
  ElfsightApp?: {
    initWidgets: () => void;
  };
}
