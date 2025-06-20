
export interface ClientSegment {
  name: string;
  count: number;
  color: string;
  icon: React.ReactNode;
  priority: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  revenue: number;
}
