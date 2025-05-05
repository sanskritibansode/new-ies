import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  category: string;
  status: 'upcoming' | 'past';
  registrationDeadline: string;
}

// Default event data if no stored events exist
const defaultEventsData: Event[] = [
  {
    id: 1,
    name: 'Tech Innovate 2023',
    description: 'Annual tech exhibition showcasing student innovations and projects from all engineering departments.',
    date: '2023-06-15',
    time: '10:00 AM - 4:00 PM',
    venue: 'Main Auditorium',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    category: 'Technical',
    status: 'past',
    registrationDeadline: '2023-06-10',
  },
  {
    id: 2,
    name: 'Cultural Night 2023',
    description: 'A night of music, dance, and theatrical performances celebrating the diverse talents of IES students.',
    date: '2023-07-25',
    time: '6:00 PM - 10:00 PM',
    venue: 'Open Air Theatre',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80',
    category: 'Cultural',
    status: 'past',
    registrationDeadline: '2023-07-20',
  },
  {
    id: 3,
    name: 'Hackathon 2023',
    description: '24-hour coding competition where students develop innovative solutions to real-world problems.',
    date: '2023-09-10',
    time: '9:00 AM - 9:00 AM (Next day)',
    venue: 'Computer Science Block',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
    category: 'Technical',
    status: 'past',
    registrationDeadline: '2023-09-01',
  },
  {
    id: 4,
    name: 'Annual Sports Meet 2023',
    description: 'Inter-department sports competition featuring various indoor and outdoor games.',
    date: '2023-11-05',
    time: '8:00 AM - 6:00 PM',
    venue: 'College Sports Ground',
    image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&q=80',
    category: 'Sports',
    status: 'past',
    registrationDeadline: '2023-10-30',
  },
  {
    id: 5,
    name: 'Tech Innovate 2024',
    description: 'Annual tech exhibition showcasing student innovations and projects from all engineering departments.',
    date: '2024-06-20',
    time: '10:00 AM - 4:00 PM',
    venue: 'Main Auditorium',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    category: 'Technical',
    status: 'upcoming',
    registrationDeadline: '2024-06-15',
  },
  {
    id: 6,
    name: 'Cultural Night 2024',
    description: 'A night of music, dance, and theatrical performances celebrating the diverse talents of IES students.',
    date: '2024-07-30',
    time: '6:00 PM - 10:00 PM',
    venue: 'Open Air Theatre',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80',
    category: 'Cultural',
    status: 'upcoming',
    registrationDeadline: '2024-07-25',
  },
  {
    id: 7,
    name: 'Hackathon 2024',
    description: '24-hour coding competition where students develop innovative solutions to real-world problems.',
    date: '2024-09-15',
    time: '9:00 AM - 9:00 AM (Next day)',
    venue: 'Computer Science Block',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80',
    category: 'Technical',
    status: 'upcoming',
    registrationDeadline: '2024-09-10',
  },
  {
    id: 8,
    name: 'Annual Sports Meet 2024',
    description: 'Inter-department sports competition featuring various indoor and outdoor games.',
    date: '2024-11-10',
    time: '8:00 AM - 6:00 PM',
    venue: 'College Sports Ground',
    image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&q=80',
    category: 'Sports',
    status: 'upcoming',
    registrationDeadline: '2024-11-01',
  },
];

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInterests, setUserInterests] = useState<number[]>([]);
  
  useEffect(() => {
    // Check if user is logged in
    const userRole = localStorage.getItem('userRole');
    setIsLoggedIn(!!userRole);
    
    // Get user interests from localStorage
    const storedInterests = localStorage.getItem('userInterests');
    if (storedInterests) {
      setUserInterests(JSON.parse(storedInterests));
    }
    
    // Load events from localStorage or use default data
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      // Get admin-created events
      const adminEvents = JSON.parse(storedEvents).map((event: any) => ({
        id: event.id,
        name: event.name,
        description: `Event organized at ${event.venue}`,
        date: event.date,
        time: '10:00 AM - 4:00 PM', // Default time
        venue: event.venue,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80', // Default image
        category: 'College',
        status: new Date(event.date) > new Date() ? 'upcoming' : 'past',
        registrationDeadline: event.date, // Use same date as event date for deadline
      }));
      
      // Combine with default events for better display
      setEvents([...adminEvents, ...defaultEventsData]);
    } else {
      setEvents(defaultEventsData);
    }
  }, []);
  
  useEffect(() => {
    // Filter events based on search term and active filter
    let filtered = events;
    
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeFilter !== 'all') {
      filtered = filtered.filter((event) => {
        if (activeFilter === 'upcoming') return event.status === 'upcoming';
        if (activeFilter === 'past') return event.status === 'past';
        return event.category.toLowerCase() === activeFilter.toLowerCase();
      });
    }
    
    setFilteredEvents(filtered);
  }, [searchTerm, activeFilter, events]);
  
  const toggleInterest = (eventId: number) => {
    if (!isLoggedIn) {
      toast.error('Please sign in to mark your interest in events');
      return;
    }
    
    let newInterests: number[];
    
    if (userInterests.includes(eventId)) {
      newInterests = userInterests.filter((id) => id !== eventId);
      toast.success('Event removed from your interests');
    } else {
      newInterests = [...userInterests, eventId];
      toast.success('Event added to your interests');
    }
    
    setUserInterests(newInterests);
    localStorage.setItem('userInterests', JSON.stringify(newInterests));
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
    <div className="min-h-screen flex flex-col bg-festblue">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white">College Events</h1>
            <p className="mt-4 text-lg text-gray-300">
              Discover and participate in exciting events happening at IES College
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-between items-center">
              <div className="w-full md:w-1/3">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-festblue-light border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-festblue-accent text-white"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
                <button
                  className={`px-4 py-2 rounded-full ${
                    activeFilter === 'all'
                      ? 'bg-festblue-accent text-white'
                      : 'bg-festblue-light text-gray-300 hover:bg-festblue-light/80'
                  }`}
                  onClick={() => setActiveFilter('all')}
                >
                  All
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${
                    activeFilter === 'upcoming'
                      ? 'bg-festblue-accent text-white'
                      : 'bg-festblue-light text-gray-300 hover:bg-festblue-light/80'
                  }`}
                  onClick={() => setActiveFilter('upcoming')}
                >
                  Upcoming
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${
                    activeFilter === 'past'
                      ? 'bg-festblue-accent text-white'
                      : 'bg-festblue-light text-gray-300 hover:bg-festblue-light/80'
                  }`}
                  onClick={() => setActiveFilter('past')}
                >
                  Past
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${
                    activeFilter === 'technical'
                      ? 'bg-festblue-accent text-white'
                      : 'bg-festblue-light text-gray-300 hover:bg-festblue-light/80'
                  }`}
                  onClick={() => setActiveFilter('technical')}
                >
                  Technical
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${
                    activeFilter === 'cultural'
                      ? 'bg-festblue-accent text-white'
                      : 'bg-festblue-light text-gray-300 hover:bg-festblue-light/80'
                  }`}
                  onClick={() => setActiveFilter('cultural')}
                >
                  Cultural
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${
                    activeFilter === 'sports'
                      ? 'bg-festblue-accent text-white'
                      : 'bg-festblue-light text-gray-300 hover:bg-festblue-light/80'
                  }`}
                  onClick={() => setActiveFilter('sports')}
                >
                  Sports
                </button>
              </div>
            </div>
          </div>
          
          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="glass-card overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-festblue-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {event.category}
                    </div>
                    <div className={`absolute top-4 left-4 text-white text-xs font-semibold px-3 py-1 rounded-full ${
                      event.status === 'upcoming' ? 'bg-green-600' : 'bg-gray-600'
                    }`}>
                      {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-festblue-accent flex-shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-300 text-sm">{formatDate(event.date)}</span>
                      </div>
                      
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-festblue-accent flex-shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-300 text-sm">{event.time}</span>
                      </div>
                      
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-festblue-accent flex-shrink-0 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-300 text-sm">{event.venue}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/events/${event.id}`}
                        className="text-festblue-accent hover:text-festblue-accent/80 text-sm font-medium"
                      >
                        View Details
                      </Link>
                      
                      {event.status === 'upcoming' && (
                        <Button
                          variant={userInterests.includes(event.id) ? "default" : "outline"}
                          size="sm"
                          className={userInterests.includes(event.id) 
                            ? "bg-festblue-accent hover:bg-festblue-accent/80 text-white" 
                            : "border-festblue-accent text-festblue-accent hover:bg-festblue-accent/10"
                          }
                          onClick={() => toggleInterest(event.id)}
                        >
                          {userInterests.includes(event.id) ? 'Interested' : 'Mark Interest'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-white">No events found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Events;
