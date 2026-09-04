'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const slides = [
  { id: 1, image: '/images/slide1.webp' },
  { id: 2, image: '/images/slide2.webp' },
  { id: 3, image: '/images/slide3.webp' },
  { id: 4, image: '/images/slide4.webp' },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const timerRef = useRef(null);

  // Mount other slides after initial render to avoid downloading them during initial paint
  useEffect(() => {
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 1500);

    return () => clearTimeout(readyTimer);
  }, []);

  // Auto-advance slides smoothly every 5.5 seconds
  useEffect(() => {
    if (!isReady) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(timerRef.current);
  }, [isReady]);

  // Only render slide 1 during initial SSR/paint; render all slides once client is ready
  const visibleSlides = isReady ? slides : [slides[0]];

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
        {visibleSlides.map((slide, index) => (
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
              quality={75}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;

