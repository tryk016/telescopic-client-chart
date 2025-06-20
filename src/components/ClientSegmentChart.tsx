
import React, { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, UserCheck, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ClientSegment {
  name: string;
  count: number;
  color: string;
  icon: React.ReactNode;
  priority: number;
}

interface Client {
  id: string;
  name: string;
  email: string;
  revenue: number;
}

const ClientSegmentChart = () => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<ClientSegment | null>(null);
  const [showClientList, setShowClientList] = useState(false);

  const segments: ClientSegment[] = [
    { name: 'Inactive', count: 43534, color: '#6B7280', icon: <Users className="w-4 h-4" />, priority: 6 },
    { name: 'At Risk', count: 3036, color: '#EF4444', icon: <AlertTriangle className="w-4 h-4" />, priority: 5 },
    { name: 'To Develop', count: 1416, color: '#4F46E5', icon: <TrendingUp className="w-4 h-4" />, priority: 4 },
    { name: 'Strong', count: 32, color: '#CD7F32', icon: <Users className="w-4 h-4" />, priority: 3 },
    { name: 'VIP', count: 29, color: '#C0C0C0', icon: <TrendingUp className="w-4 h-4" />, priority: 2 },
    { name: 'Platinum', count: 5, color: '#FFD700', icon: <UserCheck className="w-4 h-4" />, priority: 1 }
  ];

  const totalClients = segments.reduce((sum, segment) => sum + segment.count, 0);

  // Generowanie przykładowych danych klientów
  const generateClientsForSegment = (segment: ClientSegment): Client[] => {
    const clients: Client[] = [];
    const baseRevenue = {
      'Platinum': 100000,
      'VIP': 50000,
      'Strong': 25000,
      'To Develop': 10000,
      'At Risk': 5000,
      'Inactive': 1000
    };

    for (let i = 1; i <= Math.min(segment.count, 20); i++) {
      clients.push({
        id: `${segment.name.toLowerCase()}-${i}`,
        name: `Klient ${segment.name} ${i}`,
        email: `klient${i}@${segment.name.toLowerCase()}.com`,
        revenue: baseRevenue[segment.name as keyof typeof baseRevenue] + Math.random() * 10000
      });
    }
    return clients;
  };

  const getSegmentRadius = (priority: number) => {
    const baseRadius = 40;
    const maxRadius = 180;
    return baseRadius + (priority - 1) * ((maxRadius - baseRadius) / 5);
  };

  const getSegmentWidth = (priority: number) => {
    if (priority >= 4) return 25; // Szersze pierścienie dla top segmentów (teraz to są wewnętrzne)
    return 20;
  };

  const getOpacity = (priority: number) => {
    // Zewnętrzne okręgi (wyższy priorytet) mają mniejszą przezroczystość
    return 1 - (priority - 1) * 0.15;
  };

  const handleSegmentClick = (segment: ClientSegment) => {
    setSelectedSegment(segment);
    setShowClientList(true);
  };

  return (
    <>
      <div className="w-full h-96 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 shadow-lg border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-800">Segmentacja Klientów</h3>
          <div className="text-sm text-slate-600">
            Łącznie: {totalClients.toLocaleString('pl-PL')} klientów
          </div>
        </div>
        
        <div className="relative flex items-center justify-center h-80">
          {/* Koncentryczne kręgi - układ teleskopowy z odwróconą kolejnością */}
          <svg width="360" height="360" className="absolute">
            {segments.map((segment, index) => {
              const radius = getSegmentRadius(segment.priority);
              const strokeWidth = getSegmentWidth(segment.priority);
              const circumference = 2 * Math.PI * radius;
              const percentage = (segment.count / totalClients) * 100;
              const opacity = getOpacity(segment.priority);
              
              // Dla lepszej widoczności, minimalna długość łuku dla małych segmentów
              const minArcLength = 0.1;
              const arcLength = Math.max(percentage / 100, minArcLength);
              const dashArray = `${circumference * arcLength} ${circumference}`;
              
              return (
                <g key={segment.name}>
                  {/* Tło pierścienia */}
                  <circle
                    cx="180"
                    cy="180"
                    r={radius}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth={strokeWidth}
                    opacity="0.3"
                  />
                  
                  {/* Aktywny segment */}
                  <circle
                    cx="180"
                    cy="180"
                    r={radius}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={dashArray}
                    strokeLinecap="round"
                    transform={`rotate(${index * 60 - 90} 180 180)`}
                    className="transition-all duration-300 cursor-pointer"
                    style={{
                      opacity: opacity,
                      filter: hoveredSegment === segment.name ? 'brightness(1.2) drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none',
                      strokeWidth: hoveredSegment === segment.name ? strokeWidth + 3 : strokeWidth
                    }}
                    onMouseEnter={() => setHoveredSegment(segment.name)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    onClick={() => handleSegmentClick(segment)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Centralny punkt z informacją */}
          <div className="absolute bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg border-2 border-slate-200">
            <div className="text-center">
              <div className="text-xs font-medium text-slate-600">Klienci</div>
              <div className="text-lg font-bold text-slate-800">{segments.length}</div>
              <div className="text-xs text-slate-500">segmentów</div>
            </div>
          </div>

          {/* Interaktywne etykiety */}
          {segments.map((segment, index) => {
            const angle = (index * 60) * (Math.PI / 180);
            const labelRadius = getSegmentRadius(segment.priority) + 40;
            const x = 180 + labelRadius * Math.cos(angle - Math.PI / 2);
            const y = 180 + labelRadius * Math.sin(angle - Math.PI / 2);
            
            return (
              <div
                key={`label-${segment.name}`}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  hoveredSegment === segment.name ? 'scale-110 z-10' : 'z-0'
                }`}
                style={{ 
                  left: x, 
                  top: y,
                  opacity: getOpacity(segment.priority)
                }}
                onMouseEnter={() => setHoveredSegment(segment.name)}
                onMouseLeave={() => setHoveredSegment(null)}
                onClick={() => handleSegmentClick(segment)}
              >
                <div className={`bg-white rounded-lg shadow-md p-2 border-2 cursor-pointer min-w-20 ${
                  hoveredSegment === segment.name ? 'border-slate-400 shadow-lg' : 'border-slate-200'
                }`} style={{ borderLeftColor: segment.color, borderLeftWidth: '4px' }}>
                  <div className="flex items-center gap-1 mb-1">
                    <div style={{ color: segment.color }}>{segment.icon}</div>
                    <div className="text-xs font-medium text-slate-700">{segment.name}</div>
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    {segment.count.toLocaleString('pl-PL')}
                  </div>
                  <div className="text-xs text-slate-500">
                    {((segment.count / totalClients) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legenda priorytetów */}
        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
              <span>Najwyższy priorytet (centrum)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-600"></div>
              <span>Najniższy priorytet (zewnątrz)</span>
            </div>
            <div className="text-blue-600 font-medium">Kliknij segment aby zobaczyć listę klientów</div>
          </div>
        </div>
      </div>

      {/* Dialog z listą klientów */}
      <Dialog open={showClientList} onOpenChange={setShowClientList}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedSegment && (
                <>
                  <div style={{ color: selectedSegment.color }}>
                    {selectedSegment.icon}
                  </div>
                  Klienci - {selectedSegment.name}
                  <span className="text-sm font-normal text-gray-500">
                    ({selectedSegment.count.toLocaleString('pl-PL')} klientów)
                  </span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[60vh]">
            {selectedSegment && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nazwa</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Przychód (PLN)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generateClientsForSegment(selectedSegment).map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell className="text-right">
                        {client.revenue.toLocaleString('pl-PL', {
                          style: 'currency',
                          currency: 'PLN'
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                  {selectedSegment.count > 20 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-gray-500 italic">
                        ... i {(selectedSegment.count - 20).toLocaleString('pl-PL')} więcej klientów
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClientSegmentChart;
