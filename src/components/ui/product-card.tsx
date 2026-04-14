"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  fabric: string;
  style?: string;
  isNew?: boolean;
  tags?: string[];
  className?: string;
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      id,
      name,
      description,
      image,
      fabric,
      style = "Standard Fit",
      isNew = false,
      tags = [],
      className,
    },
    ref,
  ) => {
    const [hovered, setHovered] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const shouldAnimate = !shouldReduceMotion;

    const containerVariants = {
      rest: {
        scale: 1,
        y: 0,
      },
      hover: shouldAnimate
        ? {
            scale: 1.02,
            y: -8,
            transition: {
              type: "spring" as const,
              stiffness: 400,
              damping: 28,
              mass: 0.6,
            },
          }
        : {},
    };

    const imageVariants = {
      rest: { scale: 1 },
      hover: { scale: 1.1 },
    };

    const contentVariants = {
      hidden: {
        opacity: 0,
        y: 20,
        filter: "blur(4px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring" as const,
          stiffness: 400,
          damping: 28,
          mass: 0.6,
          staggerChildren: 0.08,
          delayChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: {
        opacity: 0,
        y: 15,
        scale: 0.95,
        filter: "blur(2px)",
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          type: "spring" as const,
          stiffness: 400,
          damping: 25,
          mass: 0.5,
        },
      },
    };

    const letterVariants = {
      hidden: {
        opacity: 0,
        scale: 0.8,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring" as const,
          damping: 8,
          stiffness: 200,
          mass: 0.8,
        },
      },
    };

    return (
      <Link to={`/product/${id}`} className="block">
        <motion.div
          ref={ref}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial="rest"
          whileHover="hover"
          variants={containerVariants}
          className={cn(
            "relative w-full aspect-[3/4] rounded-3xl border border-border/20 text-card-foreground overflow-hidden shadow-xl shadow-black/5 cursor-pointer group backdrop-blur-sm bg-white",
            className,
          )}
        >
          {/* Full Cover Image */}
          <motion.img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-contain"
            variants={imageVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {/* Smooth Blur Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            {isNew && (
              <span className="bg-white/90 text-black text-[10px] tracking-widest uppercase py-1 px-3 rounded-full backdrop-blur-md font-medium">
                New
              </span>
            )}
            {tags?.includes("Premium") && (
              <span className="bg-amber-400 text-white text-[10px] tracking-widest uppercase py-1 px-3 rounded-full shadow-lg font-medium">
                Premium
              </span>
            )}
          </div>

          {/* Content */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute bottom-0 left-0 right-0 p-6 space-y-3 z-10"
          >
            {/* Fabric Type */}
            <motion.p
              variants={itemVariants}
              className="text-white/60 text-[10px] tracking-[0.2em] uppercase font-medium"
            >
              {fabric}
            </motion.p>

            {/* Name */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              <motion.h2
                className="text-xl font-display font-medium text-white leading-tight"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.02,
                    },
                  },
                }}
              >
                {name.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.h2>
            </motion.div>

            {/* Action Button */}
            <motion.div
              variants={itemVariants}
              className={cn(
                "flex items-center justify-between w-full py-3 px-5 rounded-2xl font-medium text-xs transition-all duration-300",
                "border border-white/20 bg-white/10 text-white backdrop-blur-md group-hover:bg-white group-hover:text-black",
              )}
            >
              <span>Explore Design</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>
    );
  },
);
