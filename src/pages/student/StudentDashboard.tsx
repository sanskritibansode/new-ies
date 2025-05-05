
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import StudentSidebar from '@/components/student/StudentSidebar';
import { Button } from '@/components/ui/button';
import { Calendar, Bell } from 'lucide-react';

interface Event {
  id: number;
  name: string;
  date: string;
  venue: string;
  description?: string;
  imageUrl?: string;
  registrations: number;
  status: string;
  registered?: boolean;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
}

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  
  useEffect(() => {
    // Check if user is authenticated and has student role
    const userRole = localStorage.getItem('userRole');
    
    if (!userRole || userRole !== 'student') {
      toast.error('Please sign in as a student to access this page');
      navigate('/signin');
      return;
    }
    
    // Load registered events and upcoming events
    loadEvents();
    loadAnnouncements();
  }, [navigate]);

  const loadEvents = () => {
    // In a real app, this would be an API call filtered by the current user
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      const allEvents: Event[] = JSON.parse(storedEvents);
      
      // Get registered events from localStorage or initialize to empty array
      const registeredEventIds = JSON.parse(localStorage.getItem('registeredEvents') || '[]');
      
      // Mark registered events
      const eventsWithRegistrationStatus = allEvents.map(event => ({
        ...event,
        registered: registeredEventIds.includes(event.id)
      }));

      // Filter registered events
      setRegisteredEvents(eventsWithRegistrationStatus.filter(event => event.registered));
      
      // Filter upcoming events
      setUpcomingEvents(
        eventsWithRegistrationStatus
          .filter(event => event.status === 'Upcoming')
          .slice(0, 3)
      );
    }
  };
  
  const loadAnnouncements = () => {
    // Sample announcements (in a real app, this would come from an API)
    const sampleAnnouncements: Announcement[] = [
      {
        id: 1,
        title: "Welcome to the New Semester",
        content: "We're excited to welcome all students to the new academic semester. Check out the upcoming events!",
        date: "2024-05-01"
      },
      {
        id: 2,
        title: "Annual Cultural Fest Registration Open",
        content: "Registrations for the Annual Cultural Fest are now open. Don't miss out on this opportunity!",
        date: "2024-05-03"
      },
      {
        id: 3,
        title: "Tech Innovate Workshop Series",
        content: "Join us for a series of technical workshops starting next week. Perfect for all skill levels.",
        date: "2024-05-04"
      }
    ];
    
    setAnnouncements(sampleAnnouncements);
  };

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
      <div className="hidden md:block w-64">
        <StudentSidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-grow">
        <div className="p-6">
          {/* Mobile View Menu */}
          <div className="md:hidden mb-6">
            <button className="p-2 rounded-md text-white bg-festblue-light">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Welcome Section */}
          <div className="glass-card p-6 mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome to Your Dashboard</h1>
            <p className="text-gray-300">
              Explore upcoming events, manage your registrations, and stay connected with campus activities.
            </p>
          </div>
          
          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button asChild className="h-auto py-6 bg-gradient-to-r from-blue-600 to-blue-800">
                <Link to="/student/events" className="flex flex-col items-center">
                  <Calendar className="h-8 w-8 mb-2" />
                  <span className="text-lg">View All Events</span>
                </Link>
              </Button>
              
              <Button asChild className="h-auto py-6 bg-gradient-to-r from-green-600 to-green-800">
                <Link to="#my-registrations" className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span className="text-lg">My Registrations</span>
                </Link>
              </Button>
              
              <Button asChild className="h-auto py-6 bg-gradient-to-r from-purple-600 to-purple-800">
                <Link to="#announcements" className="flex flex-col items-center">
                  <Bell className="h-8 w-8 mb-2" />
                  <span className="text-lg">Campus Announcements</span>
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Upcoming Events Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Upcoming Events</h2>
              <Link to="/student/events" className="text-festblue-accent hover:underline">
                View All
              </Link>
            </div>
            
            <div className="glass-card p-6">
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-white font-semibold">{event.name}</h3>
                          <p className="text-gray-400 text-sm">{formatDate(event.date)} • {event.venue}</p>
                        </div>
                        <Button 
                          size="sm" 
                          className={event.registered 
                            ? "bg-gray-600 hover:bg-gray-700" 
                            : "bg-festblue-accent hover:bg-festblue-accent/80"}
                          disabled={event.registered}
                        >
                          {event.registered ? 'Registered' : 'Register'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-300 text-center py-4">No upcoming events at the moment.</p>
              )}
            </div>
          </div>
          
          {/* My Registrations */}
          <div id="my-registrations" className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">My Registrations</h2>
            
            <div className="glass-card p-6">
              {registeredEvents.length > 0 ? (
                <div className="space-y-4">
                  {registeredEvents.map(event => (
                    <div key={event.id} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-white font-semibold">{event.name}</h3>
                          <p className="text-gray-400 text-sm">{formatDate(event.date)} • {event.venue}</p>
                          <p className="text-gray-500 text-xs mt-1">Registration status: <span className="text-green-400">Confirmed</span></p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-festblue-accent text-festblue-accent hover:bg-festblue-accent/10"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-300 text-center py-4">You haven't registered for any events yet.</p>
              )}
            </div>
          </div>
          
          {/* Announcements */}
          <div id="announcements" className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Campus Announcements</h2>
            
            <div className="glass-card p-6">
              {announcements.map(announcement => (
                <div key={announcement.id} className="mb-4 pb-4 border-b border-gray-700 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-semibold">{announcement.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{formatDate(announcement.date)}</p>
                    </div>
                    <Bell className="h-5 w-5 text-festblue-accent" />
                  </div>
                  <p className="mt-2 text-gray-300">{announcement.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
