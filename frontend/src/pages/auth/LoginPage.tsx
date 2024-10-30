import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { Car } from "lucide-react";
import { userAtom } from "../../lib/store";
import { Button } from "../../components/ui/Button";

export function LoginPage() {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (role: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUser({
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: role as any,
    });

    setIsLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Car className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          TozaHub
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Vehicle Taxation Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={() => handleLogin("GENERAL_ADMIN")}
              isLoading={isLoading}
            >
              Login as General Admin
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => handleLogin("SACCO_ADMIN")}
              isLoading={isLoading}
            >
              Login as Sacco Admin
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => handleLogin("GOVERNMENT_AGENT")}
              isLoading={isLoading}
            >
              Login as Government Agent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
