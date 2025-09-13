import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';


import { 
  Home, Users, Briefcase, BarChart2, HelpCircle,
  ChevronDown, Menu, X, Search, Bell, Settings,MessageCircle,
  DollarSign, Mail, Megaphone, Calendar, Headphones, Box, Inbox, File, CheckCircle
} from 'lucide-react';
import logo from '../assets/logo.png';
import { Badge } from '../components/ui/Badge';

const Navigation = ({ darkMode, toggleDarkMode, userRole , handleLogout}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const [errors, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchNot(); 
        setNotifications(response);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setError("Failed to not. Please try again later.");

      }
    };

    fetch();
  }, []);


  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfile();
      setProfile(data);

      if (data) {
        setProfile(data);
      }
    };

    loadProfile();
  }, []);

  const handleFreeTrialClick = async () => {
    const data = await fetchProfile();
    setProfile(data);

    try {
   
      const response = await fetch(`${API_URL}/api/organizations/set_free_trial/` , {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      setMessage(response.data.message);
      const data = await fetchProfile();
      setProfile(data);

    } else {
      setError(error.response?.data?.error || 'An error occurred while setting the trial.');
      const data = await fetchProfile();
      setProfile(data);

    }
      setError(null); 
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while setting the trial.');
      setMessage(null);
      const data = await fetchProfile();
      setProfile(data);

  };
};
 

  const [settingsOpen, setSettingsOpen] = useState(false);

 
  const NavItem = ({ icon: Icon, label, to, subItems }) => {
    const [subMenuOpen, setSubMenuOpen] = useState(false);
  
    const handleItemClick = () => {
      if (subItems) {
        setSubMenuOpen(!subMenuOpen);
      }
    };
    useEffect(() => {
      if (profile?.email_verified !== undefined) {
        setIsLoading(false);  
      }
    }, [profile?.email_verified]);
    return (
      <div className="relative">
        <Link 
          to={subItems ? '#' : to} 
          onClick={handleItemClick}
          className={`flex items-center px-4 py-2 hover:bg-opacity-10 hover:bg-white rounded-lg transition-colors duration-150 ease-in-out cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
        >
          <Icon className="h-5 w-5 mr-3" />
          <span className="text-sm font-medium">{label}</span>
          {subItems && <ChevronDown className={`ml-auto h-4 w-4 transform ${subMenuOpen ? 'rotate-180' : ''}`} />}
        </Link>
        {subItems && subMenuOpen && (
          <div className="ml-6 mt-2 space-y-2">
            {subItems.map((item, index) => (
              <Link 
                key={index}
                to={item.to} 
                className={`block px-4 py-2 text-sm rounded-md ${darkMode ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };
  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfile();
      if (data) {
        setProfile(data);
      }
    };

    loadProfile();
  }, []);
  

  const roleBasedMenuItems = {
    admin: [
      { icon: Home, label: "Dashboard", to: "/" },
      { icon: Users, label: "Subscribers", to: "/" },
      { icon: DollarSign, label: "Tansactions", to: "/" },
      { icon: File, label: "Payouts ", to: "/" },
      { icon: BarChart2, label: "Refunds", to: "/" },
      { icon: Headphones, label: "Support", to: "/" },

     

    ],
    sales_manager: [
      { icon: Home, label: "Dashboard", to: "/" },
      { 
        icon: Users, 
        label: "Team Management", 
        subItems: [
          { label: "Team Overview", to: "/manager/teams" },
        ]
      },
      { 
        icon: Users, 
        label: "Leads & Contacts", 
        subItems: [
          { label: "Leads Overview", to: "/leads" },
          { label: "Leads Assignments", to: "/manager/asign_leads" },
          { label: "Contacts Overview", to: "/contacts" }
        ]
      },
      { icon: Briefcase, label: "Pipeline Overview", to: "/manager/pipeline" },
      { 
        icon: DollarSign, 
        label: "Deals & Reports", 
        subItems: [
          { label: "Deals", to: "/manager/deals" },
          { label: "Reports", to: "/manager/sales_report" },
        ]
      },
      { icon: Briefcase, label: "Knowledge Base", to: "/manager/knowledge_base" },
      { icon: Calendar, label: "Tasks", to: "/manager/tasks" },
      { 
        icon: MessageCircle, 
        label: "Chats", 
        to: "/chats" 
      },
      { icon: File, label: "Files", to: "/file-manager" },
    ],
    sales_rep: [
      { icon: Home, label: "Dashboard", to: "/" },
      { 
        icon: Users, 
        label: "Contacts & Leads", 
        subItems: [
          { label: "Leads", to: "/leads" },
          { label: "Contacts", to: "/contacts" },
        ]
      },
      { 
        icon: DollarSign, 
        label: "Deals & Reports", 
        subItems: [
          { label: "Deals", to: "/rep/deals" },
          { label: "Reports", to: "/rep/sales_report" },
        ]
      },
      { 
        icon: Briefcase, 
        label: "Pipeline Management", 
        subItems: [
          { label: "Pipeline", to: "/rep/pipeline" },
        ]
      },
      { icon: Calendar, label: "Tasks", to: "/rep/tasks" },
      { icon: Briefcase, label: "Knowledge Base", to: "/rep/knowledge_base" },
      { icon: File, label: "Files", to: "/file-manager" },
      { 
        icon: MessageCircle, 
        label: "Chats", 
        to: "/chats" 
      },
    ],
    marketing_specialist: [
      { icon: Home, label: "Dashboard", to: "/" },
      { 
        icon: Megaphone, 
        label: "Campaigns", 
        subItems: [
          { label: "ROI Analysis", to: "/roi" },

          { label: "Social Media Campaigns", to: "/marketing/social_media" },
          { label: "Email Campaigns", to: "/marketing/emails" },
          { label: "Paid Campaigns", to: "/marketing/paid" },
        ]
      },
      { 
        icon: Users, 
        label: "Leads & Contacts", 
        subItems: [
          { label: "Contacts", to: "/contacts" },
          { label: "Leads", to: "/leads" }
        ]
      },
   
      { icon: Calendar, label: "Tasks", to: "/marketing/tasks" },
      { 
        icon: HelpCircle, 
        label: "Surveys & Feedback", 
        to: "/marketing/surveys" 
      },
      { 
        icon: Users, 
        label: "Events & Webinars", 
        to: "/marketing/events" 
      },
      { icon: File, label: "Content Library", to: "/file-manager" },
      { 
        icon: MessageCircle, 
        label: "Chats", 
        to: "/chats" 
      },
    ],
    product_manager: [
      { icon: Home, label: "Dashboard", to: "/" },
      { 
        icon: Box, 
        label: "Products", 
        subItems: [
          { label: "Product Catalog", to: "/products" },
          { label: "Add New Product", to: "/products/new" },
          { label: "Product Variants", to: "/products/variants" },
        ]
      },
      { 
        icon: BarChart2, 
        label: "Product Analytics", 
        subItems: [
          { label: "Usage Metrics", to: "/analytics/product-usage" },
          { label: "Customer Feedback", to: "/analytics/feedback" },
          { label: "Sales Performance", to: "/analytics/sales-performance" },
        ]
      },
      { 
        icon: Calendar, 
        label: "Roadmap", 
        subItems: [
          { label: "Feature Planning", to: "/roadmap/features" },
          { label: "Release Schedule", to: "/roadmap/releases" },
          { label: "Upcoming Features", to: "/roadmap/upcoming" },
        ]
      },
      { 
        icon: Users, 
        label: "Stakeholder Feedback", 
        subItems: [
          { label: "Collect Feedback", to: "/feedback/collect" },
          { label: "Feedback Analysis", to: "/feedback/analysis" },
        ]
      },
      { 
        icon: File, 
        label: "Documentation", 
        to: "/docs" 
      },
    ],
    support_agent: [
      { icon: Home, label: "Dashboard", to: "/" },
      { 
        icon: Headphones, 
        label: "Tickets", 
        subItems: [
          { label: "All Tickets", to: "/tickets" },
          { label: "My Assigned Tickets", to: "/tickets/assigned" },
        ]
      },
      { 
        icon: Users, 
        label: "Customers", 
        subItems: [
          { label: "Customer Profiles", to: "/customers" },
          { label: "Customer Segmentation", to: "/customers/segmentation" },
        ]
      },
     
      { 
        icon: BarChart2, 
        label: "Knowledge Base", 
        to: "/support/knowledge_base" 
      },
      { 
        icon: BarChart2, 
        label: "Performance Metrics", 
        to: "/support/performance" 
      },
      { 
        icon: MessageCircle, 
        label: "Live Chat", 
        to: "/support/live-chat" 
      },
    ],
    solo : [
      { icon: Home, label: "Dashboard", to: "/" },
      { 
        icon: Megaphone, 
        label: "Campaigns", 
        subItems: [
          { label: "ROI Analysis", to: "/roi" },

          { label: "Social Media Campaigns", to: "/marketing/social_media" },
          { label: "Email Campaigns", to: "/marketing/emails" },
          { label: "Paid Campaigns", to: "/marketing/paid" },
        ]
      },
      { 
        icon: DollarSign, 
        label: "Deals & Reports", 
        subItems: [
          { label: "Deals", to: "/rep/deals" },
          { label: "Reports", to: "/rep/sales_report" },
        ]
      },
      { 
        icon: Users, 
        label: "Leads & Contacts", 
        subItems: [
          { label: "Contacts", to: "/contacts" },
          { label: "Leads", to: "/leads" }
        ]
      },
   
      { icon: Calendar, label: "Tasks", to: "/solo/tasks" },
     
      { icon: File, label: "Content Library", to: "/file-manager" },
      { icon: Briefcase, label: "Pipeline Overview", to: "/manager/pipeline" },
     
      { icon: DollarSign , label: "Billing", to: "/admin/billing" },

    ],
  
  
  
  
  };
  

  const sidebarItems = roleBasedMenuItems[userRole] || [];
  const renderRoleBadge = () => {
    const roleColors = {
      admin: 'bg-red-500',
      sales_manager: 'bg-blue-500',
      sales_rep: 'bg-green-500',
      solo: 'bg-purple-500',
      marketing_specialist: 'bg-purple-500',
      support_agent: 'bg-yellow-500',

    };
    return (
      userRole ? (
        <Badge className={`${roleColors[userRole]} text-white`}>
          {userRole.replace('_', ' ')}
        </Badge>
      ) : (
        <Badge className="bg-gray-500 text-white">
          Role not found
        </Badge>
      )
    );
    
  };
  return (
    <>
    <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 shadow-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
  
  <div className="flex items-center justify-between h-16 px-4">
    <div className="flex items-center space-x-2">
      <img src={logo} alt="Clarify" className="h-8 w-auto" />

      <span className="text-lg font-semibold">Clarify</span>
    </div>
    <div className="flex items-center space-x-1">
      <button
        onClick={() => setSettingsOpen(!settingsOpen)}
        className={`p-2 rounded-full ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'}`}
      >
        <Settings className="h-5 w-5" />
      </button>
      {settingsOpen && (
        <div className={`absolute top-12 right-16 mt-2 w-48 rounded-md shadow-lg py-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
          <Link to="/account" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            Account Settings
          </Link>
          <button
            onClick={toggleDarkMode}
            className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
             onClick={handleLogout}
                    className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
               logout 
              </button>

        </div>
      )}
      <button
        onClick={() => setNotificationsOpen(!notificationsOpen)}
        className={`p-2 rounded-full ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'}`}
      >
        <Bell className="h-5 w-5" />
      </button>
      {notificationsOpen && (
        <div className={`absolute top-12 right-28 mt-2 w-64 rounded-md shadow-lg py-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
          <div className="px-4 py-2 text-sm text-gray-800">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 transition duration-150 ease-in-out">
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{notification.message}</p>
                        <small className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {new Date(notification.created_at).toLocaleString()}
                        </small>
                      </div>
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="ml-2 flex items-center text-sm text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out"
                      >
                        <CheckCircle size={16} className="mr-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-4 text-sm text-gray-500">No new notifications.</p>
            )}
          </div>
        </div>
      )}
      <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center focus:outline-none">
       
      <Link to="/user_profile" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>

        <img src={profile?.avatar || logo} alt="User" className="w-8 h-8 rounded-full" />
        </Link>
      </button>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`p-2 rounded-md ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'}`}
      >
        <Menu className="h-6 w-6" />
      </button>

      
      
    </div>
  </div>
</header>


      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-${darkMode ? 'gray-900' : 'gray-100'} shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto`}>
        <div className="h-full flex flex-col">
          <div className={`flex items-center justify-between bg-${darkMode ? 'gray-800' : 'white'} p-4`}>
            <div className="flex items-center">
              <img src={logo} alt="Clarify" className="h-8 w-auto" />
              <span className={`ml-2 text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
Clarity              </span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <X className="h-6 w-6" />
            </button>


          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {sidebarItems.map((item, index) => (
              <NavItem key={index} {...item} />
            ))}
          </nav>

          <div className="p-4">
            <NavItem icon={HelpCircle} label="Support" to="/support" />
          </div>
        </div>
      </aside>

      {/* Desktop Top Navigation Bar */}
      <header className={`hidden lg:block fixed top-0 left-0 right-0 z-30 shadow-md pl-64 bg-${darkMode ? 'gray-800' : 'white'} ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      

        <div className="flex items-center justify-between h-16 px-6">

          <div className="flex items-center space-x-4">
          <div className="relative">
                   <span>{renderRoleBadge()} </span>
            </div>


            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className={`w-64 px-4 py-2 pl-10 text-sm rounded-full ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
           
<div className="p-4 ">


{profile && profile.billing_date == null ? (
  <button 
    onClick={handleFreeTrialClick} 
    className="w-32 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1 px-1 rounded-full transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
    Start free trial
  </button>
) : null}


  
        
      </div>

            
            <div className="relative">



              
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`p-2 rounded-full ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'}`}
              >
                <Bell className="h-5 w-5" />
              </button>
              {notificationsOpen && (
                <div className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                  <div className={`px-4 py-2 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>




                  <div className="divide-y divide-gray-200">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className="p-4  transition duration-150 ease-in-out">
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <p className="text-sm ">{notification.message}</p>
                  <small className="text-xs ">{new Date(notification.created_at).toLocaleString()}</small>
                </div>
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="ml-2 flex items-center text-sm text-indigo-600  transition duration-150 ease-in-out"
                >
                  <CheckCircle size={16} className="mr-1" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-sm text-gray-500">No new notifications.</p>
        )}
      </div>


                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className={`p-2 rounded-full ${darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'}`}
              >
                <Settings className="h-5 w-5" />
              </button>
              {settingsOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                  <Link to="/account" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>Account Settings</Link>
                  <button
                    onClick={toggleDarkMode}
                    className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center text-sm focus:outline-none"
              >

                <img src={ profile?.avatar || logo } 
                alt="User" className="w-8 h-8 rounded-full mr-2" />
                <span className="font-medium">{profile?.full_name || 'Loading...'}</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {profileOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                  <Link to="/user_profile" className={`block px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}>Your Profile</Link>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left px-4 py-2 text-sm ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
               logout 
              </button>
                 
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navigation;

