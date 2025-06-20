
import ClientSegmentChart from "@/components/ClientSegmentChart";
import RevenueSegmentChart from "@/components/RevenueSegmentChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Target, Percent } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-[660px] mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Client Dashboard</h1>
        
        {/* Main segmentation chart */}
        <div className="mb-6">
          <ClientSegmentChart />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversions</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.7%</div>
              <p className="text-xs text-muted-foreground">
                +1.2% vs previous month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                +8.2% vs previous month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retention Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.5%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% vs previous month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">52,400 PLN</div>
              <p className="text-xs text-muted-foreground">
                +5.7% vs previous month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue segmentation chart */}
        <div className="grid grid-cols-1 gap-6">
          <RevenueSegmentChart />
        </div>
      </div>
    </div>
  );
};

export default Index;
