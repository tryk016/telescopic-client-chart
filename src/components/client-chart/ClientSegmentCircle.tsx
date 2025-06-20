
import React from 'react';
import { ClientSegment } from '@/types/client';

interface ClientSegmentCircleProps {
  segments: ClientSegment[];
  totalClients: number;
  hoveredSegment: string | null;
  onSegmentHover: (segmentName: string | null) => void;
  onSegmentClick: (segment: ClientSegment) => void;
}

const ClientSegmentCircle: React.FC<ClientSegmentCircleProps> = ({
  segments,
  totalClients,
  hoveredSegment,
  onSegmentHover,
  onSegmentClick
}) => {
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
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '224px'
    }}>
      <svg width="220" height="220" style={{ position: 'absolute' }}>
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
                style={{
                  opacity: opacity,
                  filter: hoveredSegment === segment.name ? 'brightness(1.2) drop-shadow(0 0 6px rgba(0,0,0,0.3))' : 'none',
                  strokeWidth: hoveredSegment === segment.name ? strokeWidth + 2 : strokeWidth,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => onSegmentHover(segment.name)}
                onMouseLeave={() => onSegmentHover(null)}
                onClick={() => onSegmentClick(segment)}
              />
            </g>
          );
        })}
      </svg>

      <div style={{
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        border: '2px solid #e2e8f0'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#1f2937'
          }}>{segments.length}</div>
          <div style={{
            fontSize: '12px',
            color: '#6b7280'
          }}>seg.</div>
        </div>
      </div>
    </div>
  );
};

export default ClientSegmentCircle;
