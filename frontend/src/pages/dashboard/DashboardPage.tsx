import { useAtom } from "jotai";
import { BarChart3, Car, CreditCard, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { userRoleAtom } from "../../lib/store";
import { cn } from "../../lib/utils";

export function DashboardPage() {
  const [role] = useAtom(userRoleAtom);

  const stats = {
    GENERAL_ADMIN: [
      {
        name: "Total Revenue",
        value: "KES 2.4M",
        icon: TrendingUp,
        change: "+12.5%",
      },
      { name: "Active Vehicles", value: "1,234", icon: Car, change: "+3.2%" },
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
