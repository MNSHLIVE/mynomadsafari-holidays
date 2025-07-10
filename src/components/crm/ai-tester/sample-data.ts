
export const sampleCustomers = [
  {
    firstName: 'Rajesh',
    lastName: 'Gupta',
    email: `rajesh.gupta.${Date.now()}@example.com`,
    phone: '+91-9876543210',
    country: 'India',
    notes: 'Interested in Rajasthan heritage tours with family'
  },
  {
    firstName: 'Anita',
    lastName: 'Sharma',
    email: `anita.sharma.${Date.now()}@example.com`,
    phone: '+91-8765432109',
    country: 'India',
    notes: 'Honeymoon package for Maldives, prefers luxury resorts'
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    email: `michael.johnson.${Date.now()}@example.com`,
    phone: '+1-555-0123',
    country: 'USA',
    notes: 'Wildlife photography tour in Kerala backwaters'
  }
];

export const sampleBookings = [
  {
    tripName: 'Golden Triangle Explorer',
    destination: 'Delhi-Agra-Jaipur',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    packageCost: 85000,
    status: 'confirmed' as const,
    paymentStatus: 'partial',
    notes: 'Heritage tour with luxury hotels'
  },
  {
    tripName: 'Kerala Backwater Luxury',
    destination: 'Kerala',
    startDate: '2024-04-01',
    endDate: '2024-04-08',
    packageCost: 125000,
    status: 'new' as const,
    paymentStatus: 'pending',
    notes: 'Premium houseboat with Ayurvedic spa'
  }
];
