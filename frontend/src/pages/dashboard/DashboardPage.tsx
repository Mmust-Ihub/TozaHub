
import {
  BarChart3,
  Car,
  CreditCard,
  Download,
  FileText,
  TrendingUp,
} from "lucide-react";

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

  const [vehicleCount, setVehicleCount] = useState();
  const { getItem, clearAuthToken } = useAuthToken();
  const { token, isRole } = getItem();
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
    try {
      const response = await fetch(
        ` http://164.92.165.41/api/v1/admin/summary?interval=${selectedPeriod}&start_date=2024-10-29&end_date=2024-11-07`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
      if (response.status === 401) {
        clearAuthToken();
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVehicles = async () => {
    console.log("called");
    try {
      const response = await fetch("https://toza-hub.vercel.app/api/vehicle", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await fetch(
        "http://164.92.165.41/api/v1/admin/revenue",

        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBalance(data?.revenue?.$numberDecimal);
        setPendingPayment(data?.pending);

        console.log(data);
      }
      if (response.status === 401) {
        clearAuthToken();
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
    }
  };


  const role = isRole
  const stats = {
    sys_admin: [
      {
        name: "Total Revenue",
        value: `${balance ? "KES " + balance : ""}`,
        icon: TrendingUp,
        change: "+12.5%",
      },
      {
        name: "Active Vehicles",
        value: `${vehicleCount ? vehicleCount : ""}`,
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
        value: "94%",
        icon: BarChart3,
        change: "+2.3%",
      },
    ],
    sacco_admin: [
      {
        name: "Monthly Revenue",
        value: "KES 450K",
        icon: TrendingUp,
        change: "+8.2%",
      },
      { name: "Registered Vehicles", value: "156", icon: Car, change: "+1.2%" },
      { name: "Due Payments", value: "12", icon: CreditCard, change: "-2.4%" },
      {
        name: "Compliance Rate",
        value: "92%",
        icon: BarChart3,
        change: "+1.8%",
      },
    ],
    GOVERNMENT_AGENT: [
      {
        name: "Total Collections",
        value: "KES 1.8M",
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

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [650000, 590000, 800000, 810000, 560000, 750000],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const vehicleDistributionData = {
    labels: ["Matatu", "Bus", "Taxi"],
    datasets: [
      {
        data: [63, 25, 12],
        backgroundColor: [
          "rgba(59, 130, 246, 0.5)",
          "rgba(16, 185, 129, 0.5)",
          "rgba(245, 158, 11, 0.5)",
        ],
      },
    ],
  };

  const currentStats = stats[role!];
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
        {currentStats.map((stat) => (
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
              <Button variant="ghost" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </CardHeader>
          <CardContent>
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
              height={100}
            />
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
                  <td className="px-6 py-4">KES 4.2M</td>
                  <td className="px-6 py-4">KES 4.5M</td>
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