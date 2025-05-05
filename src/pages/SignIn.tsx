
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if role is specified in URL
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam === 'admin' || roleParam === 'student') {
      setRole(roleParam);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication (in a real app, this would be an API call)
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo credentials for testing
      if (email === 'admin@ies.edu' && password === 'admin123') {
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('emailVerified', 'true');
        toast.success('Signed in as Admin successfully');
        navigate('/admin/dashboard');
      } else if (email === 'student@ies.edu' && password === 'student123') {
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('emailVerified', 'true');
        toast.success('Signed in successfully');
        navigate('/student/dashboard');
      } else {
        // Check if this is a registered user
        const storedEmail = localStorage.getItem('userEmail');
        const emailVerified = localStorage.getItem('emailVerified');
        
        if (storedEmail === email) {
          if (emailVerified === 'true') {
            const userRole = localStorage.getItem('userRole') || 'student';
            localStorage.setItem('userEmail', email);
            toast.success('Signed in successfully');
            
            if (userRole === 'admin') {
              navigate('/admin/dashboard');
            } else {
              navigate('/student/dashboard');
            }
          } else {
            // Email not verified, send to verification page
            toast.error('Email not verified. Please verify your email first.');
            navigate('/verify-otp', { state: { email } });
          }
        } else {
          // For demo purposes, allow any credential combination and set as selected role
          localStorage.setItem('userRole', role);
          localStorage.setItem('userEmail', email);
          localStorage.setItem('emailVerified', 'true');
          toast.success(`Signed in as ${role} successfully`);
          
          if (role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/student/dashboard');
          }
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-festblue">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              {role === 'admin' ? 'Admin Sign In' : 'Student Sign In'}
            </h2>
            <p className="mt-2 text-gray-300">Sign in to your IES FESTHIVE account</p>
          </div>
          
          <div className="mb-6 flex rounded-md overflow-hidden">
            <button
              onClick={() => setRole('student')}
              className={`flex-1 py-2 ${
                role === 'student'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 ${
                role === 'admin'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              Admin
            </button>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-festblue-light border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-festblue-accent text-white"
                placeholder={role === 'admin' ? 'admin@ies.edu' : 'student@ies.edu'}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-festblue-light border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-festblue-accent text-white"
                placeholder={role === 'admin' ? 'admin123' : 'student123'}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-festblue-light border-gray-600 rounded text-festblue-accent focus:ring-festblue-accent"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="text-festblue-accent hover:text-festblue-accent/80">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 ${
                  role === 'admin' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  `Sign in as ${role === 'admin' ? 'Admin' : 'Student'}`
                )}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link to="/signup" className="text-festblue-accent hover:text-festblue-accent/80">
                Sign up
              </Link>
            </p>
            
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-festblue-light text-gray-300">Demo Credentials</span>
                </div>
              </div>
              
              <div className="mt-2 grid gap-2">
                <div className="text-xs text-gray-300">Admin: admin@ies.edu / admin123</div>
                <div className="text-xs text-gray-300">Student: student@ies.edu / student123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SignIn;
