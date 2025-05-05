
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/lovable-uploads/04c994b3-e394-4fd2-9d22-c761aeb2e694.png)' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-festblue/80 to-festblue/70"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-4"
        >
          <span className="block">Welcome to</span>
          <span className="block text-festblue-accent">IES UNIVERSITY BHOPAL</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
        >
          Celebrate, Connect, Create – Your College Fest, Simplified!
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
        >
          <Button 
            asChild 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6"
          >
            <Link to="/signin?role=student">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                Student Login
              </span>
            </Link>
          </Button>
          <Button 
            asChild 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
          >
            <Link to="/signin?role=admin">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
                Admin Login
              </span>
            </Link>
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <a 
            href="#about" 
            className="inline-flex items-center text-white hover:text-festblue-accent transition-colors"
          >
            <span className="mr-2">Scroll Down</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-5 h-5 animate-bounce"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
