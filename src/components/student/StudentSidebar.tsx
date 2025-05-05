
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  {
    title: 'Dashboard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    ),
    path: '/student/dashboard',
  },
  {
    title: 'My Events',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    ),
    path: '/student/my-events',
  },
  {
    title: 'Notifications',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
      </svg>
    ),
    path: '/student/notifications',
  },
  {
    title: 'Profile',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    ),
    path: '/student/profile',
  },
];

const StudentSidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-festblue-light h-full p-4">
      <div className="flex items-center justify-center mb-8 pt-4">
        <Link to="/" className="text-2xl font-bold text-festblue-accent">
          IES FESTHIVE
        </Link>
      </div>
      
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-festblue-accent text-white'
                : 'text-gray-300 hover:bg-festblue/80 hover:text-white'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
      
      <div className="absolute bottom-4 w-[calc(100%-2rem)]">
        <Link
          to="/"
          className="flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-festblue/80 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>Back to Site</span>
        </Link>
      </div>
    </div>
  );
};

export default StudentSidebar;
