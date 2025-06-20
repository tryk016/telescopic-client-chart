
import React from 'react';
import { Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ClientSegment, Client } from '@/types/client';

interface ClientListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSegment: ClientSegment | null;
}

const ClientListDialog: React.FC<ClientListDialogProps> = ({
  open,
  onOpenChange,
  selectedSegment
}) => {
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
    const clientUrl = `https://example.com/client/${client.id}`;
    window.open(clientUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
  );
};

export default ClientListDialog;
