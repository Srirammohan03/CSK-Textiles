import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  username: string;
  avatar: string;
}
export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "CSK Textiles has been my go-to for suiting fabrics for over 10 years. Their collection and expertise in men's formal wear is unmatched in Hyderabad.",
    name: "Rajesh Mehta",
    username: "Corporate Executive",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Rajesh%20Mehta",
  },
  {
    id: 2,
    quote:
      "Found the perfect fabric for my wedding sherwani here. The quality and craftsmanship recommendations made my special day even more memorable.",
    name: "Arjun Reddy",
    username: "Groom",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Arjun%20Reddy",
  },
  {
    id: 3,
    quote:
      "Exceptional collection of premium fabrics. Whether it's executive suits or wedding attire, CSK Textiles delivers quality that speaks for itself.",
    name: "Vikram Singh",
    username: "Business Owner",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Vikram%20Singh",
  },
  {
    id: 4,
    quote:
      "The heritage of 25+ years shows in every fabric. Traditional values meet modern styles. Highly recommend for quality tailoring.",
    name: "Anil Kumar",
    username: "Fashion Enthusiast",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Anil%20Kumar",
  },
  {
    id: 5,
    quote:
      "Amazing variety of shirting fabrics. The staff helped me choose perfect materials for daily office wear.",
    name: "Karthik Sharma",
    username: "Software Engineer",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Karthik%20Sharma",
  },
  {
    id: 6,
    quote:
      "Premium fabrics at great value. My suits have never looked better thanks to CSK Textiles.",
    name: "Rahul Verma",
    username: "Entrepreneur",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Rahul%20Verma",
  },
  {
    id: 7,
    quote:
      "Excellent customer service and deep knowledge of fabrics. Helped me build a complete wardrobe.",
    name: "Sandeep Gupta",
    username: "Consultant",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Sandeep%20Gupta",
  },
  {
    id: 8,
    quote:
      "The wedding collection is outstanding. Got multiple compliments for my outfits.",
    name: "Manoj Patel",
    username: "Groom",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Manoj%20Patel",
  },
  {
    id: 9,
    quote:
      "Top-notch quality and a wide selection. Perfect place for anyone serious about style.",
    name: "Amit Joshi",
    username: "Marketing Head",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Amit%20Joshi",
  },
  {
    id: 10,
    quote:
      "From casual shirts to premium suits, everything here reflects craftsmanship and elegance.",
    name: "Naveen Reddy",
    username: "Startup Founder",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Naveen%20Reddy",
  },
];

const getVisibleCount = (width: number): number => {
  if (width >= 1280) return 3;
  if (width >= 768) return 2;
  return 1;
};

export const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCount = getVisibleCount(windowWidth);
  const maxIndex = testimonials.length - visibleCount;

  // ✅ Autoplay (clean loop)
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, maxIndex]);

  const goNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    pauseAutoPlay();
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    pauseAutoPlay();
  };

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    pauseAutoPlay();
  };

  return (
    <div className="px-4 py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs uppercase">
            Testimonials
          </span>
          <h3 className="text-4xl font-medium mt-4">
            Transformative Style Experiences
          </h3>
          <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
        </div>

        {/* Controls */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={goPrev}
            className="p-2 rounded-full bg-white shadow-md"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={goNext}
            className="p-2 rounded-full bg-white shadow-md"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: `-${currentIndex * (100 / visibleCount)}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="w-full md:w-1/2 xl:w-1/3 flex-shrink-0 p-2"
              >
                <div className="rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl h-full relative">
                  <Quote className="absolute top-4 left-4 opacity-10 w-10 h-10" />

                  <p className="italic text-gray-700 dark:text-gray-300 mb-6">
                    “{t.quote}”
                  </p>

                  <div className="flex items-center mt-auto pt-4 border-t">
                    <img src={t.avatar} className="w-12 h-12 rounded-full" />
                    <div className="ml-3">
                      <h4 className="font-semibold">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.username}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ✅ Dots FIXED */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`mx-1 w-2.5 h-2.5 rounded-full ${
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
