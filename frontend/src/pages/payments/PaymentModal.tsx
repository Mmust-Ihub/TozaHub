import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import toast from "react-hot-toast";
import useAuthToken from "../../hooks/useAuth";

const paymentSchema = z.object({
  amount: z.number().min(1).max(100000),
  phone_number: z
  .number()
  .min(10000000000, { message: "Phone number must be at least 10 digits" }) // Adjust min/max if needed
  .max(999999999999, { message: "Phone number can't exceed 10 digits" }),
   email: z.string().email().optional(),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface Props {
  onClose: () => void;
  onSubmit: (data: PaymentFormData) => void;
}

export function PaymentModal({ onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const { getItem } = useAuthToken();
  const { token, email } = getItem();

  const handleFormSubmit = async (data: PaymentFormData) => {
    setIsLoading(true);

    const dataWithEmail = { ...data, email };

    console.log(dataWithEmail);

    try {
      const response = await fetch(`http://164.92.165.41/api/v1/sacco/topup`, {
        method: "POST",
        body: JSON.stringify(dataWithEmail),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const datas = await response.text();

      console.log("Datas",datas);

      if (response.ok) {
        toast.success("Payment successfully done!");
        onClose();
      } else {
        toast.error("Couldn't process payment ");
        onClose();
      }
    } catch (error) {
      console.error("Error processing payment", error);
      toast.error("Server Side Error");
      //   onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Process New Payment</h2>
            <button
              type="button"
              title="close"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount to pay
              </label>
              <input
                {...register("amount", { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Amount to pay"
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                {...register("phone_number", { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="254********"
              />
              {errors.phone_number && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isLoading}>
                Process Payment
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
