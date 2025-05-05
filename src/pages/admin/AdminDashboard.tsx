import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AdminSidebar from '@/components/admin/AdminSidebar';

const AdminDashboard = () => {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and has admin role
    const userRole = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');
    
    if (!userRole || userRole !== 'admin') {
      toast.error('Please sign in as an admin to access this page');
      navigate('/signin');
      return;
    }
    
    if (email) {
      setUserEmail(email);
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    toast.success('Logged out successfully');
    navigate('/');
  };

  // Sample data for dashboard
  const dashboardStats = [
    {
      title: 'Total Events',
      value: '12',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-festblue-accent" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      color: 'bg-blue-500/20',
    },
    {
      title: 'Registered Users',
      value: '458',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      color: 'bg-green-500/20',
    },
    {
      title: 'Event Registrations',
      value: '879',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
        </svg>
      ),
      color: 'bg-purple-500/20',
    },
    {
      title: 'Upcoming Events',
      value: '8',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
      color: 'bg-amber-500/20',
    },
  ];
  
  const recentEvents = [
    {
      id: 1,
      name: 'Tech Innovate 2023',
      date: '2023-06-15',
      registrations: 120,
      status: 'Completed',
    },
    {
      id: 2,
      name: 'Cultural Night 2023',
      date: '2023-07-25',
      registrations: 180,
      status: 'Completed',
    },
    {
      id: 3,
      name: 'Hackathon 2023',
      date: '2023-09-10',
      registrations: 75,
      status: 'Completed',
    },
    {
      id: 4,
      name: 'Annual Sports Meet 2023',
      date: '2023-11-05',
      registrations: 210,
      status: 'Completed',
    },
    {
      id: 5,
      name: 'Tech Innovate 2024',
      date: '2024-06-20',
      registrations: 45,
      status: 'Upcoming',
    },
  ];
  
  const recentUsers = [
    {
      id: 1,
      name: 'Rahul Sharma',
      email: 'rahul.s@iescollege.ac.in',
      joinedOn: '2024-04-28',
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya.p@iescollege.ac.in',
      joinedOn: '2024-04-27',
    },
    {
      id: 3,
      name: 'Amit Kumar',
      email: 'amit.k@iescollege.ac.in',
      joinedOn: '2024-04-26',
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      email: 'sneha.g@iescollege.ac.in',
      joinedOn: '2024-04-25',
    },
  ];
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex bg-festblue">
      {/* Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <AdminSidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-6">
          {/* Mobile View Menu */}
          <div className="md:hidden mb-6 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-festblue-accent">
              IES FESTHIVE
            </Link>
            <button className="p-2 rounded-md text-white bg-festblue-light">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-300">Welcome back, {userEmail}</p>
            </div>
            
            <Button onClick={handleLogout} variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
              Logout
            </Button>
          </div>
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats.map((stat, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-300">{stat.title}</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-2">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="glass-card p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button asChild className="bg-festblue-accent hover:bg-festblue-accent/80">
                <Link to="/admin/events">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Manage Events
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-festblue-accent text-festblue-accent hover:bg-festblue-accent/10">
                <Link to="/admin/announcements/create">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                  </svg>
                  New Announcement
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-festblue-accent text-festblue-accent hover:bg-festblue-accent/10">
                <Link to="/admin/users">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  Manage Users
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="border-festblue-accent text-festblue-accent hover:bg-festblue-accent/10">
                <Link to="/admin/settings">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Settings
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Two-column layout for tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Events */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Events</h2>
                <Link to="/admin/events" className="text-festblue-accent hover:text-festblue-accent/80 text-sm">
                  View All
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-300 text-sm border-b border-gray-700">
                      <th className="py-3 font-medium">Name</th>
                      <th className="py-3 font-medium">Date</th>
                      <th className="py-3 font-medium">Registrations</th>
                      <th className="py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {recentEvents.map((event) => (
                      <tr key={event.id} className="border-b border-gray-700 last:border-b-0">
                        <td className="py-3">{event.name}</td>
                        <td className="py-3">{formatDate(event.date)}</td>
                        <td className="py-3">{event.registrations}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            event.status === 'Upcoming' 
                              ? 'bg-green-900/30 text-green-400' 
                              : 'bg-gray-700 text-gray-300'
                          }`}>
                            {event.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Recent Users */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Users</h2>
                <Link to="/admin/users" className="text-festblue-accent hover:text-festblue-accent/80 text-sm">
                  View All
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-300 text-sm border-b border-gray-700">
                      <th className="py-3 font-medium">Name</th>
                      <th className="py-3 font-medium">Email</th>
                      <th className="py-3 font-medium">Joined On</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-700 last:border-b-0">
                        <td className="py-3">{user.name}</td>
                        <td className="py-3">{user.email}</td>
                        <td className="py-3">{formatDate(user.joinedOn)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
