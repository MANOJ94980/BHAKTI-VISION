import React, { useMemo } from 'react';

interface ParticlesProps {
  count?: number;
  className?: string;
}

export const DivineParticles: React.FC<ParticlesProps> = ({ count = 24, className = '' }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 17) % 98}%`,
      top: `${(i * 23) % 95}%`,
      size: `${2 + (i % 4) * 1.5}px`,
      duration: `${6 + (i % 7) * 2}s`,
      delay: `${(i % 5) * 1.2}s`,
      opacity: 0.2 + (i % 4) * 0.15,
    }));
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-amber-300 blur-[0.5px] animate-pulse"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
            boxShadow: '0 0 10px 1px rgba(251, 191, 36, 0.4)',
          }}
        />
      ))}
    </div>
  );
};
