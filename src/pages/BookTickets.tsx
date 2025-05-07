import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { CalendarIcon, Clock, Calendar, Route, Plane, Train, Bus, Users, User, UserRound, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/section-heading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  boardingFrom: z.string().min(2, { message: "Please enter boarding location" }),
  destination: z.string().min(2, { message: "Please enter destination" }),
  adults: z.string().min(1, { message: "Please enter number of adults" }),
  children: z.string(),
  date: z.date({
    required_error: "Please select a date",
  }),
  isSeniorCitizen: z.boolean().optional(),
  isArmyPersonnel: z.boolean().optional(),
  isDoctor: z.boolean().optional(),
  tourDestination: z.string().optional(),
  specialRequirements: z.string().optional(),
  name: z.string().min(2, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
});

type FormValues = z.infer<typeof formSchema>;

const BookTickets = () => {
  const [activeTabIndex, setActiveTabIndex] = useState("urgent");
  const [submittedData, setSubmittedData] = useState<{
    email: string;
    formType: string;
    shown: boolean;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<FormValues> = {
    adults: "1",
    children: "0",
    isSeniorCitizen: false,
    isArmyPersonnel: false,
    isDoctor: false,
  };

  const urgentForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const plannedForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  const futureForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: FormValues, formType: string) => {
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase.from('ticket_requests').insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        departure_city: values.boardingFrom,
        arrival_city: values.destination,
        travel_date: values.date ? format(values.date, "yyyy-MM-dd") : null,
        passengers: parseInt(values.adults) + (values.children ? parseInt(values.children) : 0),
        special_requirements: values.specialRequirements || null,
        ticket_type: formType
      });
      
      if (error) {
        console.error('Error saving ticket request to Supabase:', error);
        toast.error("There was an error saving your ticket request. Please try again later.", {
          description: error.message,
        });
      } else {
        toast.success("Ticket inquiry submitted successfully! We'll contact you soon.", {
          description: `Your ${formType} booking request has been received.`,
          duration: 5000,
        });
        
        setSubmittedData({
          email: values.email,
          formType,
          shown: true
        });
      }
    } catch (error) {
      console.error('Error in ticket request submission:', error);
      toast.error("An unexpected error occurred. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = (formType: string) => {
    if (formType === "urgent") urgentForm.reset();
    if (formType === "planned") plannedForm.reset();
    if (formType === "future") futureForm.reset();
    setSubmittedData(null);
  };

  const renderThankYouMessage = (formType: string) => {
    if (!submittedData || !submittedData.shown || activeTabIndex !== formType) return null;
    
    return (
      <Alert className="mb-6 bg-primary/5 border-primary/20">
        <CheckCircle className="h-5 w-5 text-primary" />
        <AlertTitle className="text-lg font-medium">Thank You for Your Booking Request!</AlertTitle>
        <AlertDescription className="space-y-3 mt-2">
          <p>We've received your {submittedData.formType} ticket booking request and will contact you at <span className="font-medium">{submittedData.email}</span> within 24 hours.</p>
          <p>Our travel experts will find the best options based on your requirements and provide you with detailed information.</p>
          <Button 
            onClick={() => resetForm(formType)} 
            variant="outline" 
            className="mt-2"
          >
            Submit Another Request
          </Button>
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <div className="container mx-auto py-12">
      <SectionHeading 
        title="Book Travel Tickets"
        subtitle="Air, Train, and Bus ticket booking services"
        align="center"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-12">
        <Card className="border-primary/20">
          <CardHeader className="bg-primary/5 flex flex-row items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Air Tickets</CardTitle>
              <CardDescription>Domestic & International flights</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="bg-green-500/20 p-1 rounded-full">✓</span>
                <span>Competitive pricing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-green-500/20 p-1 rounded-full">✓</span>
                <span>Special fares for groups</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-green-500/20 p-1 rounded-full">✓</span>
                <span>Web check-in assistance</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="bg-primary/5 flex flex-row items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Train className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Train Tickets</CardTitle>
              <CardDescription>Tatkal & advance bookings</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="bg-green-500/20 p-1 rounded-full">✓</span>
                <span>Regular & Tatkal bookings</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-green-500/20 p-1 rounded-full">✓</span>
                <span>Senior citizen quota</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-green-500/20 p-1 rounded-full">✓</span>
                <span>Confirmation prediction</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="bg-primary/5 flex flex-row items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Bus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Bus Tickets</CardTitle>
              <CardDescription>AC, sleeper & luxury buses</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="bg-green-500/20 p-1 rounded-full">✓</span>
                <span>Wide network coverage</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-green-500/20 p-1 rounded-full">✓</span>
                <span>AC & non-AC options</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-green-500/20 p-1 rounded-full">✓</span>
                <span>Prime seat selection</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/30 p-6 md:p-12 rounded-lg">
        <Tabs defaultValue="urgent" className="w-full" onValueChange={(value) => {
          setActiveTabIndex(value);
          setSubmittedData(prev => prev ? {...prev, shown: prev.formType === value} : null);
        }}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="urgent" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden md:inline">Urgent Booking</span>
              <span className="md:hidden">Urgent</span>
            </TabsTrigger>
            <TabsTrigger value="planned" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              <span className="hidden md:inline">With Tour Planning</span>
              <span className="md:hidden">With Tour</span>
            </TabsTrigger>
            <TabsTrigger value="future" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">Future Planning</span>
              <span className="md:hidden">Future</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="urgent">
            <Card>
              <CardHeader>
                <CardTitle>Urgent Ticket Booking</CardTitle>
                <CardDescription>Need tickets urgently? Fill this form for immediate assistance.</CardDescription>
              </CardHeader>
              <CardContent>
                {renderThankYouMessage("urgent")}
                {(!submittedData || !submittedData.shown || activeTabIndex !== "urgent") && (
                  <Form {...urgentForm}>
                    <form onSubmit={urgentForm.handleSubmit((values) => onSubmit(values, "urgent"))} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={urgentForm.control}
                          name="boardingFrom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Boarding From</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter city or station name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={urgentForm.control}
                          name="destination"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Destination</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter destination city" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={urgentForm.control}
                          name="adults"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Adults</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={urgentForm.control}
                          name="children"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Children</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={urgentForm.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Travel Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Select date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                    className="pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={urgentForm.control}
                          name="isSeniorCitizen"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Senior Citizen
                                </FormLabel>
                                <FormDescription>
                                  Age 60+ for special fares
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={urgentForm.control}
                          name="isArmyPersonnel"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Armed Forces
                                </FormLabel>
                                <FormDescription>
                                  For special quota and discounts
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={urgentForm.control}
                          name="isDoctor"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Medical Professional
                                </FormLabel>
                                <FormDescription>
                                  For priority booking
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={urgentForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={urgentForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={urgentForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Your contact number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={urgentForm.control}
                        name="specialRequirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requirements</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any specific requirements or notes" 
                                className="resize-none" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Urgent Booking Request"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="planned">
            <Card>
              <CardHeader>
                <CardTitle>Planning With Tour</CardTitle>
                <CardDescription>Book tickets alongside your tour planning for a seamless experience.</CardDescription>
              </CardHeader>
              <CardContent>
                {renderThankYouMessage("planned")}
                {(!submittedData || !submittedData.shown || activeTabIndex !== "planned") && (
                  <Form {...plannedForm}>
                    <form onSubmit={plannedForm.handleSubmit((values) => onSubmit(values, "planned tour"))} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={plannedForm.control}
                          name="boardingFrom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Boarding From</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter city or station name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={plannedForm.control}
                          name="destination"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Destination</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter destination city" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={plannedForm.control}
                          name="adults"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Adults</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={plannedForm.control}
                          name="children"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Children</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={plannedForm.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Travel Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Select date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                    className="pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={plannedForm.control}
                        name="tourDestination"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tour Destination</FormLabel>
                            <FormControl>
                              <Input placeholder="Where do you plan to tour?" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter the destination you're interested in touring
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={plannedForm.control}
                          name="isSeniorCitizen"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Senior Citizen
                                </FormLabel>
                                <FormDescription>
                                  Age 60+ for special fares
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={plannedForm.control}
                          name="isArmyPersonnel"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Armed Forces
                                </FormLabel>
                                <FormDescription>
                                  For special quota and discounts
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={plannedForm.control}
                          name="isDoctor"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Medical Professional
                                </FormLabel>
                                <FormDescription>
                                  For priority booking
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={plannedForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={plannedForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={plannedForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Your contact number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={plannedForm.control}
                        name="specialRequirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tour Requirements & Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us more about your tour plans and ticket requirements" 
                                className="resize-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Tour & Ticket Request"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="future">
            <Card>
              <CardHeader>
                <CardTitle>Future Planning (6+ months)</CardTitle>
                <CardDescription>Plan ahead for your future travels with our quote service.</CardDescription>
              </CardHeader>
              <CardContent>
                {renderThankYouMessage("future")}
                {(!submittedData || !submittedData.shown || activeTabIndex !== "future") && (
                  <Form {...futureForm}>
                    <form onSubmit={futureForm.handleSubmit((values) => onSubmit(values, "future planning"))} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={futureForm.control}
                          name="boardingFrom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Boarding From</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter city or station name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={futureForm.control}
                          name="destination"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Destination</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter destination city" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={futureForm.control}
                          name="adults"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Adults</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={futureForm.control}
                          name="children"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Children</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={futureForm.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Approximate Travel Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Select approximate date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                    className="pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormDescription>
                                Select an approximate date for your future travel
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={futureForm.control}
                        name="tourDestination"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tour Destination (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Where do you plan to tour?" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter if you're planning to tour at your destination
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={futureForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Your Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={futureForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={futureForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Your contact number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={futureForm.control}
                        name="specialRequirements"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requirements & Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us more about your future travel plans for a better quote" 
                                className="resize-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Request Quote for Future Travel"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BookTickets;
