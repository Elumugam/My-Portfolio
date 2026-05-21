import React from 'react';

export type CharState = 'idle' | 'walk' | 'run' | 'jump' | 'sit';

type CharProps = {
  state: CharState;
  className?: string;
};

export const CatSVG = ({ state, className = '' }: CharProps) => (
    <svg viewBox="0 0 100 100" className={`w-full h-full fill-white drop-shadow-md character-svg anim-${state} ${className}`}>
        <g className="char-body-group">
            {/* Tail */}
            <path d="M 30 65 Q 10 30 25 15" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" className="char-tail" />
            {/* Body */}
            <path d="M 25 65 Q 40 45 75 55 L 75 80 L 25 80 Z" rx="10" />
            {/* Head */}
            <circle cx="75" cy="45" r="14" />
            {/* Ears */}
            <polygon points="65,35 68,20 75,35" />
            <polygon points="75,35 82,20 85,35" />
            {/* Legs */}
            <rect x="35" y="75" width="6" height="20" rx="3" className="char-leg leg-1" />
            <rect x="45" y="75" width="6" height="20" rx="3" className="char-leg leg-2" />
            <rect x="60" y="75" width="6" height="20" rx="3" className="char-leg leg-3" />
            <rect x="70" y="75" width="6" height="20" rx="3" className="char-leg leg-4" />
        </g>
    </svg>
);

export const RabbitSVG = ({ state, className = '' }: CharProps) => (
    <svg viewBox="0 0 100 100" className={`w-full h-full fill-white drop-shadow-md character-svg anim-${state} ${className}`}>
        <g className="char-body-group">
            {/* Tail */}
            <circle cx="20" cy="70" r="8" />
            {/* Body */}
            <path d="M 25 75 Q 35 40 70 65 L 65 85 L 30 85 Z" />
            {/* Head */}
            <circle cx="70" cy="55" r="12" />
            {/* Ears (long) */}
            <path d="M 65 45 Q 55 10 65 15 Q 70 30 70 45" />
            <path d="M 70 45 Q 65 10 75 15 Q 80 30 75 45" />
            {/* Legs */}
            <rect x="35" y="80" width="8" height="15" rx="4" className="char-leg leg-1" />
            <rect x="50" y="80" width="8" height="15" rx="4" className="char-leg leg-2" />
            <rect x="65" y="80" width="6" height="15" rx="3" className="char-leg leg-3" />
        </g>
    </svg>
);

export const BirdSVG = ({ state, className = '' }: CharProps) => (
    <svg viewBox="0 0 100 100" className={`w-full h-full fill-white drop-shadow-md character-svg anim-${state} ${className}`}>
        <g className="char-body-group">
            {/* Tail */}
            <polygon points="30,60 10,50 15,70" />
            {/* Body */}
            <ellipse cx="50" cy="65" rx="25" ry="18" />
            {/* Head */}
            <circle cx="70" cy="50" r="12" />
            {/* Beak */}
            <polygon points="78,48 95,52 78,56" />
            {/* Wing */}
            <path d="M 40 60 Q 50 40 70 65 Z" className="char-wing fill-white/80" />
            {/* Legs */}
            <rect x="45" y="80" width="4" height="15" rx="2" className="char-leg leg-1" />
            <rect x="55" y="80" width="4" height="15" rx="2" className="char-leg leg-2" />
        </g>
    </svg>
);

export const RobotSVG = ({ state, className = '' }: CharProps) => (
    <svg viewBox="0 0 100 100" className={`w-full h-full fill-white drop-shadow-lg character-svg anim-${state} ${className}`}>
        <g className="char-body-group">
            {/* Antenna */}
            <rect x="48" y="15" width="4" height="15" />
            <circle cx="50" cy="12" r="4" className="animate-pulse fill-white/80" />
            {/* Head */}
            <rect x="35" y="30" width="30" height="25" rx="4" />
            {/* Eye */}
            <rect x="50" y="38" width="10" height="4" rx="2" className="fill-black" />
            {/* Body */}
            <rect x="30" y="58" width="40" height="25" rx="6" />
            {/* Arm */}
            <rect x="45" y="60" width="25" height="6" rx="3" className="char-arm transform origin-left rotate-45" />
            {/* Wheel / Base */}
            <circle cx="50" cy="85" r="10" className="char-wheel" />
            {/* Track */}
            <rect x="35" y="83" width="30" height="4" rx="2" className="fill-white/50" />
        </g>
    </svg>
);
