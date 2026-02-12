import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/section-heading";
import CTASection from "@/components/cta-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { CalendarIcon, CheckCircle, Globe, FileText, Stamp, Clock, ArrowLeft, Home } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

const visaServices = [
  {
    title: "Tourist Visa",
    description: "For leisure travel, visiting friends and family, or sightseeing.",
    icon: <Globe className="h-8 w-8 text-primary" />,
    countries: ["Thailand", "Singapore", "Dubai", "Malaysia", "Bali", "Vietnam", "Australia", "USA", "UK", "Europe"]
  },
  {
    title: "Business Visa",
    description: "For business meetings, conferences, or setting up businesses abroad.",
    icon: <FileText className="h-8 w-8 text-primary" />,
    countries: ["USA", "UK", "Europe", "Singapore", "Dubai", "Australia", "Canada"]
  },
  {
    title: "Work Visa",
    description: "For employment opportunities in foreign countries.",
    icon: <Stamp className="h-8 w-8 text-primary" />,
    countries: ["USA", "UK", "Canada", "Australia", "Dubai", "Singapore"]
  },
  {
    title: "Express Processing",
    description: "Expedited visa processing for urgent travel needs.",
    icon: <Clock className="h-8 w-8 text-primary" />,
    countries: ["Thailand", "Singapore", "Dubai", "Malaysia"]
  }
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  nationality: z.string({ required_error: "Please enter your nationality." }),
  destination: z.string({ required_error: "Please select a destination." }),
  travelDate: z.date({ required_error: "Please select a travel date." }),
  visaType: z.string({ required_error: "Please select a visa type." }),
  message: z.string().optional(),
});

const Visa = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      nationality: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const { data, error } = await supabase
        .from("Visa_Inquiry_Form")
        .insert({
          name: values.name,
          email: values.email,
          phone: values.phone,
          nationality: values.nationality,
          destination_country: values.destination,
          travel_date: values.travelDate.toISOString(),
          visa_type: values.visaType,
          special_requirements: values.message,
        });

      if (error) throw error;
      
      setSubmittedEmail(values.email);
      setIsSubmitted(true);
      toast({
        title: "Visa inquiry submitted",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error("Error submitting visa inquiry:", error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your inquiry. Please try again.",
        variant: "destructive"
      });
    }
  }

  const resetForm = () => {
    form.reset();
    setIsSubmitted(false);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 container mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/"><ArrowLeft className="h-4 w-4 mr-1" />Back to Home</Link>
          </Button>
        </div>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3">
            Visa Services
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Hassle-Free Visa Assistance
          </h1>
          <p className="text-xl text-muted-foreground">
            Let us handle your visa application process while you plan your dream vacation
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-8">
            <SectionHeading
              title="Our Visa Services"
              subtitle="We provide comprehensive visa assistance for various countries"
              align="left"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visaServices.map((service, index) => (
                <div key={index} className="p-6 border border-border/50 rounded-xl bg-card shadow-sm hover-scale h-full">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Available for:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.countries.slice(0, 5).map((country, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-secondary/20 rounded-full">{country}</span>
                      ))}
                      {service.countries.length > 5 && (
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">+{service.countries.length - 5} more</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted/30 p-6 rounded-xl mt-10">
              <h3 className="text-xl font-semibold mb-4">Why Choose Our Visa Service?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Expert guidance on visa requirements",
                  "Assistance with documentation",
                  "Application form filling support",
                  "Regular updates on application status",
                  "Visa interview preparation",
                  "Express processing options",
                  "High success rate",
                  "Affordable service fees"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm sticky top-20">
              {isSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Thank You for Your Visa Inquiry!</h3>
                  <Alert className="bg-primary/5 border-primary/20 text-left">
                    <AlertDescription className="space-y-3">
                      <p>We've received your visa assistance request and will contact you at <span className="font-medium">{submittedEmail}</span> within 24 hours.</p>
                      <p>Our visa experts will review your requirements and provide personalized guidance for your application process.</p>
                    </AlertDescription>
                  </Alert>
                  <Button className="mt-4" onClick={resetForm}>Submit Another Inquiry</Button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-6">Visa Inquiry Form</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+1 (555) 123-4567" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="nationality" render={({ field }) => (
                        <FormItem><FormLabel>Nationality</FormLabel><FormControl><Input placeholder="Enter your nationality" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="destination" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Destination Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger></FormControl>
                            <SelectContent>
                              {["Thailand", "Singapore", "Dubai", "Malaysia", "Bali", "Vietnam", "Australia", "USA", "UK", "Europe", "Canada"].map((country) => (
                                <SelectItem key={country} value={country}>{country}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="travelDate" render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Expected Travel Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant="outline" className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="visaType" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Visa Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select visa type" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="tourist">Tourist Visa</SelectItem>
                              <SelectItem value="business">Business Visa</SelectItem>
                              <SelectItem value="work">Work Visa</SelectItem>
                              <SelectItem value="student">Student Visa</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem><FormLabel>Additional Information</FormLabel><FormControl><Textarea placeholder="Any specific requirements or questions..." className="resize-none" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="submit" className="w-full">Submit Inquiry</Button>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="How It Works"
            subtitle="Simple steps to get your visa sorted"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
            {[
              { step: "1", title: "Submit Inquiry", description: "Fill in your travel details and visa requirements" },
              { step: "2", title: "Document Review", description: "Our experts review your documents and requirements" },
              { step: "3", title: "Application Process", description: "We handle the complete application and submission" },
              { step: "4", title: "Visa Delivered", description: "Receive your visa and travel with peace of mind" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-14 h-14 flex items-center justify-center bg-primary text-primary-foreground rounded-full text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need Visa Assistance?"
        description="Contact us today for hassle-free visa processing and expert guidance for your international travel."
        buttonText="Contact Us"
        buttonLink="/contact"
        align="center"
      />
    </>
  );
};

export default Visa;
