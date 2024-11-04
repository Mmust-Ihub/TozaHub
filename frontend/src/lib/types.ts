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
  id: string;
  saccoId: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  description: string;
  date: string;
  balance: number;
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