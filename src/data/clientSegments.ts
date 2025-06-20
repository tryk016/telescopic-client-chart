
import { Users, TrendingUp, AlertTriangle, UserCheck } from 'lucide-react';
import { ClientSegment } from '@/types/client';

export const segments: ClientSegment[] = [
  { name: 'Inactive', count: 43534, color: '#6B7280', icon: <Users className="w-4 h-4" />, priority: 6 },
  { name: 'At Risk', count: 3036, color: '#EF4444', icon: <AlertTriangle className="w-4 h-4" />, priority: 5 },
  { name: 'To Develop', count: 1416, color: '#4F46E5', icon: <TrendingUp className="w-4 h-4" />, priority: 4 },
  { name: 'Strong', count: 32, color: '#CD7F32', icon: <Users className="w-4 h-4" />, priority: 3 },
  { name: 'VIP', count: 29, color: '#C0C0C0', icon: <TrendingUp className="w-4 h-4" />, priority: 2 },
  { name: 'Platinum', count: 5, color: '#FFD700', icon: <UserCheck className="w-4 h-4" />, priority: 1 }
];
