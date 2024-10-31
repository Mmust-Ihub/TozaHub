import { useAtom } from 'jotai';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { BarChart3, Car, CreditCard, LogOut, Settings, Users } from 'lucide-react';
import { userAtom, userRoleAtom } from '../../lib/store';
import { cn } from '../../lib/utils';

const navigation = {
  GENERAL_ADMIN: [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Payment Rates', href: '/payment-rates', icon: CreditCard },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ],
  SACCO_ADMIN: [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Vehicles', href: '/vehicles', icon: Car },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Settings', href: '/settings', icon: Settings },
  ],
  GOVERNMENT_AGENT: [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Vehicle Registry', href: '/registry', icon: Car },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ],
};

export function DashboardLayout() {
  const [user] = useAtom(userAtom);
  const [role] = useAtom(userRoleAtom);

  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  const navItems = navigation[role];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden w-64 bg-white shadow-sm lg:block">
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
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    location.pathname === item.href && 'bg-gray-50 text-blue-600'
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
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {/* Add logout handler */}}
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