
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
      <div style={{
        width: '100%',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937'
          }}>Client Segmentation</h3>
          <div style={{
            fontSize: '14px',
            color: '#4b5563'
          }}>
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

        <div style={{
          marginTop: '16px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '12px',
            color: '#4b5563'
          }}>
            <span style={{
              color: '#2563eb',
              fontWeight: '500'
            }}>Click segment to view client list</span>
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
