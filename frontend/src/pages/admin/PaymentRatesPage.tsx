import { useState } from "react";
import { Calculator, Edit2, Plus, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";

type Rate = {
  id: string;
  vehicleType: "BUS" | "MATATU" | "TAXI";
  dailyRate: number;
  monthlyRate: number;
  annualRate: number;
  penaltyRate: number;
  effectiveDate: string;
};

export default function PaymentRatesPage() {
  const [rates] = useState<Rate[]>([
    {
      id: "1",
      vehicleType: "MATATU",
      dailyRate: 300,
      monthlyRate: 8000,
      annualRate: 85000,
      penaltyRate: 500,
      effectiveDate: "2024-01-01",
    },
    {
      id: "2",
      vehicleType: "BUS",
      dailyRate: 500,
      monthlyRate: 12000,
      annualRate: 120000,
      penaltyRate: 1000,
      effectiveDate: "2024-01-01",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payment Rates</h1>
          <p className="text-muted-foreground">
            Manage vehicle taxation rates and payment schedules
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Rate
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Average Daily Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 400</div>
            <p className="text-xs text-gray-500">Across all vehicle types</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Monthly Collections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 2.4M</div>
            <p className="text-xs text-green-600">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Penalty Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 125K</div>
            <p className="text-xs text-red-600">-8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Current Rates</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-6 py-3">Vehicle Type</th>
                  <th className="px-6 py-3">Daily Rate</th>
                  <th className="px-6 py-3">Monthly Rate</th>
                  <th className="px-6 py-3">Annual Rate</th>
                  <th className="px-6 py-3">Penalty Rate</th>
                  <th className="px-6 py-3">Effective Date</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((rate) => (
                  <tr key={rate.id} className="border-b bg-white">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Calculator className="mr-2 h-4 w-4 text-gray-500" />
                        {rate.vehicleType}
                      </div>
                    </td>
                    <td className="px-6 py-4">KES {rate.dailyRate}</td>
                    <td className="px-6 py-4">KES {rate.monthlyRate}</td>
                    <td className="px-6 py-4">KES {rate.annualRate}</td>
                    <td className="px-6 py-4">KES {rate.penaltyRate}</td>
                    <td className="px-6 py-4">{rate.effectiveDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
