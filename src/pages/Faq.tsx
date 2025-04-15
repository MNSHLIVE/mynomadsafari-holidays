
import React from "react";
import { Helmet } from "react-helmet";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  const faqs = [
    {
      question: "How do I book a tour with My Nomadsafari Holidays?",
      answer: "You can book a tour through our website by selecting your desired package and filling out the booking form, or by contacting our customer service team via email or phone. We'll guide you through the process and provide all necessary information."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), bank transfers, and selected digital payment platforms. All payments are processed securely."
    },
    {
      question: "How much in advance should I book my tour?",
      answer: "For domestic tours, we recommend booking at least 2-4 weeks in advance. For international tours, especially during peak season, we suggest booking 2-3 months ahead to ensure availability and the best rates."
    },
    {
      question: "Is travel insurance necessary?",
      answer: "While travel insurance is not mandatory for all tours, we strongly recommend it. It provides protection against unforeseen circumstances such as trip cancellations, medical emergencies, lost luggage, and other unexpected events."
    },
    {
      question: "What should I pack for my trip?",
      answer: "Packing requirements vary by destination and season. Once your booking is confirmed, we'll provide a detailed packing list specific to your tour. Generally, comfortable clothing, appropriate footwear, essential medications, and travel documents are recommended."
    },
    {
      question: "Are meals included in the tour package?",
      answer: "Meal inclusions vary by package. Most of our tours include breakfast, while lunch and dinner may be included depending on the specific tour and package type you select. The meal plan will be clearly outlined in your tour itinerary."
    },
    {
      question: "Can I customize a tour package?",
      answer: "Yes! We specialize in creating customized travel experiences. Contact our team with your preferences, budget, and interests, and we'll design a personalized itinerary just for you."
    },
    {
      question: "What if I need to cancel my tour?",
      answer: "Our cancellation policy provides different refund amounts based on how far in advance you cancel. Please refer to our Refund Policy page for detailed information about cancellation timelines and associated refunds."
    },
    {
      question: "Do you provide visa assistance?",
      answer: "Yes, we provide visa assistance for international tours. While we cannot guarantee visa approval, we guide you through the process, provide the necessary documentation for your application, and offer advice based on our experience."
    },
    {
      question: "How many people will be in a tour group?",
      answer: "The size of our tour groups varies by package. Standard group tours typically have 10-20 travelers. Premium tours have smaller groups of 6-12 people. Private tours can be arranged for your party only."
    },
    {
      question: "Are your tours suitable for solo travelers?",
      answer: "Absolutely! Many of our clients are solo travelers. Our group tours are a great way to meet like-minded travelers, and we also offer specific packages designed for solo travelers with no single supplement."
    },
    {
      question: "Do you cater to dietary restrictions?",
      answer: "Yes, we can accommodate most dietary requirements including vegetarian, vegan, gluten-free, and allergies. Please inform us of any dietary restrictions when booking so we can make appropriate arrangements."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | My Nomadsafari Holidays</title>
        <meta 
          name="description" 
          content="Find answers to commonly asked questions about booking tours, payments, cancellations, and more with My Nomadsafari Holidays." 
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <Breadcrumb className="mb-8">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>FAQs</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="mb-8">
          <p className="text-lg text-muted-foreground">
            Find answers to the most common questions about our tours, booking process, and travel arrangements.
            If you can't find the answer you're looking for, please don't hesitate to contact our customer service team.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-6 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="mb-6">
            Our customer service team is ready to help you with any other questions you may have.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-card rounded-md">
              <h3 className="font-medium mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground">
                Send your questions to info@mynomadsafari.com and we'll respond within 24 hours.
              </p>
            </div>
            <div className="p-4 bg-card rounded-md">
              <h3 className="font-medium mb-2">Call Us</h3>
              <p className="text-sm text-muted-foreground">
                Talk to our travel experts at +1 (555) 123-4567, available Mon-Fri, 9am-6pm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
