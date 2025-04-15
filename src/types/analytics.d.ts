
interface Window {
  gtag: (command: string, action: string, params?: any) => void;
  dataLayer: any[];
  fbq: (command: string, action: string, params?: any) => void;
  _fbq: any;
  elfsightWhatsAppChatConfig: any;
  ElfsightApp: {
    initWidgets: () => void;
  };
}
