import { useState } from "react";
import { Car, FileText, Search } from "lucide-react";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import type { Vehicle } from "../../lib/types";

export default function RegistryPage() {
  const [vehicles] = useState<Vehicle[]>([
    {
      id: "1",
      number_plate: "KBZ 123A",
      type: "MATATU",
      capacity: 14,
      driver: "John Doe",
      sacco: "SACCO001",
      route: "CBD - Westlands",
      status: "ACTIVE",
      registrationDate: "2024-02-15",
      lastPaymentDate: "2024-02-01",
    },
    {
      id: "2",
      number_plate: "KCA 456B",
      type: "BUS",
      capacity: 33,
      driver: "Jane Smith",
      sacco: "SACCO002",
      route: "CBD - Kikuyu",
      status: "SUSPENDED",
      registrationDate: "2024-02-10",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Vehicle Registry
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage all registered public service vehicles
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
            <p className="text-xs text-gray-500">Registered vehicles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Active Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vehicles.filter((v) => v.status === "ACTIVE").length}
            </div>
            <p className="text-xs text-gray-500">Currently operating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vehicles.filter((v) => v.status === "SUSPENDED").length}
            </div>
            <p className="text-xs text-gray-500">Non-compliant vehicles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Compliance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-gray-500">Overall compliance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Vehicle Database</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search vehicles..."
                  className="pl-8 h-9 w-64 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th className="px-6 py-3">Plate Number</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">SACCO</th>
                  <th className="px-6 py-3">Route</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Last Payment</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b bg-white">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Car className="mr-2 h-4 w-4 text-gray-500" />
                        {vehicle.number_plate}
                      </div>
                    </td>
                    <td className="px-6 py-4">{vehicle.type}</td>
                    <td className="px-6 py-4">{vehicle.sacco}</td>
                    <td className="px-6 py-4">{vehicle.route}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          vehicle.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {vehicle.lastPaymentDate || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
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
