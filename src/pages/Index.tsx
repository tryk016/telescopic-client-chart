
import ClientSegmentChart from "@/components/ClientSegmentChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard Klientów</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ClientSegmentChart />
          
          {/* Placeholder dla dodatkowych komponentów */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 flex items-center justify-center">
            <div className="text-center text-slate-500">
              <div className="text-lg font-medium mb-2">Miejsce na kolejne wykresy</div>
              <div className="text-sm">Dodatkowe komponenty dashboard'u</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
