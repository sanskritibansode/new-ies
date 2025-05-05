
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import OtpVerification from "./pages/OtpVerification";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentEvents from "./pages/student/StudentEvents";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import NotFound from "./pages/NotFound";
import React from 'react';

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/events" element={<StudentEvents />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/events" element={<ManageEvents />} />
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
