import { useState } from "react";
import SectionHeading from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number."
  }),
  subject: z.string({
    required_error: "Please select a subject."
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters."
  }),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/30 text-secondary-foreground mb-3">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground">
            We'd love to hear from you. Let us know how we can help with your travel plans.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card border border-border/50 rounded-xl p-8 shadow-sm h-fit">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="mx-auto w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Message Sent!</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Thank you for contacting us. We'll get back to you as soon as possible, usually within 24 hours.
                </p>
                <Button 
                  className="mt-4" 
                  onClick={() => {
                    setIsSubmitted(false);
                    form.reset();
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="booking">Tour Booking</SelectItem>
                                <SelectItem value="visa">Visa Assistance</SelectItem>
                                <SelectItem value="custom">Custom Package</SelectItem>
                                <SelectItem value="feedback">Feedback</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full md:w-auto">Send Message</Button>
                  </form>
                </Form>
              </>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-full mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Our Location</h3>
                    <address className="text-muted-foreground not-italic">
                      123 Travel Street, Wanderlust City<br />
                      Mumbai, Maharashtra 10001
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-full mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground">+1 (555) 987-6543</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-full mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">info@wanderluxetravel.com</p>
                    <p className="text-muted-foreground">support@wanderluxetravel.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-primary/10 rounded-full mr-4 flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Office Hours</h3>
                    <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
              <div className="flex space-x-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-muted rounded-full hover:bg-primary/10 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-primary" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-muted rounded-full hover:bg-primary/10 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-primary" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-muted rounded-full hover:bg-primary/10 transition-colors"
                >
                  <Twitter className="h-5 w-5 text-primary" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-muted rounded-full hover:bg-primary/10 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Find Us</h2>
              <div className="rounded-xl overflow-hidden border border-border/50 h-[300px] bg-muted">
                {/* Replace this with an actual map component if available */}
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <p className="text-muted-foreground">Map loading...</p>
                  {/* You can integrate Google Maps or another map service here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about contacting us"
          />

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How quickly will you respond to my inquiry?",
                answer: "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly for immediate assistance."
              },
              {
                question: "Can I schedule a video call consultation?",
                answer: "Yes, we offer video call consultations to discuss your travel plans in detail. You can request a video call by selecting 'Video Consultation' in the subject field of our contact form."
              },
              {
                question: "Do you offer after-hours emergency support?",
                answer: "Yes, we provide emergency support for our clients who are currently traveling. The emergency contact details are provided in your travel documents."
              },
              {
                question: "Can I visit your office without an appointment?",
                answer: "While walk-ins are welcome during office hours, we recommend scheduling an appointment to ensure that a travel specialist is available to assist you properly."
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-card border border-border/50 rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
