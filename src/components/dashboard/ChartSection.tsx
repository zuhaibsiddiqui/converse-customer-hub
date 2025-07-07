import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";

interface StageDistribution {
  stage: string;
  count: number;
  color: string;
}

interface ActivityTrend {
  date: string;
  customers: number;
  conversations: number;
}

export const ChartSection = () => {
  const [stageData, setStageData] = useState<StageDistribution[]>([]);
  const [activityData, setActivityData] = useState<ActivityTrend[]>([]);
  const [loading, setLoading] = useState(true);

  const stageColors = {
    initial_contact: "#3B82F6",
    project_type: "#10B981", 
    budget: "#F59E0B",
    timeline: "#EF4444",
    location: "#8B5CF6",
    project_stage: "#06B6D4",
    design_preference: "#EC4899",
    contact_details: "#84CC16",
    qualified: "#F97316",
  };

  const fetchChartData = async () => {
    try {
      // Fetch stage distribution
      const { data: stageDistData } = await supabase
        .from("customer_leads")
        .select("current_stage");

      if (stageDistData) {
        const stageCounts = stageDistData.reduce((acc: Record<string, number>, customer) => {
          const stage = customer.current_stage || "unknown";
          acc[stage] = (acc[stage] || 0) + 1;
          return acc;
        }, {});

        const formattedStageData = Object.entries(stageCounts).map(([stage, count]) => ({
          stage: stage.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          count: count as number,
          color: stageColors[stage as keyof typeof stageColors] || "#6B7280",
        }));

        setStageData(formattedStageData);
      }

      // Generate mock activity data for the last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
          date: date.toLocaleDateString("en-IE", { month: "short", day: "numeric" }),
          customers: Math.floor(Math.random() * 10) + 5,
          conversations: Math.floor(Math.random() * 25) + 15,
        };
      });

      setActivityData(last7Days);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const chartConfig = {
    customers: {
      label: "New Customers",
      color: "#3B82F6",
    },
    conversations: {
      label: "Conversations", 
      color: "#10B981",
    },
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="h-6 w-48 bg-muted animate-pulse rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted animate-pulse rounded"></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="h-6 w-48 bg-muted animate-pulse rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted animate-pulse rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Customer Journey Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Journey Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageData}
                  dataKey="count"
                  nameKey="stage"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ stage, count }) => `${stage}: ${count}`}
                >
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Activity Trends */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day Activity Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  name="New Customers"
                />
                <Line
                  type="monotone"
                  dataKey="conversations"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Conversations"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};