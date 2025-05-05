
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-festblue">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full text-center px-4">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-festblue-accent">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4">Page Not Found</h2>
            <p className="text-gray-300 mt-4">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-festblue-accent hover:bg-festblue-accent/80">
              <Link to="/">Go Back Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/events">Explore Events</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
