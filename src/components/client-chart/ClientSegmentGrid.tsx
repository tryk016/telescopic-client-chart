
import React from 'react';
import { ClientSegment } from '@/types/client';

interface ClientSegmentGridProps {
  segments: ClientSegment[];
  totalClients: number;
  hoveredSegment: string | null;
  onSegmentHover: (segmentName: string | null) => void;
  onSegmentClick: (segment: ClientSegment) => void;
}

const ClientSegmentGrid: React.FC<ClientSegmentGridProps> = ({
  segments,
  totalClients,
  hoveredSegment,
  onSegmentHover,
  onSegmentClick
}) => {
  return (
    <div style={{
      marginTop: '16px',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px'
    }}>
      {segments.map((segment) => (
        <div
          key={segment.name}
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            padding: '12px',
            border: hoveredSegment === segment.name ? '2px solid #64748b' : '2px solid #e2e8f0',
            borderLeftColor: segment.color,
            borderLeftWidth: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: hoveredSegment === segment.name ? 'scale(1.05)' : 'scale(1)',
            boxShadow: hoveredSegment === segment.name ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={() => onSegmentHover(segment.name)}
          onMouseLeave={() => onSegmentHover(null)}
          onClick={() => onSegmentClick(segment)}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '4px'
          }}>
            <div style={{ color: segment.color }}>{segment.icon}</div>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>{segment.name}</div>
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            {segment.count.toLocaleString('en-US')}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#6b7280'
          }}>
            {((segment.count / totalClients) * 100).toFixed(1)}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientSegmentGrid;
