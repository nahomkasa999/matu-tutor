"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";

export function BackgroundBeams() {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const beams = Array.from(container.children) as HTMLDivElement[];

    beamsRef.current = beams;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      beams.forEach((beam) => {
        const beamRect = beam.getBoundingClientRect();
        const beamX = beamRect.left + beamRect.width / 2;
        const beamY = beamRect.top + beamRect.height / 2;

        const distance = Math.sqrt(
          Math.pow(x - beamX, 2) + Math.pow(y - beamY, 2)
        );

        const maxDistance = 200;
        const opacity = Math.max(0, 1 - distance / maxDistance);

        beam.style.opacity = opacity.toString();
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useAnimationFrame((time) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const beams = Array.from(container.children) as HTMLDivElement[];

    beams.forEach((beam, index) => {
      const speed = 0.5 + index * 0.1;
      const offset = (time * speed) % 1000;
      beam.style.transform = `translateX(${offset}px)`;
    });
  });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-[1px] w-[100px] bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"
          style={{
            top: `${20 + i * 20}%`,
            left: `${i * 20}%`,
            transform: `rotate(${i * 10}deg)`,
          }}
        />
      ))}
    </div>
  );
} 