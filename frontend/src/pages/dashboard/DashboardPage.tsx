import { BarChart3, Car, CreditCard, FileText, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";

import { cn } from "../../lib/utils";
import useAuthToken from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Button } from "../../components/ui/Button";
import { Bar, Pie } from "react-chartjs-2";

export function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [balance, setBalance] = useState();
  const [pendindPayment, setPendingPayment] = useState();

  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingBalance, setLoadingBalance] = useState(false);

  const [summaryData, setSummaryData] = useState<any[]>([]);

  const [vehicleCount, setVehicleCount] = useState();
  const { getItem, clearAuthToken } = useAuthToken();
  const { token, isRole } = getItem();
  if (
    !token ||
    !isRole ||
    !["sys_admin", "sacco_admin", "gov_admin"].includes(isRole)
  ) {
    return <Navigate to="/login" replace />;
  }
  if (!token || !isRole) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    fetchVehicles();
    fetchBalance();
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [selectedPeriod]);

  const fetchSummary = async () => {
    setLoadingSummary(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/admin/summary?interval=${selectedPeriod}&start_date=2024-10-29&end_date=2025-02-06`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("response", await response.json());
      if (response.ok) {
        const data = await response.json();
        setSummaryData(data);
        console.log("data", data);
      }
      if (response.status === 401) {
        clearAuthToken();
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSummary(false);
    }
  };

  const fetchVehicles = async () => {
    setLoadingVehicles(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DJANGO_URI}/vehicle`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setVehicleCount(data?.length);
      }

      if (response.status === 401) {
        console.log("Anauthorized error");
        clearAuthToken();
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingVehicles(false);
    }
  };

  const fetchBalance = async () => {
    setLoadingBalance(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/admin/revenue`,

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        console.log("balance data", data);
        setBalance(data?.revenue?.$numberDecimal);
        setPendingPayment(data?.pending);
      }
      if (response.status === 401) {
        clearAuthToken();
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBalance(false);
    }
  };

  interface Stat {
    name: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    change: string;
  }

  const role: "sys_admin" | "sacco_admin" | "gov_admin" = isRole as
    | "sys_admin"
    | "sacco_admin"
    | "gov_admin";
  const stats = {
    sys_admin: [
      {
        name: "Total Revenue",
        value: `${
          loadingBalance ? "loading.." : balance ? "KES " + balance : "0"
        }`,
        icon: TrendingUp,
        change: "+12.5%",
      },
      {
        name: "Active Vehicles",
        value: `${loadingVehicles ? "loading.." : vehicleCount}`,
        icon: Car,
        change: "+3.2%",
      },
      {
        name: "Pending Payments",
        value: `${pendindPayment ? pendindPayment : ""}`,
        icon: CreditCard,
        change: "-5.1%",
      },
      {
        name: "Collection Rate",
        value: "34%",
        icon: BarChart3,
        change: "+2.3%",
      },
    ],
    sacco_admin: [
      {
        name: "Monthly Revenue",
        value: "KES 4K",
        icon: TrendingUp,
        change: "+8.2%",
      },
      { name: "Registered Vehicles", value: "156", icon: Car, change: "+1.2%" },
      { name: "Due Payments", value: "12", icon: CreditCard, change: "-2.4%" },
      {
        name: "Compliance Rate",
        value: "42%",
        icon: BarChart3,
        change: "+1.8%",
      },
    ],
    gov_admin: [
      {
        name: "Total Collections",
        value: "KES 1k",
        icon: TrendingUp,
        change: "+15.3%",
      },
      { name: "Monitored Vehicles", value: "892", icon: Car, change: "+4.7%" },
      {
        name: "Overdue Payments",
        value: "28",
        icon: CreditCard,
        change: "-8.2%",
      },
      {
        name: "Enforcement Rate",
        value: "96%",
        icon: BarChart3,
        change: "+3.1%",
      },
    ],
  };


  function getMonthAbbreviation(monthNumber: number): string {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[monthNumber - 1];
  }

  const revenueData = {
    labels: summaryData.map(
      (item) => getMonthAbbreviation(item._id.month) + " " + item._id.year
    ), // Use the year from backend
    datasets: [
      {
        label: "Total Transactions",
        data: summaryData.map((item) => item.total_transactions),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
      {
        label: "Successful Transactions",
        data: summaryData.map((item) => item.successful_transactions),
        backgroundColor: "rgba(16, 185, 129, 0.5)",
      },
      {
        label: "Pending Transactions",
        data: summaryData.map((item) => item.pending_transactions),
        backgroundColor: "rgba(245, 158, 11, 0.5)",
      },
    ],
  };

  const vehicleDistributionData = {
    labels: ["Matatu", "Bus", "Taxi"],
    datasets: [
      {
        data: [13, 25, 12],
        backgroundColor: [
          "rgba(59, 130, 246, 0.5)",
          "rgba(16, 185, 129, 0.5)",
          "rgba(245, 158, 11, 0.5)",
        ],
      },
    ],
  };

  const currentStats = stats[role];
  console.log(selectedPeriod);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>{" "}
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your system.{" "}
          </p>{" "}
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          {/* <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button> */}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {currentStats.map((stat: Stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={cn(
                  "text-xs",
                  stat.change.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                )}
              >
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}

        <div className="grid gap-6 md:grid-cols-2"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Revenue Trend</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {loadingSummary ? (
              <div>Loading graph...</div>
            ) : (
              <Bar
                data={revenueData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top" as const,
                    },
                    title: {
                      display: false,
                    },
                  },
                }}
                height={200}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Vehicle Distribution</CardTitle>
              <Button variant="ghost" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Pie
              data={vehicleDistributionData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "right" as const,
                  },
                },
              }}
              height={100}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Key Performance Indicators</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-6 py-3">Metric</th>
                  <th className="px-6 py-3">Current</th>
                  <th className="px-6 py-3">Target</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-white">
                  <td className="px-6 py-4">Revenue Collection</td>
                  <td className="px-6 py-4">KES 400</td>
                  <td className="px-6 py-4">KES 4k</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      93% of target
                    </span>
                  </td>
                </tr>
                <tr className="border-b bg-white">
                  <td className="px-6 py-4">Vehicle Compliance</td>
                  <td className="px-6 py-4">85%</td>
                  <td className="px-6 py-4">90%</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      Below target
                    </span>
                  </td>
                </tr>
                <tr className="border-b bg-white">
                  <td className="px-6 py-4">Payment Processing Time</td>
                  <td className="px-6 py-4">2.5 hours</td>
                  <td className="px-6 py-4">4 hours</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Exceeding target
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
