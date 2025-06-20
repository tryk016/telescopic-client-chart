
import React, { useState } from 'react';
import { Users, TrendingUp, AlertTriangle, UserCheck, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

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

  // Generate sample client data
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
        name: `Client ${segment.name} ${i}`,
        email: `client${i}@${segment.name.toLowerCase()}.com`,
        revenue: baseRevenue[segment.name as keyof typeof baseRevenue] + Math.random() * 10000
      });
    }
    return clients;
  };

  const downloadClientList = (segment: ClientSegment) => {
    const clients = generateClientsForSegment(segment);
    const csvContent = [
      ['Name', 'Email', 'Revenue (PLN)'],
      ...clients.map(client => [
        client.name,
        client.email,
        client.revenue.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${segment.name}_clients.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClientClick = (client: Client) => {
    // Open a sample link in new tab - replace with actual client profile URL
    const clientUrl = `https://example.com/client/${client.id}`;
    window.open(clientUrl, '_blank');
  };

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
        
        <div className="relative flex items-center justify-center h-56">
          {/* Concentric circles - telescopic layout */}
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
                  {/* Ring background */}
                  <circle
                    cx="110"
                    cy="110"
                    r={radius}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth={strokeWidth}
                    opacity="0.3"
                  />
                  
                  {/* Active segment */}
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
                    onMouseEnter={() => setHoveredSegment(segment.name)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    onClick={() => handleSegmentClick(segment)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Central point with information */}
          <div className="absolute bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-slate-200">
            <div className="text-center">
              <div className="text-xs font-bold text-slate-800">{segments.length}</div>
              <div className="text-xs text-slate-500">seg.</div>
            </div>
          </div>
        </div>

        {/* Ordered segment list */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {segments.map((segment) => (
            <div
              key={segment.name}
              className={`bg-white rounded-lg shadow-sm p-3 border-2 cursor-pointer transition-all duration-300 ${
                hoveredSegment === segment.name ? 'border-slate-400 shadow-md transform scale-105' : 'border-slate-200'
              }`}
              style={{ borderLeftColor: segment.color, borderLeftWidth: '4px' }}
              onMouseEnter={() => setHoveredSegment(segment.name)}
              onMouseLeave={() => setHoveredSegment(null)}
              onClick={() => handleSegmentClick(segment)}
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

        {/* Interaction information */}
        <div className="mt-4 text-center">
          <div className="text-xs text-slate-600">
            <span className="text-blue-600 font-medium">Click segment to view client list</span>
          </div>
        </div>
      </div>

      {/* Dialog with client list */}
      <Dialog open={showClientList} onOpenChange={setShowClientList}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                {selectedSegment && (
                  <>
                    <div style={{ color: selectedSegment.color }}>
                      {selectedSegment.icon}
                    </div>
                    Clients - {selectedSegment.name}
                    <span className="text-sm font-normal text-gray-500">
                      ({selectedSegment.count.toLocaleString('en-US')} clients)
                    </span>
                  </>
                )}
              </div>
              {selectedSegment && (
                <Button
                  onClick={() => downloadClientList(selectedSegment)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download CSV
                </Button>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[60vh]">
            {selectedSegment && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Revenue (PLN)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generateClientsForSegment(selectedSegment).map((client) => (
                    <TableRow 
                      key={client.id} 
                      className="cursor-pointer hover:bg-slate-50"
                      onClick={() => handleClientClick(client)}
                    >
                      <TableCell className="font-medium text-blue-600 hover:text-blue-800">
                        {client.name}
                      </TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell className="text-right">
                        {client.revenue.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'PLN'
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                  {selectedSegment.count > 20 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-gray-500 italic">
                        ... and {(selectedSegment.count - 20).toLocaleString('en-US')} more clients
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
