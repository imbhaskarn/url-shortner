import React, { useState } from 'react';
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  Menu,
  X,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  LineChart
} from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);

  const transactions = [
    { id: 1, amount: 156.00, status: 'succeeded', customer: 'John Doe', date: '2024-10-27' },
    { id: 2, amount: 299.99, status: 'succeeded', customer: 'Jane Smith', date: '2024-10-27' },
    { id: 3, amount: 89.99, status: 'failed', customer: 'Bob Wilson', date: '2024-10-26' },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300`}>
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <div className={`${isSidebarOpen ? 'block' : 'hidden'} text-xl font-bold text-blue-600`}>
            PaymentApp
          </div>
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="mt-4">
          <div className="px-4 space-y-2">
            {[
              { icon: <LayoutDashboard size={20} />, text: 'Dashboard', active: true },
              { icon: <CreditCard size={20} />, text: 'Payments' },
              { icon: <Users size={20} />, text: 'Customers' },
              { icon: <Wallet size={20} />, text: 'Balance' },
              { icon: <LineChart size={20} />, text: 'Analytics' },
              { icon: <Settings size={20} />, text: 'Settings' },
            ].map((item, index) => (
              <button
                key={index}
                className={`flex items-center w-full p-3 rounded-lg hover:bg-gray-100 
                  ${item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
              >
                {item.icon}
                <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'}`}>{item.text}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="h-16 flex items-center justify-between px-4">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            
            <div className="flex items-center space-x-4">
              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                >
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                {isNotificationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border p-4 z-50">
                    <h3 className="font-semibold mb-2">Notifications</h3>
                    <div className="space-y-2">
                      <div className="p-2 hover:bg-gray-50 rounded">
                        <p className="text-sm">New payment received - $156.00</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                      <div className="p-2 hover:bg-gray-50 rounded">
                        <p className="text-sm">Failed transaction alert</p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                  <div className={`${isSidebarOpen ? 'hidden' : 'block'} text-sm font-medium`}>
                    John Smith
                  </div>
                  <ChevronDown size={16} />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border p-2 z-50">
                    <button className="w-full p-2 text-left hover:bg-gray-100 rounded">
                      Profile Settings
                    </button>
                    <button className="w-full p-2 text-left hover:bg-gray-100 rounded">
                      Billing
                    </button>
                    <hr className="my-2" />
                    <button className="w-full p-2 text-left text-red-600 hover:bg-gray-100 rounded flex items-center">
                      <LogOut size={16} className="mr-2" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { title: 'Total Revenue', value: '$15,231.89', change: '+12.5%', icon: <DollarSign />, positive: true },
              { title: 'Total Transactions', value: '1,205', change: '+8.1%', icon: <CreditCard />, positive: true },
              { title: 'Failed Payments', value: '13', change: '-2.3%', icon: <ArrowDownRight />, positive: false },
              { title: 'Active Customers', value: '892', change: '+5.4%', icon: <Users />, positive: true },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    {stat.icon}
                  </div>
                  <span className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                    {stat.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm">{stat.title}</h3>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{transaction.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${transaction.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                          ${transaction.status === 'succeeded' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {transaction.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
