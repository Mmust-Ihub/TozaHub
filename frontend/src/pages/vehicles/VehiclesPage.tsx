import { useState } from "react";
import { Car, Plus, Search } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { VehicleRegistrationModal } from "./VehicleRegistrationModal";
import type { Vehicle } from "@/lib/types";

export function VehiclesPage() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      plateNumber: "KBZ 123A",
      type: "MATATU",
      capacity: 14,
      owner: "John Doe",
      saccoId: "SACCO001",
      route: "CBD - Westlands",
      status: "ACTIVE",
      registrationDate: "2024-02-15",
      lastPaymentDate: "2024-02-01",
    },
    {
      id: "2",
      plateNumber: "KCA 456B",
      type: "BUS",
      capacity: 33,
      owner: "Jane Smith",
      saccoId: "SACCO001",
      route: "CBD - Kikuyu",
      status: "ACTIVE",
      registrationDate: "2024-02-10",
      lastPaymentDate: "2024-02-01",
    },
  ]);

  const handleRegisterVehicle = async (data: any) => {
    const newVehicle: Vehicle = {
      id: (vehicles.length + 1).toString(),
      ...data,
      saccoId: "SACCO001",
      status: "ACTIVE",
      registrationDate: new Date().toISOString().split("T")[0],
    };
    setVehicles([...vehicles, newVehicle]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vehicles</h1>
          <p className="text-muted-foreground">
            Manage your registered vehicles and their details
          </p>
        </div>
        <Button onClick={() => setShowRegistrationModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Register Vehicle
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
            <p className="text-xs text-gray-500">
              Registered vehicles in system
            </p>
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
            <p className="text-xs text-gray-500">
              Currently operating vehicles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Compliance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-gray-500">
              Vehicles with up-to-date payments
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Vehicle Registry</CardTitle>
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
                  <th className="px-6 py-3">Capacity</th>
                  <th className="px-6 py-3">Owner</th>
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
                        {vehicle.plateNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4">{vehicle.type}</td>
                    <td className="px-6 py-4">{vehicle.capacity}</td>
                    <td className="px-6 py-4">{vehicle.owner}</td>
                    <td className="px-6 py-4">{vehicle.route}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{vehicle.lastPaymentDate}</td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showRegistrationModal && (
        <VehicleRegistrationModal
          onClose={() => setShowRegistrationModal(false)}
          onSubmit={handleRegisterVehicle}
        />
      )}
    </div>
  );
}
