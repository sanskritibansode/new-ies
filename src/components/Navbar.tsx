
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userRole')); 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    closeMobileMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      // If not on home page, navigate home first then scroll after page loads
      localStorage.setItem('scrollTo', sectionId);
    }
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const sectionId = href.substring(2);
      scrollToSection(sectionId);
      return false; // Prevent default link behavior
    }
    return true; // Allow default link behavior
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-festblue/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-festblue-accent">IES FESTHIVE</h1>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`${
                    location.pathname === item.href ? 'text-festblue-accent' : 'text-gray-300'
                  } hover:text-festblue-accent px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                  onClick={(e) => {
                    if (!handleNavClick(item.href)) {
                      e.preventDefault();
                    }
                    closeMobileMenu();
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {!isLoggedIn ? (
              <>
                <Button asChild variant="outline" className="text-festblue-accent border-festblue-accent hover:bg-festblue-accent/10">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild className="bg-festblue-accent hover:bg-festblue-accent/90">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            ) : (
              <Button 
                asChild 
                className="bg-festblue-accent hover:bg-festblue-accent/90"
              >
                <Link to={localStorage.getItem('userRole') === 'admin' ? '/admin/dashboard' : '/student/dashboard'}>
                  Dashboard
                </Link>
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-festblue-light"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:hidden bg-festblue-light`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`${
                location.pathname === item.href ? 'bg-festblue-accent text-white' : 'text-gray-300 hover:bg-festblue/80 hover:text-white'
              } block px-3 py-2 rounded-md text-base font-medium`}
              onClick={(e) => {
                if (!handleNavClick(item.href)) {
                  e.preventDefault();
                }
                closeMobileMenu();
              }}
            >
              {item.label}
            </Link>
          ))}
          {!isLoggedIn ? (
            <>
              <Link
                to="/signin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-festblue/80 hover:text-white"
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-festblue/80 hover:text-white"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <Link
              to={localStorage.getItem('userRole') === 'admin' ? '/admin/dashboard' : '/student/dashboard'}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-festblue/80 hover:text-white"
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
