export type User = {
  id: string;
  name: string;
  email: string;
  role: 'GENERAL_ADMIN' | 'SACCO_ADMIN' | 'GOVERNMENT_AGENT';
  avatar?: string;
};

export type Vehicle = {
  id: string;
  plateNumber: string;
  type: 'BUS' | 'MATATU' | 'TAXI';
  capacity: number;
  owner: string;
  saccoId: string;
  route: string;
  registrationDate: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'EXPIRED';
  lastPaymentDate?: string;
};

export type Payment = {
  id: string; // Assuming you want to generate an ID for your transactions
  number_plate: string; // Corresponds to "number_plate" in the API response
  amount: {$numberDecimal:number}; // Convert "$numberDecimal" to a number
  status:  'success' | 'failed'; // Match the "status" in the response
  createdAt: string; // Use "createdAt" as the date
  type: 'MONTHLY' | 'ANNUAL' | 'PENALTY' | 'TAX'; // Add "TAX" to the types
  narrative: string; // Add "narrative" from the response
};

export type Transaction = {
  transaction_id: string; 
  invoice: string | null; 
  currency: string; 
  value: number; 
  running_balance: number; 
  narrative: string; 
  trans_type:"SALE" | 'CHARGE'; 
  status: string; 
  created_at: string; 
  updated_at: string; 
};

export type SaccoAccount = {
  id: string;
  balance: number;
  lastRechargeDate: string;
  status: 'ACTIVE' | 'SUSPENDED';
};

export type Route = {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  distance: number;
  activeVehicles: number;
  dailyRevenue: number;
};