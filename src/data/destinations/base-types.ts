
import { DestinationData } from "@/components/tour-itineraries/types";

export const formatPrice = (price: string | number): string => {
  if (typeof price === 'string') {
    if (price.includes('₹')) return price;
    return `₹${price}`;
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

