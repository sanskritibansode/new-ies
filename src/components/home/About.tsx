
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-festblue-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">About IES FESTHIVE</h2>
          <div className="w-20 h-1 bg-festblue-accent mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold text-festblue-accent mb-4">
              Your One-Stop Platform for College Events
            </h3>
            <p className="text-gray-300 mb-6">
              IES FESTHIVE is a comprehensive event management system designed specifically for IES College of Technology, Bhopal. Our platform enables seamless organization, promotion, and participation in college festivals, workshops, seminars, and other events.
            </p>
            <p className="text-gray-300 mb-6">
              Whether you're a student looking to discover exciting campus activities or an administrator tasked with organizing events, our platform simplifies the entire process from event creation to registration and participation.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-festblue p-4 rounded-lg text-center">
                <h4 className="text-festblue-accent font-bold text-xl">50+</h4>
                <p className="text-gray-300 text-sm">Events Managed</p>
              </div>
              <div className="bg-festblue p-4 rounded-lg text-center">
                <h4 className="text-festblue-accent font-bold text-xl">5000+</h4>
                <p className="text-gray-300 text-sm">Student Participants</p>
              </div>
              <div className="bg-festblue p-4 rounded-lg text-center">
                <h4 className="text-festblue-accent font-bold text-xl">30+</h4>
                <p className="text-gray-300 text-sm">Faculty Members</p>
              </div>
              <div className="bg-festblue p-4 rounded-lg text-center">
                <h4 className="text-festblue-accent font-bold text-xl">12+</h4>
                <p className="text-gray-300 text-sm">Departments</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80" 
                alt="College Festival" 
                className="object-cover w-full h-full rounded-xl shadow-lg" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
