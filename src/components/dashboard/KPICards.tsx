import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStats {
  totalCustomers: number;
  qualifiedLeads: number;
  consultationsBooked: number;
  pendingFollowups: number;
}

interface KPICardsProps {
  stats: DashboardStats;
  loading: boolean;
}

const KPICard = ({
  title,
  value,
  subtitle,
  gradientColors,
  loading,
}: {
  title: string;
  value: number;
  subtitle: string;
  gradientColors: string;
  loading: boolean;
}) => {
  return (
    <Card className={`relative overflow-hidden border-0 ${gradientColors}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      <CardHeader className="relative pb-2">
        <CardTitle className="text-sm font-medium text-white/90">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-16 bg-white/20" />
            <Skeleton className="h-4 w-24 bg-white/20" />
          </div>
        ) : (
          <>
            <div className="text-3xl font-bold text-white mb-1">
              {value.toLocaleString()}
            </div>
            <p className="text-sm text-white/70">{subtitle}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const KPICards = ({ stats, loading }: KPICardsProps) => {
  const conversionRate = stats.totalCustomers > 0 
    ? ((stats.qualifiedLeads / stats.totalCustomers) * 100).toFixed(1)
    : "0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard
        title="Total Customers"
        value={stats.totalCustomers}
        subtitle="Active conversations"
        gradientColors="bg-gradient-to-br from-blue-600 to-blue-800"
        loading={loading}
      />
      
      <KPICard
        title="Qualified Leads"
        value={stats.qualifiedLeads}
        subtitle={`${conversionRate}% conversion rate`}
        gradientColors="bg-gradient-to-br from-green-600 to-green-800"
        loading={loading}
      />
      
      <KPICard
        title="Consultations Booked"
        value={stats.consultationsBooked}
        subtitle="Ready for consultation"
        gradientColors="bg-gradient-to-br from-orange-600 to-orange-800"
        loading={loading}
      />
      
      <KPICard
        title="Pending Follow-ups"
        value={stats.pendingFollowups}
        subtitle="Awaiting response"
        gradientColors="bg-gradient-to-br from-purple-600 to-purple-800"
        loading={loading}
      />
    </div>
  );
};