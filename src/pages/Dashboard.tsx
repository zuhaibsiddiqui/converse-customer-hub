import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICards } from "@/components/dashboard/KPICards";
import { ChartSection } from "@/components/dashboard/ChartSection";
import { LiveDataPanels } from "@/components/dashboard/LiveDataPanels";

interface DashboardStats {
  totalCustomers: number;
  qualifiedLeads: number;
  consultationsBooked: number;
  pendingFollowups: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalCustomers: 0,
    qualifiedLeads: 0,
    consultationsBooked: 0,
    pendingFollowups: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try {
      // Fetch total customers
      const { count: totalCustomers } = await supabase
        .from("customer_leads")
        .select("*", { count: "exact", head: true });

      // Fetch qualified leads
      const { count: qualifiedLeads } = await supabase
        .from("customer_leads")
        .select("*", { count: "exact", head: true })
        .eq("is_qualified", true);

      // Fetch consultations booked
      const { count: consultationsBooked } = await supabase
        .from("customer_leads")
        .select("*", { count: "exact", head: true })
        .eq("current_stage", "qualified");

      // Fetch pending follow-ups
      const { count: pendingFollowups } = await supabase
        .from("follow_ups")
        .select("*", { count: "exact", head: true })
        .eq("is_sent", false)
        .eq("is_active", true);

      setStats({
        totalCustomers: totalCustomers || 0,
        qualifiedLeads: qualifiedLeads || 0,
        consultationsBooked: consultationsBooked || 0,
        pendingFollowups: pendingFollowups || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();

    // Set up auto-refresh every 2 minutes
    const interval = setInterval(fetchDashboardStats, 2 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* KPI Cards */}
        <KPICards stats={stats} loading={loading} />
        
        {/* Charts Section */}
        <ChartSection />
        
        {/* Live Data Panels */}
        <LiveDataPanels />
      </main>
    </div>
  );
};

export default Dashboard;