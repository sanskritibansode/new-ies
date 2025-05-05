
import React, { useState, useEffect } from 'react';

const images = [
  '/lovable-uploads/04c994b3-e394-4fd2-9d22-c761aeb2e694.png', // Main campus view
  'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80', // College academic building
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80', // College library
  'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&q=80', // College auditorium
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80', // College sports event
];

const imageDescriptions = [
  'IES University Bhopal Main Campus',
  'Modern Academic Building',
  'State-of-the-art Library',
  'Multipurpose Auditorium',
  'Annual Sports Tournament',
];

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-festblue-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">IES University Gallery</h2>
          <div className="w-20 h-1 bg-festblue-accent mx-auto mt-4"></div>
          <p className="text-gray-300 mt-4">Glimpses of our beautiful campus and vibrant college life</p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden rounded-xl h-[60vh]">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image}
                  alt={imageDescriptions[index]}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                  <p className="text-lg font-semibold">{imageDescriptions[index]}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentImage ? 'bg-festblue-accent' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImage(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
          
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            onClick={() => setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1))}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            onClick={() => setCurrentImage(prev => (prev === images.length - 1 ? 0 : prev + 1))}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
