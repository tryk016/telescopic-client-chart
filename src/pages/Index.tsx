
import ClientSegmentChart from "@/components/ClientSegmentChart";
import RevenueSegmentChart from "@/components/RevenueSegmentChart";

const Index = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '16px'
    }}>
      <div style={{
        maxWidth: '660px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '24px'
        }}>Client Dashboard</h1>
        
        {/* Main segmentation chart */}
        <div style={{ marginBottom: '24px' }}>
          <ClientSegmentChart />
        </div>

        {/* Revenue segmentation chart */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px'
        }}>
          <RevenueSegmentChart />
        </div>
      </div>
    </div>
  );
};

export default Index;
