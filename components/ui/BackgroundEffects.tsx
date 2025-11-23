"use client";
import React, { useState, useEffect } from "react";
import { Particle } from "@/types";

export const BackgroundEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 20,
      }))
    );

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
          50% { transform: translateY(-40px) translateX(-10px); opacity: 0.2; }
          75% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
        }
        .animate-float { animation: float linear infinite; }
      `}</style>

      {/* Gradient Orbs */}
      <div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl transition-all duration-1000 ease-out"
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Floating Particles */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};
