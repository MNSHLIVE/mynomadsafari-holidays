
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";

const InternationalPackageDetails = ({
  hotelCategory,
}: {
  hotelCategory: string;
}) => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="inclusions">
      <AccordionTrigger className="text-base font-medium">
        Package Inclusions
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-2 pl-2">
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
            <span>Accommodation in {hotelCategory} Hotel</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
            <span>Daily Breakfast</span>
          </li>
          <li className="flex items-start">
            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
            <span>
              Airport Transfers (Pick-up on arrival, Drop-off on departure)
            </span>
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="exclusions">
      <AccordionTrigger className="text-base font-medium">
        Package Exclusions
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-2 pl-2">
          <li className="flex items-start text-sm">
            <span className="text-red-500 mr-2">•</span>
            <span>International Return Airfare</span>
          </li>
          <li className="flex items-start text-sm">
            <span className="text-red-500 mr-2">•</span>
            <span>Visa Fees & Travel Insurance</span>
          </li>
          <li className="flex items-start text-sm">
            <span className="text-red-500 mr-2">•</span>
            <span>
              All Sightseeing & Local Transportation (other than specified airport
              transfers)
            </span>
          </li>
          <li className="flex items-start text-sm">
            <span className="text-red-500 mr-2">•</span>
            <span>Monument Entry Fees & Activity Tickets</span>
          </li>
          <li className="flex items-start text-sm">
            <span className="text-red-500 mr-2">•</span>
            <span>Lunches, Dinners & Beverages</span>
          </li>
          <li className="flex items-start text-sm">
            <span className="text-red-500 mr-2">•</span>
            <span>Personal Expenses (Tips, Shopping, Laundry, etc.)</span>
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export default InternationalPackageDetails;
