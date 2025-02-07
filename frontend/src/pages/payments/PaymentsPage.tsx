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
  // const { token, userEmail } = getItem();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [payments, setPayments] = useState<Payment[]>([]);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchSummary = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URI}/sacco/summary`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "omoshjoe02@gmail.com" }),
      }
    );

    const newSummary = await response.json();
    if (response.ok) {
      setSummary(newSummary);
    }
  };

  const fetchTopUpHistory = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URI}/sacco/topup/history`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "omoshjoe02@gmail.com" }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      setTransactions(Array.isArray(data.results) ? data.results : []);
    }
  };
  const fetchPaymentHistory = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URI}/sacco/transactions/history`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "omoshjoe02@gmail.com" }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      setPayments(data);
    }
  };

  useEffect(() => {
    fetchSummary();
    fetchTopUpHistory();
    fetchPaymentHistory();
  }, []);

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Revenue",
        data: [150, 490, 550, 670, 100, 75],
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
      balance: 1000,
      type: "DEBIT",
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
            <div className="text-2xl font-bold">
              KES {summary?.current_balance || 0}
            </div>
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
            <div className="text-2xl font-bold">KES 750</div>
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
              {payments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.number_plate}</p>
                      <p className="text-sm text-gray-500">
                        {payment.type} Payment •{" "}
                        {new Date(payment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      KES {payment.amount.$numberDecimal}
                    </p>
                    <p
                      className={`text-sm ${
                        payment.status === "success"
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
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <div
                    key={transaction.transaction_id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`rounded-full p-2 ${
                          transaction.trans_type === "SALE"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        <BarChart
                          className={`h-4 w-4 ${
                            transaction.trans_type === "SALE"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.narrative}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          transaction.trans_type === "SALE"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.trans_type === "SALE" ? "+" : "-"} KES{" "}
                        {transaction.value}
                      </p>
                      <p className="text-sm text-gray-500">
                        Balance: KES {transaction.running_balance}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No transactions available</p>
              )}
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
