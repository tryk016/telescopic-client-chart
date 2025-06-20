
import ClientSegmentChart from "@/components/ClientSegmentChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Klientów</h1>
        
        {/* Główny wykres segmentacji */}
        <div className="mb-8">
          <ClientSegmentChart />
        </div>

        {/* Dodatkowe metryki i wykresy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Przychód Miesiąc</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,450,000 PLN</div>
              <p className="text-xs text-muted-foreground">
                +12.5% vs poprzedni miesiąc
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

        {/* Sekcja na dodatkowe wykresy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 flex items-center justify-center min-h-[300px]">
            <div className="text-center text-slate-500">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <div className="text-lg font-medium mb-2">Wykres Trendów Sprzedaży</div>
              <div className="text-sm">Analiza miesięcznych trendów przychodów</div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 flex items-center justify-center min-h-[300px]">
            <div className="text-center text-slate-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <div className="text-lg font-medium mb-2">Analiza Geograficzna</div>
              <div className="text-sm">Rozkład klientów według regionów</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
