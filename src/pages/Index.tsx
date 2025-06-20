
import ClientSegmentChart from "@/components/ClientSegmentChart";
import RevenueSegmentChart from "@/components/RevenueSegmentChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Target, Percent } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-[660px] mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Klientów</h1>
        
        {/* Główny wykres segmentacji */}
        <div className="mb-6">
          <ClientSegmentChart />
        </div>

        {/* Metryki */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Konwersje</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.7%</div>
              <p className="text-xs text-muted-foreground">
                +1.2% vs poprzedni miesiąc
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nowi Klienci</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                +8.2% vs poprzedni miesiąc
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Współczynnik Retencji</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.5%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% vs poprzedni miesiąc
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Średnia Wartość</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">52,400 PLN</div>
              <p className="text-xs text-muted-foreground">
                +5.7% vs poprzedni miesiąc
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Wykres segmentacji przychodów */}
        <div className="grid grid-cols-1 gap-6">
          <RevenueSegmentChart />
        </div>
      </div>
    </div>
  );
};

export default Index;
