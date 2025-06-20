import ClientSegmentChart from "@/components/ClientSegmentChart";
import RevenueSegmentChart from "@/components/RevenueSegmentChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Target, Percent } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-[660px] mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Client Dashboard</h1>
        
        {/* Main segmentation chart */}
        <div className="mb-6">
          <ClientSegmentChart />
        </div>

        {/* Metrics */}
        

        {/* Revenue segmentation chart */}
        <div className="grid grid-cols-1 gap-6">
          <RevenueSegmentChart />
        </div>
      </div>
    </div>;
};
export default Index;