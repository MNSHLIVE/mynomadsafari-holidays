
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Star,
  Edit,
  Eye,
  Trash2,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  segment: 'lead' | 'customer' | 'vip' | 'group';
  travelPreferences: {
    destinations: string[];
    budgetRange: string;
    travelStyle: string[];
    groupSize: number;
  };
  totalSpent: number;
  lastBooking: string;
  notes: string;
  interactions: number;
  createdAt: string;
}

interface ContactManagementProps {
  userRole: string;
}

export const ContactManagement: React.FC<ContactManagementProps> = ({ userRole }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'India',
    segment: 'lead',
    budgetRange: '',
    travelStyle: '',
    groupSize: 1,
    notes: ''
  });
  const { toast } = useToast();

  // Sample data
  const sampleContacts: Contact[] = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1-555-0123',
      country: 'USA',
      segment: 'vip',
      travelPreferences: {
        destinations: ['Bali', 'Thailand', 'Maldives'],
        budgetRange: '₹2,00,000 - ₹5,00,000',
        travelStyle: ['Luxury', 'Beach', 'Romantic'],
        groupSize: 2
      },
      totalSpent: 450000,
      lastBooking: '2024-01-15',
      notes: 'Prefers luxury accommodations, honeymooners',
      interactions: 12,
      createdAt: '2023-10-15'
    },
    {
      id: '2',
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike.chen@company.com',
      phone: '+65-8888-9999',
      country: 'Singapore',
      segment: 'customer',
      travelPreferences: {
        destinations: ['Europe', 'Japan', 'Australia'],
        budgetRange: '₹3,00,000 - ₹8,00,000',
        travelStyle: ['Adventure', 'Cultural', 'Photography'],
        groupSize: 4
      },
      totalSpent: 625000,
      lastBooking: '2024-02-01',
      notes: 'Family of 4, loves adventure tours',
      interactions: 8,
      createdAt: '2023-11-20'
    },
    {
      id: '3',
      firstName: 'Priya',
      lastName: 'Sharma',
      email: 'priya.sharma@gmail.com',
      phone: '+91-9876543210',
      country: 'India',
      segment: 'lead',
      travelPreferences: {
        destinations: ['Kashmir', 'Himachal', 'Uttarakhand'],
        budgetRange: '₹50,000 - ₹1,50,000',
        travelStyle: ['Mountains', 'Spiritual', 'Nature'],
        groupSize: 6
      },
      totalSpent: 0,
      lastBooking: '',
      notes: 'Interested in domestic hill stations, large family group',
      interactions: 3,
      createdAt: '2024-01-05'
    }
  ];

  useEffect(() => {
    setContacts(sampleContacts);
    setFilteredContacts(sampleContacts);
  }, []);

  useEffect(() => {
    let filtered = contacts;

    if (searchTerm) {
      filtered = filtered.filter(contact =>
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm)
      );
    }

    if (segmentFilter !== 'all') {
      filtered = filtered.filter(contact => contact.segment === segmentFilter);
    }

    setFilteredContacts(filtered);
  }, [contacts, searchTerm, segmentFilter]);

  const handleAddContact = () => {
    // Reset form and open dialog
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: 'India',
      segment: 'lead',
      budgetRange: '',
      travelStyle: '',
      groupSize: 1,
      notes: ''
    });
    setSelectedContact(null);
    setIsDialogOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      country: contact.country,
      segment: contact.segment,
      budgetRange: contact.travelPreferences.budgetRange,
      travelStyle: contact.travelPreferences.travelStyle.join(', '),
      groupSize: contact.travelPreferences.groupSize,
      notes: contact.notes
    });
    setSelectedContact(contact);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedContact) {
      // Update existing contact
      const updatedContacts = contacts.map(contact =>
        contact.id === selectedContact.id
          ? {
              ...contact,
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              country: formData.country,
              segment: formData.segment as Contact['segment'],
              travelPreferences: {
                ...contact.travelPreferences,
                budgetRange: formData.budgetRange,
                travelStyle: formData.travelStyle.split(',').map(s => s.trim()),
                groupSize: formData.groupSize
              },
              notes: formData.notes
            }
          : contact
      );
      setContacts(updatedContacts);
      toast({ title: "Contact updated successfully!" });
    } else {
      // Add new contact
      const newContact: Contact = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        segment: formData.segment as Contact['segment'],
        travelPreferences: {
          destinations: [],
          budgetRange: formData.budgetRange,
          travelStyle: formData.travelStyle.split(',').map(s => s.trim()).filter(Boolean),
          groupSize: formData.groupSize
        },
        totalSpent: 0,
        lastBooking: '',
        notes: formData.notes,
        interactions: 0,
        createdAt: new Date().toISOString()
      };
      setContacts([...contacts, newContact]);
      toast({ title: "Contact added successfully!" });
    }
    
    setIsDialogOpen(false);
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'customer': return 'bg-green-100 text-green-800';
      case 'group': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
          <p className="text-gray-600">Manage your travel clients and leads</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddContact}>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={segmentFilter} onValueChange={setSegmentFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by segment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Segments</SelectItem>
            <SelectItem value="lead">Leads</SelectItem>
            <SelectItem value="customer">Customers</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
            <SelectItem value="group">Groups</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{contact.firstName} {contact.lastName}</CardTitle>
                  <Badge className={getSegmentColor(contact.segment)}>
                    {contact.segment.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEditContact(contact)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {contact.country}
                </div>
              </div>

              {/* Travel Preferences */}
              <div className="border-t pt-3">
                <p className="text-xs font-medium text-gray-500 mb-2">TRAVEL PREFERENCES</p>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Budget:</span> {contact.travelPreferences.budgetRange}</p>
                  <p><span className="font-medium">Group Size:</span> {contact.travelPreferences.groupSize}</p>
                  <div className="flex flex-wrap gap-1">
                    {contact.travelPreferences.travelStyle.map((style, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center pt-3 border-t text-sm">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span>₹{contact.totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span>{contact.interactions} interactions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Contact Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedContact ? 'Edit Contact' : 'Add New Contact'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="segment">Segment</Label>
                <Select value={formData.segment} onValueChange={(value) => setFormData({ ...formData, segment: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budgetRange">Budget Range</Label>
                <Input
                  id="budgetRange"
                  placeholder="e.g., ₹1,00,000 - ₹3,00,000"
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="groupSize">Group Size</Label>
                <Input
                  id="groupSize"
                  type="number"
                  min="1"
                  value={formData.groupSize}
                  onChange={(e) => setFormData({ ...formData, groupSize: parseInt(e.target.value) || 1 })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="travelStyle">Travel Style (comma-separated)</Label>
              <Input
                id="travelStyle"
                placeholder="e.g., Luxury, Adventure, Cultural"
                value={formData.travelStyle}
                onChange={(e) => setFormData({ ...formData, travelStyle: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedContact ? 'Update Contact' : 'Add Contact'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
