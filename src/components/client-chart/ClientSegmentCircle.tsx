
import React from 'react';
import { ClientSegment } from '@/types/client';

interface ClientSegmentCircleProps {
  segments: ClientSegment[];
  totalClients: number;
  hoveredSegment: string | null;
  onSegmentHover: (segmentName: string | null) => void;
  onSegmentClick: (segment: ClientSegment) => void;
}

const ClientSegmentCircle = ({
  segments,
  totalClients,
  hoveredSegment,
  onSegmentHover,
  onSegmentClick
}: ClientSegmentCircleProps) => {
  const getSegmentRadius = (priority: number) => {
    const baseRadius = 25;
    const maxRadius = 100;
    return baseRadius + (priority - 1) * ((maxRadius - baseRadius) / 5);
  };

  const getSegmentWidth = (priority: number) => {
    if (priority >= 4) return 15;
    return 12;
  };

  const getOpacity = (priority: number) => {
    return 1 - (priority - 1) * 0.12;
  };

  return (
    <div className="relative flex items-center justify-center h-56">
      <svg width="220" height="220" className="absolute">
        {segments.map((segment, index) => {
          const radius = getSegmentRadius(segment.priority);
          const strokeWidth = getSegmentWidth(segment.priority);
          const circumference = 2 * Math.PI * radius;
          const percentage = (segment.count / totalClients) * 100;
          const opacity = getOpacity(segment.priority);
          
          const minArcLength = 0.15;
          const arcLength = Math.max(percentage / 100, minArcLength);
          const dashArray = `${circumference * arcLength} ${circumference}`;
          
          return (
            <g key={segment.name}>
              <circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth={strokeWidth}
                opacity="0.3"
              />
              
              <circle
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={dashArray}
                strokeLinecap="round"
                transform={`rotate(${index * 50 - 90} 110 110)`}
                className="transition-all duration-300 cursor-pointer"
                style={{
                  opacity: opacity,
                  filter: hoveredSegment === segment.name ? 'brightness(1.2) drop-shadow(0 0 6px rgba(0,0,0,0.3))' : 'none',
                  strokeWidth: hoveredSegment === segment.name ? strokeWidth + 2 : strokeWidth
                }}
                onMouseEnter={() => onSegmentHover(segment.name)}
                onMouseLeave={() => onSegmentHover(null)}
                onClick={() => onSegmentClick(segment)}
              />
            </g>
          );
        })}
      </svg>

      <div className="absolute bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-slate-200">
        <div className="text-center">
          <div className="text-xs font-bold text-slate-800">{segments.length}</div>
          <div className="text-xs text-slate-500">seg.</div>
        </div>
      </div>
    </div>
  );
};

export default ClientSegmentCircle;
