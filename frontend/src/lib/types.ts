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
  id: string;
  vehicleId: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  date: string;
  type: 'MONTHLY' | 'ANNUAL' | 'PENALTY';
  reference: string;
};

export type Transaction = {
  transaction_id: string; // matches "transaction_id" in response
  invoice: string | null; // "invoice" can be null
  currency: string; // "currency" field
  value: number; // corresponds to "value"
  running_balance: number; // matches "running_balance"
  narrative: string; // corresponds to "narrative"
  trans_type:"SALE" | 'CHARGE'; // map "trans_type"
  status: string; // "status" field
  created_at: string; // matches "created_at" timestamp
  updated_at: string; // matches "updated_at" timestamp
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