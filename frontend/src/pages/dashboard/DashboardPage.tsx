import { BarChart3, Car, CreditCard, TrendingUp } from "lucide-react";
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

export function DashboardPage() {
  const [balance, setBalance] = useState();
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
        "https://toza-hub-server.vercel.app/api/v1/admin/balance",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBalance(data?.current_balance);
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
 

  const role = isRole ? "GENERAL_ADMIN" : "SACCO_ADMIN";
  const stats = {
    GENERAL_ADMIN: [
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
        value: "45",
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
    SACCO_ADMIN: [
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

  const currentStats = stats[role!];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your system.
        </p>
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
      </div>
    </div>
  );
}
