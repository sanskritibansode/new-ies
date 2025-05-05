
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Edit, Eye } from 'lucide-react';
import AddEventDialog from '@/components/admin/AddEventDialog';

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

const ManageEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and has admin role
    const userRole = localStorage.getItem('userRole');
    
    if (!userRole || userRole !== 'admin') {
      toast.error('Please sign in as an admin to access this page');
      navigate('/signin');
      return;
    }
    
    // Load events from localStorage or use sample data
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
    setIsLoading(false);
  };

  const handleAddEvent = (newEvent: Omit<Event, 'id'>) => {
    const newId = events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
    const eventWithId = { ...newEvent, id: newId };
    
    const updatedEvents = [...events, eventWithId];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
    toast.success('Event added successfully');
    setIsAddEventDialogOpen(false);
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      toast.success('Event deleted successfully');
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const viewEventDetails = (id: number) => {
    // In a real app, this would navigate to a details page
    const event = events.find(e => e.id === id);
    if (event) {
      toast.info(`Viewing details for: ${event.name}`);
    }
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
            <button className="p-2 rounded-md text-white bg-festblue-light">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Manage Events</h1>
              <p className="text-gray-300">Create, view and manage college events</p>
            </div>
            
            <Button 
              onClick={() => setIsAddEventDialogOpen(true)}
              className="bg-festblue-accent hover:bg-festblue-accent/80"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
          
          {/* Events Table */}
          <div className="glass-card p-6 mb-8">
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-festblue-accent mx-auto"></div>
                  <p className="mt-2 text-gray-300">Loading events...</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-700">
                      <TableHead className="text-gray-300">Name</TableHead>
                      <TableHead className="text-gray-300">Date</TableHead>
                      <TableHead className="text-gray-300">Venue</TableHead>
                      <TableHead className="text-gray-300">Registrations</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.id} className="border-b border-gray-700">
                        <TableCell className="text-white font-medium">{event.name}</TableCell>
                        <TableCell className="text-gray-300">{formatDate(event.date)}</TableCell>
                        <TableCell className="text-gray-300">{event.venue}</TableCell>
                        <TableCell className="text-gray-300">{event.registrations}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            event.status === 'Upcoming' 
                              ? 'bg-green-900/30 text-green-400' 
                              : 'bg-gray-700 text-gray-300'
                          }`}>
                            {event.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              onClick={() => viewEventDetails(event.id)}
                              className="h-8 w-8 p-0 text-blue-500 hover:text-blue-300 hover:bg-blue-500/10"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={() => handleDeleteEvent(event.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Event Dialog */}
      <AddEventDialog
        isOpen={isAddEventDialogOpen}
        onClose={() => setIsAddEventDialogOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
};

export default ManageEvents;
