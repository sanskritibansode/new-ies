
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Features from '@/components/home/Features';
import ImageCarousel from '@/components/home/ImageCarousel';
import ContactForm from '@/components/home/ContactForm';

const Home = () => {
  useEffect(() => {
    // Check if there's a section to scroll to (from navigation)
    const scrollToSection = localStorage.getItem('scrollTo');
    if (scrollToSection) {
      localStorage.removeItem('scrollTo');
      setTimeout(() => {
        const element = document.getElementById(scrollToSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-festblue">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <section id="about">
          <About />
        </section>
        <ImageCarousel />
        <Features />
        <section id="contact">
          <ContactForm />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
