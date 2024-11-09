import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

const vehicleSchema = z.object({
  number_plate: z.string().min(6).max(8),
  type: z.enum(["BUS", "MATATU", "TAXI"]),
  capacity: z.number().min(4).max(62),
  driver: z.string().min(3),
  route: z.string().min(3),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

interface Props {
  onClose: () => void;
  onSubmit: (data: VehicleFormData) => void;
}

export function VehicleRegistrationModal({ onClose, onSubmit }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  });

  const handleFormSubmit = async (data: VehicleFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Register New Vehicle</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Plate Number
              </label>
              <input
                {...register("plateNumber")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="KXX 000X"
              />
              {errors.plateNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.plateNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Type
              </label>
              <select
                {...register("type")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="MATATU">Matatu</option>
                <option value="BUS">Bus</option>
                <option value="TAXI">Taxi</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.type.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacity
              </label>
              <input
                type="number"
                {...register("capacity", { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.capacity && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.capacity.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Owner Name
              </label>
              <input
                {...register("owner")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.owner && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.owner.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Route
              </label>
              <input
                {...register("route")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="e.g., CBD - Westlands"
              />
              {errors.route && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.route.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading}>
                Register Vehicle
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
