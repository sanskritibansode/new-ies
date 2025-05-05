
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from '@/components/student/StudentSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Event {
  id: number;
  name: string;
  date: string;
  venue: string;
  description?: string;
  imageUrl?: string;
  registrations: number;
  status: string;
}

const StudentEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and has student role
    const userRole = localStorage.getItem('userRole');
    
    if (!userRole || userRole !== 'student') {
      toast.error('Please sign in as a student to access this page');
      navigate('/signin');
      return;
    }
    
    // Load events from localStorage
    loadEvents();
  }, [navigate]);

  const loadEvents = () => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      // Sample data if no events exist
      const sampleEvents: Event[] = [
        {
          id: 1,
          name: 'Tech Innovate 2023',
          date: '2023-06-15',
          venue: 'Main Auditorium',
          description: 'Join us for a day of technology innovation showcases, workshops, and exciting competitions!',
          imageUrl: '/placeholder.svg',
          registrations: 120,
          status: 'Completed',
        },
        {
          id: 2,
          name: 'Cultural Night 2023',
          date: '2023-07-25',
          venue: 'Open Air Theatre',
          description: 'Experience a vibrant celebration of music, dance, and art with performances from talented students.',
          imageUrl: '/placeholder.svg',
          registrations: 180,
          status: 'Completed',
        },
        {
          id: 3,
          name: 'Hackathon 2023',
          date: '2023-09-10',
          venue: 'CS Building',
          description: 'Put your coding skills to the test in this 24-hour hackathon and build innovative solutions.',
          imageUrl: '/placeholder.svg',
          registrations: 75,
          status: 'Completed',
        },
        {
          id: 4,
          name: 'Annual Sports Meet 2023',
          date: '2023-11-05',
          venue: 'Sports Complex',
          description: 'Compete in various athletic events and represent your department in this annual sports celebration.',
          imageUrl: '/placeholder.svg',
          registrations: 210,
          status: 'Completed',
        },
        {
          id: 5,
          name: 'Tech Innovate 2024',
          date: '2024-06-20',
          venue: 'Main Auditorium',
          description: 'The biggest tech event of the year returns with even more exciting innovations and opportunities.',
          imageUrl: '/placeholder.svg',
          registrations: 45,
          status: 'Upcoming',
        },
      ];
      setEvents(sampleEvents);
      localStorage.setItem('events', JSON.stringify(sampleEvents));
    }
    
    // Load registered events
    const storedRegisteredEvents = localStorage.getItem('registeredEvents');
    if (storedRegisteredEvents) {
      setRegisteredEvents(JSON.parse(storedRegisteredEvents));
    } else {
      localStorage.setItem('registeredEvents', JSON.stringify([]));
    }
    
    setIsLoading(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRegister = (eventId: number) => {
    // Check if already registered
    if (registeredEvents.includes(eventId)) {
      toast.info('You have already registered for this event');
      return;
    }
    
    // Update registered events
    const updatedRegisteredEvents = [...registeredEvents, eventId];
    setRegisteredEvents(updatedRegisteredEvents);
    localStorage.setItem('registeredEvents', JSON.stringify(updatedRegisteredEvents));
    
    // Update event registrations count
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          registrations: event.registrations + 1
        };
      }
      return event;
    });
    
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    toast.success('Successfully registered for the event!');
  };

  const isRegistered = (eventId: number) => {
    return registeredEvents.includes(eventId);
  };

  return (
    <div className="min-h-screen flex bg-festblue">
      {/* Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <StudentSidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-6">
          {/* Mobile View Menu */}
          <div className="md:hidden mb-6 flex justify-between items-center">
            <button className="p-2 rounded-md text-white bg-festblue-light">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">All Events</h1>
              <p className="text-gray-300">Discover and register for upcoming events</p>
            </div>
          </div>
          
          {/* Events Grid */}
          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-festblue-accent mx-auto"></div>
              <p className="mt-2 text-gray-300">Loading events...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <Card key={event.id} className="bg-festblue-light border border-gray-700 text-white overflow-hidden">
                  <div className="h-40 bg-gray-800 relative overflow-hidden">
                    <img 
                      src={event.imageUrl || '/placeholder.svg'} 
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        event.status === 'Upcoming' 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription className="text-gray-300 flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(event.date)}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-300">{event.description || 'No description available.'}</p>
                    <p className="mt-2 text-sm text-gray-400">Venue: {event.venue}</p>
                    <p className="text-sm text-gray-400">Registrations: {event.registrations}</p>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      onClick={() => handleRegister(event.id)}
                      disabled={event.status !== 'Upcoming' || isRegistered(event.id)}
                      className={`w-full ${
                        event.status !== 'Upcoming'
                          ? 'bg-gray-700 cursor-not-allowed'
                          : isRegistered(event.id)
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-festblue-accent hover:bg-festblue-accent/80'
                      }`}
                    >
                      {event.status !== 'Upcoming' 
                        ? 'Event Completed' 
                        : isRegistered(event.id) 
                          ? 'Registered' 
                          : 'Register Now'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentEvents;
