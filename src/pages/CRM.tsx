
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  Tag, 
  Mail, 
  Bell,
  ChevronDown,
  Search,
  Clock,
  FileText,
  MessageSquare,
  Clock as ClockIcon,
  CheckCircle,
  X,
  MapPin
} from "lucide-react";

// Mock data for demonstration purposes
const mockCustomers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    bookings: 3,
    status: "active",
    preferences: ["Beach", "Luxury"],
    lastContact: "2023-04-10"
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@example.com",
    phone: "+91 87654 32109",
    bookings: 1,
    status: "new",
    preferences: ["Mountain", "Adventure"],
    lastContact: "2023-04-15"
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit@example.com",
    phone: "+91 76543 21098",
    bookings: 2,
    status: "inactive",
    preferences: ["Cultural", "Family"],
    lastContact: "2023-03-22"
  },
  {
    id: 4,
    name: "Neha Singh",
    email: "neha@example.com",
    phone: "+91 65432 10987",
    bookings: 5,
    status: "active",
    preferences: ["Luxury", "International"],
    lastContact: "2023-04-18"
  }
];

const mockBookings = [
  {
    id: 101,
    customer: "Rahul Sharma",
    destination: "Goa",
    status: "confirmed",
    bookingDate: "2023-04-01",
    travelDate: "2023-05-15",
    amount: "₹45,000",
    paymentStatus: "paid"
  },
  {
    id: 102,
    customer: "Priya Patel",
    destination: "Himachal Pradesh",
    status: "pending",
    bookingDate: "2023-04-10",
    travelDate: "2023-06-05",
    amount: "₹35,000",
    paymentStatus: "partial"
  },
  {
    id: 103,
    customer: "Amit Kumar",
    destination: "Kerala",
    status: "cancelled",
    bookingDate: "2023-03-15",
    travelDate: "2023-04-20",
    amount: "₹52,000",
    paymentStatus: "refunded"
  },
  {
    id: 104,
    customer: "Neha Singh",
    destination: "Singapore",
    status: "confirmed",
    bookingDate: "2023-04-12",
    travelDate: "2023-07-10",
    amount: "₹1,25,000",
    paymentStatus: "paid"
  }
];

const mockInquiries = [
  {
    id: 201,
    name: "Vikram Singhania",
    email: "vikram@example.com",
    phone: "+91 98765 12345",
    destination: "Dubai",
    status: "new",
    date: "2023-04-19",
    source: "Website"
  },
  {
    id: 202,
    name: "Shreya Gupta",
    email: "shreya@example.com",
    phone: "+91 87654 23456",
    destination: "Thailand",
    status: "contacted",
    date: "2023-04-18",
    source: "Social Media"
  },
  {
    id: 203,
    name: "Rohan Kapoor",
    email: "rohan@example.com",
    phone: "+91 76543 34567",
    destination: "Bali",
    status: "follow-up",
    date: "2023-04-17",
    source: "Referral"
  }
];

const CRM = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  // Status badge component with appropriate colors
  const StatusBadge = ({ status }: { status: string }) => {
    let color = "";
    switch (status.toLowerCase()) {
      case "active":
      case "confirmed":
      case "paid":
      case "contacted":
        color = "bg-green-100 text-green-800 border-green-200";
        break;
      case "new":
        color = "bg-blue-100 text-blue-800 border-blue-200";
        break;
      case "pending":
      case "follow-up":
      case "partial":
        color = "bg-yellow-100 text-yellow-800 border-yellow-200";
        break;
      case "inactive":
      case "cancelled":
      case "refunded":
        color = "bg-red-100 text-red-800 border-red-200";
        break;
      default:
        color = "bg-gray-100 text-gray-800 border-gray-200";
    }
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${color} border`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CRM Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-primary">WanderLuxe Travel CRM</h1>
            <Badge variant="outline" className="ml-2">Beta</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button size="sm" variant="ghost">
              <Bell className="h-5 w-5 mr-1" />
              <span className="sr-only">Notifications</span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                A
              </div>
              <span className="font-medium">Admin</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        {/* Search and Quick Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search customers, bookings, or inquiries..." 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button size="sm">
              <Users className="h-4 w-4 mr-1" />
              New Customer
            </Button>
            <Button size="sm" variant="outline">
              <FileText className="h-4 w-4 mr-1" />
              New Booking
            </Button>
          </div>
        </div>
        
        {/* Main CRM Tabs */}
        <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="emails">Email Templates</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Total Customers</p>
                    <h3 className="text-3xl font-bold">{mockCustomers.length}</h3>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Badge variant="outline" className="mr-2 bg-green-50 text-green-700 border-green-200">+2 new</Badge>
                  <span className="text-gray-500">this week</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Active Bookings</p>
                    <h3 className="text-3xl font-bold">
                      {mockBookings.filter(b => b.status === "confirmed").length}
                    </h3>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200">
                    {mockBookings.filter(b => b.status === "pending").length} pending
                  </Badge>
                  <span className="text-gray-500">confirmation</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">New Inquiries</p>
                    <h3 className="text-3xl font-bold">
                      {mockInquiries.filter(i => i.status === "new").length}
                    </h3>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Badge variant="outline" className="mr-2 bg-yellow-50 text-yellow-700 border-yellow-200">
                    {mockInquiries.filter(i => i.status === "follow-up").length} follow-ups
                  </Badge>
                  <span className="text-gray-500">needed</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Recent Inquiries</h3>
                <div className="space-y-4">
                  {mockInquiries.slice(0, 3).map((inquiry) => (
                    <div key={inquiry.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <div>
                        <p className="font-medium">{inquiry.name}</p>
                        <p className="text-sm text-gray-500">
                          <MapPin className="inline h-3 w-3 mr-1" />
                          {inquiry.destination}
                        </p>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={inquiry.status} />
                        <p className="text-xs text-gray-500 mt-1">{inquiry.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="mt-4 w-full">View All Inquiries</Button>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Upcoming Trips</h3>
                <div className="space-y-4">
                  {mockBookings.filter(b => b.status === "confirmed").slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                      <div>
                        <p className="font-medium">{booking.customer}</p>
                        <p className="text-sm text-gray-500">
                          <MapPin className="inline h-3 w-3 mr-1" />
                          {booking.destination}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{booking.travelDate}</p>
                        <p className="text-xs text-gray-500 mt-1">{booking.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="mt-4 w-full">View All Bookings</Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Customers Tab */}
          <TabsContent value="customers">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium">All Customers</h2>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Tag className="h-4 w-4 mr-1" />
                    Add Tag
                  </Button>
                  <Button size="sm" variant="outline">Export</Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Preferences</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-500">{customer.email}</p>
                          <p className="text-xs text-gray-500">{customer.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={customer.status} />
                      </TableCell>
                      <TableCell>{customer.bookings}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {customer.preferences.map((pref, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {pref}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{customer.lastContact}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium">All Bookings</h2>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">Filter</Button>
                  <Button size="sm" variant="outline">Export</Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Travel Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>#{booking.id}</TableCell>
                      <TableCell>{booking.customer}</TableCell>
                      <TableCell>{booking.destination}</TableCell>
                      <TableCell>
                        <StatusBadge status={booking.status} />
                      </TableCell>
                      <TableCell>{booking.travelDate}</TableCell>
                      <TableCell>{booking.amount}</TableCell>
                      <TableCell>
                        <StatusBadge status={booking.paymentStatus} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Inquiries Tab */}
          <TabsContent value="inquiries">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium">All Inquiries</h2>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">Filter</Button>
                  <Button size="sm" variant="outline">Export</Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInquiries.map((inquiry) => (
                    <TableRow key={inquiry.id}>
                      <TableCell>#{inquiry.id}</TableCell>
                      <TableCell>{inquiry.name}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{inquiry.email}</p>
                          <p className="text-xs text-gray-500">{inquiry.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{inquiry.destination}</TableCell>
                      <TableCell>
                        <StatusBadge status={inquiry.status} />
                      </TableCell>
                      <TableCell>{inquiry.date}</TableCell>
                      <TableCell>{inquiry.source}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Email</span>
                          </Button>
                          <Button size="sm" variant="ghost">View</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          {/* Email Templates Tab */}
          <TabsContent value="emails">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  name: "Booking Confirmation",
                  description: "Sent when a booking is confirmed",
                  lastEdited: "2023-04-15"
                },
                {
                  id: 2,
                  name: "Payment Reminder",
                  description: "Sent to remind of pending payments",
                  lastEdited: "2023-04-10"
                },
                {
                  id: 3,
                  name: "Travel Tips",
                  description: "Pre-departure information for travelers",
                  lastEdited: "2023-04-05"
                },
                {
                  id: 4,
                  name: "Welcome Email",
                  description: "Sent to new customers after registration",
                  lastEdited: "2023-03-28"
                },
                {
                  id: 5,
                  name: "Feedback Request",
                  description: "Sent after trip completion",
                  lastEdited: "2023-03-20"
                },
                {
                  id: 6,
                  name: "Special Offer",
                  description: "Template for promotional offers",
                  lastEdited: "2023-04-18"
                }
              ].map((template) => (
                <div key={template.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium">{template.name}</h3>
                    <Button size="sm" variant="ghost">Edit</Button>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{template.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      Last edited: {template.lastEdited}
                    </span>
                    <Button size="sm" variant="outline">Preview</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Create New Template
              </Button>
            </div>
          </TabsContent>
          
          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
              <h3 className="text-lg font-medium mb-4">Email Integration</h3>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Mail className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Hostinger Email Integration</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>To connect your Hostinger email account to the CRM, you'll need to:</p>
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                          <li>Set up SMTP credentials in Supabase Edge Functions</li>
                          <li>Configure your Hostinger email settings for API access</li>
                          <li>Add your SMTP details to the secure environment variables</li>
                        </ol>
                      </div>
                      <div className="mt-3">
                        <Button size="sm" variant="outline">
                          Configure Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Popular Destinations</h3>
                <div className="space-y-4">
                  {["Goa", "Himachal Pradesh", "Kerala", "Singapore", "Thailand"].map((destination, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{destination}</span>
                      <div className="w-48 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${Math.floor(Math.random() * 60 + 40)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium mb-4">Inquiry Sources</h3>
                <div className="space-y-4">
                  {[
                    { name: "Website", percentage: 65 },
                    { name: "Social Media", percentage: 22 },
                    { name: "Referrals", percentage: 8 },
                    { name: "Other", percentage: 5 }
                  ].map((source, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{source.name}</span>
                      <div className="w-48 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CRM;
