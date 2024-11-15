import { useEffect, useState } from "react";
import { BarChart, CreditCard, Search } from "lucide-react";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import type { Payment, Transaction } from "../../lib/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import useAuthToken from "../../hooks/useAuth";
import { PaymentModal } from "./PaymentModal";

type Summary = {
  current_balance: number;
  totalUnpaid: { $numberDecimal: string };
  pending: number;
};

export function PaymentsPage() {
  const { getItem } = useAuthToken();
  const { token,userEmail} = getItem();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [email,setEmail] = useState({
      "email":"omoshjoe02@gmail.com"
  })



  const [payments] = useState<Payment[]>([
    {
      id: "1",
      vehicleId: "KBZ 123A",
      amount: 2500,
      status: "COMPLETED",
      date: "2024-02-15",
      type: "MONTHLY",
      reference: "PAY-001",
    },
    {
      id: "2",
      vehicleId: "KCA 456B",
      amount: 3000,
      status: "PENDING",
      date: "2024-02-16",
      type: "MONTHLY",
      reference: "PAY-002",
    },
  ]);

  const [transactions,setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      saccoId: "SACCO001",
      amount: 50000,
      type: "CREDIT",
      description: "Account recharge",
      date: "2024-02-15",
      balance: 50000,
    },
    {
      id: "2",
      saccoId: "SACCO001",
      amount: 2500,
      type: "DEBIT",
      description: "Vehicle KBZ 123A monthly payment",
      date: "2024-02-15",
      balance: 47500,
    },
  ]);

  const fetchSummary = async()=>{
    const response = await fetch('http://164.92.165.41/api/v1/sacco/summary', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"email": "omoshjoe02@gmail.com"})
    });

    const newSummary = await response.json()

    console.log(newSummary)



    if(response.ok){
      setSummary(newSummary)
    }
  }

  useEffect(()=>{
    fetchSummary()
  },[])

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Revenue",
        data: [65000, 59000, 80000, 81000, 56000, 75000],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  const handleNewPayment = async (data: any) => {
    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      ...data,
      saccoId: "SACCO001",
      description: "Account recharge",
      date: new Date().toISOString().split("T")[0],
      balance:10000,
      type:'DEBIT'
    };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Financial Management
          </h1>
          <p className="text-muted-foreground">
            Track payments, transactions, and financial reports
          </p>
        </div>
        <Button onClick={() => setShowPaymentModal(true)}>
          <CreditCard className="mr-2 h-4 w-4" />
          Record Payment
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Account Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {summary?.current_balance || 0}</div>
            <p className="text-xs text-gray-500">Available funds</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 75,000</div>
            <p className="text-xs text-green-600">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.pending || 0}</div>
            <p className="text-xs text-gray-500">Vehicles with due payments</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar options={chartOptions} data={chartData} height={100} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Payments</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.vehicleId}</p>
                      <p className="text-sm text-gray-500">
                        {payment.type} Payment • {payment.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">KES {payment.amount}</p>
                    <p
                      className={`text-sm ${
                        payment.status === "COMPLETED"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {payment.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Transaction History</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`rounded-full p-2 ${
                        transaction.type === "CREDIT"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      <BarChart
                        className={`h-4 w-4 ${
                          transaction.type === "CREDIT"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        transaction.type === "CREDIT"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "CREDIT" ? "+" : "-"} KES{" "}
                      {transaction.amount}
                    </p>
                    <p className="text-sm text-gray-500">
                      Balance: KES {transaction.balance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSubmit={handleNewPayment}
        />
      )}
      </div>
    </div>
  );
}
