
import React, { useState } from 'react';
import { ClientSegment } from '@/types/client';
import { segments } from '@/data/clientSegments';
import ClientSegmentCircle from './client-chart/ClientSegmentCircle';
import ClientSegmentGrid from './client-chart/ClientSegmentGrid';
import ClientListDialog from './client-chart/ClientListDialog';

const ClientSegmentChart = () => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<ClientSegment | null>(null);
  const [showClientList, setShowClientList] = useState(false);

  const totalClients = segments.reduce((sum, segment) => sum + segment.count, 0);

  const handleSegmentClick = (segment: ClientSegment) => {
    setSelectedSegment(segment);
    setShowClientList(true);
  };

  return (
    <>
      <div className="w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 shadow-lg border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Client Segmentation</h3>
          <div className="text-sm text-slate-600">
            Total: {totalClients.toLocaleString('en-US')} clients
          </div>
        </div>
        
        <ClientSegmentCircle
          segments={segments}
          totalClients={totalClients}
          hoveredSegment={hoveredSegment}
          onSegmentHover={setHoveredSegment}
          onSegmentClick={handleSegmentClick}
        />

        <ClientSegmentGrid
          segments={segments}
          totalClients={totalClients}
          hoveredSegment={hoveredSegment}
          onSegmentHover={setHoveredSegment}
          onSegmentClick={handleSegmentClick}
        />

        <div className="mt-4 text-center">
          <div className="text-xs text-slate-600">
            <span className="text-blue-600 font-medium">Click segment to view client list</span>
          </div>
        </div>
      </div>

      <ClientListDialog
        open={showClientList}
        onOpenChange={setShowClientList}
        selectedSegment={selectedSegment}
      />
    </>
  );
};

export default ClientSegmentChart;
