'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const slides = [
    { id: 1, image: '/images/slide1.webp' },
    { id: 2, image: '/images/slide2.webp' },
    { id: 3, image: '/images/slide3.webp' },
    { id: 4, image: '/images/slide4.webp' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = 4000;
  const timerRef = useRef(null);

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideInterval);

    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      aria-label="Hero image slider"
    >
      <div
        className="flex h-full w-full"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: 'transform 0.7s ease-in-out',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="relative h-full w-full flex-shrink-0 min-w-full"
          >
            <Image
              src={slide.image}
              alt={`Slide ${slide.id}`}
              fill
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              sizes="100vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;

