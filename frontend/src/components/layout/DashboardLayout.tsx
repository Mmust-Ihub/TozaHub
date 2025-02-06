import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Car,
  CreditCard,
  Cross,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";

import { cn } from "../../lib/utils";
import useAuthToken from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


type user = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_sacco_admin: boolean;
  avatar: string;
};

const navigation = {
  sys_admin: [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Payment Rates", href: "/payment-rates", icon: CreditCard },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ],
  sacco_admin: [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Vehicles", href: "/vehicles", icon: Car },
    { name: "Payments", href: "/payments", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
  ],
  gov_admin: [
    { name: "Dashboard", href: "/govt-dashboard", icon: BarChart3 },
  ],
};

export function DashboardLayout() {
  const { getItem, clearAuthToken } = useAuthToken();
  const navigate = useNavigate();
  const { token, isRole } = getItem();
  const [user, setUser] = useState<user | null>();
  const [isOpen, setIsOpen] = useState(false);
  // const [user] = useAtom(userAtom);
  // const [role] = useAtom(userRoleAtom);

  if (!token || !isRole) {
    return <Navigate to="/login" replace />;
  }
  const role = isRole as keyof typeof navigation;

  useEffect(() => {
    fetchUser();
  }, [token, isRole]);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        "https://toza-hub.vercel.app/api/auth/user",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        localStorage.setItem("email", data?.email);
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

  const navItems = navigation[role];

  const handleLogout = () => {
    const notify = toast.loading("Logging out...");
    clearAuthToken();
    toast.success("Logged out successfully", { id: notify });
    navigate("/login");
  };
  const toogleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="z-[999] lg:hidden" onClick={toogleMenu}>
        {!isOpen ? (
          <Menu className="h-8 w-8 text-blue-600 fixed top-4 right-4" />
        ) : (
          <X className="h-8 w-8 text-blue-600 fixed top-4 right-4" />
        )}
      </div>
      <Toaster position="top-right" />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={cn(
            "absolute lg:relative bg-gray-300 w-64 lg:bg-white shadow-sm h-full z-[999] transition-transform duration-300 ease-in-out lg:right-0 lg:translate-x-0",

            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center px-4">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold">TozaHub</span>
              </Link>
            </div>
            <nav className="flex-1 space-y-1 px-2 py-4">
              {navItems.map((item) => (
                <Link
                  onClick={toogleMenu}
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    location.pathname === item.href &&
                      "bg-gray-50 text-blue-600"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="border-t p-4">
              <div className="flex items-center">
                <img
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.username || ""
                    )}`
                  }
                  alt={user?.username}
                  className="h-8 w-8 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium">{user?.username}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
