"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 1500,
  delay = 0,
  decimals = 0,
  className,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            setTimeout(() => {
              const startTime = performance.now();
              const startValue = 0;

              const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function: easeOutExpo
                const easeProgress = 1 - Math.pow(2, -10 * progress);

                const current = startValue + (value - startValue) * easeProgress;
                setDisplayValue(current);

                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };

              requestAnimationFrame(animate);
            }, delay);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, delay, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

interface AnimatedPercentageProps {
  value: number;
  duration?: number;
  className?: string;
  barClassName?: string;
  showBar?: boolean;
}

export function AnimatedPercentage({
  value,
  duration = 1000,
  className,
  barClassName,
  showBar = true,
}: AnimatedPercentageProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = 1 - Math.pow(2, -10 * progress);
              setDisplayValue(value * easeProgress);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <div ref={ref} className="space-y-2">
      {showBar && (
        <div className={`h-2 rounded-full bg-gray-100 overflow-hidden ${barClassName}`}>
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-100"
            style={{ width: `${displayValue}%` }}
          />
        </div>
      )}
      <span className={className}>{Math.round(displayValue)}%</span>
    </div>
  );
}
