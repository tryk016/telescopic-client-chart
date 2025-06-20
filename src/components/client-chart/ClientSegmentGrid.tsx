
import React from 'react';
import { ClientSegment } from '@/types/client';

interface ClientSegmentGridProps {
  segments: ClientSegment[];
  totalClients: number;
  hoveredSegment: string | null;
  onSegmentHover: (segmentName: string | null) => void;
  onSegmentClick: (segment: ClientSegment) => void;
}

const ClientSegmentGrid = ({
  segments,
  totalClients,
  hoveredSegment,
  onSegmentHover,
  onSegmentClick
}: ClientSegmentGridProps) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {segments.map((segment) => (
        <div
          key={segment.name}
          className={`bg-white rounded-lg shadow-sm p-3 border-2 cursor-pointer transition-all duration-300 ${
            hoveredSegment === segment.name ? 'border-slate-400 shadow-md transform scale-105' : 'border-slate-200'
          }`}
          style={{ borderLeftColor: segment.color, borderLeftWidth: '4px' }}
          onMouseEnter={() => onSegmentHover(segment.name)}
          onMouseLeave={() => onSegmentHover(null)}
          onClick={() => onSegmentClick(segment)}
        >
          <div className="flex items-center gap-2 mb-1">
            <div style={{ color: segment.color }}>{segment.icon}</div>
            <div className="text-sm font-medium text-slate-700">{segment.name}</div>
          </div>
          <div className="text-lg font-bold text-slate-800">
            {segment.count.toLocaleString('en-US')}
          </div>
          <div className="text-xs text-slate-500">
            {((segment.count / totalClients) * 100).toFixed(1)}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientSegmentGrid;
