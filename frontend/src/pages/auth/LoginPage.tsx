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
    <div className="w-screen h-screen bg-gray-50 flex flex-col justify-center py-12 lg:px-8 items-center px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md pb-6">
        <div className="flex justify-center items-center">
          <Car className="h-12 w-12 text-blue-600" />
          <h2 className="text-center text-3xl font-extrabold text-gray-700">
            TozaHub
          </h2>
        </div>

        <p className="mt-2 text-center text-md font-bold text-gray-600">
          Vehicle Taxation Management System
        </p>
      </div>
      <form
        action=""
        className="w-full md:w-[40%] justify-center items-center flex flex-col gap-4"
      >
        <div className="w-full flex flex-col justify-center">
          <label htmlFor="email" className="font-bold py-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="email..."
            className="w-full border-2 rounded-lg p-2 border-gray-500"
            required
          />
        </div>
        <div className="w-full flex flex-col justify-center">
          <label htmlFor="password" className="font-bold py-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="password..."
            className="w-full border-2 rounded-lg p-2 border-gray-500"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          onClick={() => handleLogin("GENERAL_ADMIN")}
          isLoading={isLoading}
        >
          Login as General Admin
        </Button>
      </form>

      {/* <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
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
      </div> */}
    </div>
  );
}
