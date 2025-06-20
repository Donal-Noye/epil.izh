"use client";

import { useAppearanceDelay } from "@/shared/lib/react";

export function FullPageLogoSpinner({ isLoading }: { isLoading: boolean }) {
  const show = useAppearanceDelay(isLoading, {
    appearenceDelay: 0, // задержка перед появлением
    minDisplay: 1000, // минимальное время отображения
  });

  if (show) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <svg
          viewBox="0 0 1200 300"
          className="w-[800px] h-[200px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="textGradient">
              <stop offset="0%" stopColor="#999" />
              <stop offset="50%" stopColor="white" />
              <stop offset="100%" stopColor="#999" />
            </linearGradient>

            <pattern
              id="animated-stripe"
              patternUnits="userSpaceOnUse"
              width="400"
              height="300"
            >
              <rect
                x="0"
                y="0"
                width="400"
                height="300"
                fill="url(#moving-light)"
              />
            </pattern>

            <linearGradient id="moving-light">
              <stop offset="0%" stopColor="#999" />
              <stop offset="50%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="#999" />
            </linearGradient>

            <mask id="text-mask">
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="180"
                fontWeight="bold"
                fontFamily="sans-serif"
                fill="white"
              >
                EPIL.IZH
              </text>
            </mask>
          </defs>

          <g mask="url(#text-mask)">
            <rect
              x="0"
              y="0"
              width="1200"
              height="300"
              fill="url(#animated-stripe)"
              className="animate-stripe"
            />
          </g>
        </svg>

        <style jsx>{`
          .animate-stripe {
            animation: stripe-move 2.5s linear infinite;
          }

          @keyframes stripe-move {
            0% {
              transform: translateX(-400px);
            }
            100% {
              transform: translateX(400px);
            }
          }
        `}</style>
      </div>
    );
  }
}
