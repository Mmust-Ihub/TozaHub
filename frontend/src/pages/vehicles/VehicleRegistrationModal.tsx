import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import toast from "react-hot-toast";
import useAuthToken from "../../hooks/useAuth";

const vehicleSchema = z.object({
  number_plate: z.string().min(6).max(8),
  driver: z.string().min(3),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

interface Props {
  onClose: () => void;
  onSubmit: (data: VehicleFormData) => void;
}

export function VehicleRegistrationModal({ onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  });

  const { getItem } = useAuthToken();
  const { token } = getItem();

  const handleFormSubmit = async (data: VehicleFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_DJANGO_URI}/vehicle/`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Vehicle successfully registered");
        onClose();
      } else {
        toast.error("Couldn't register vehicle");
        onClose();
      }
    } catch (error) {
      console.error("Error creating Vehicle", error);
      toast.error("Server Side Error");
      // onClose();
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
              type="button"
              title="close"
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
                {...register("number_plate")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="KXX 000X"
              />
              {errors.number_plate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.number_plate.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Driver Name
              </label>
              <input
                {...register("driver")}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
              {errors.driver && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.driver.message}
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
