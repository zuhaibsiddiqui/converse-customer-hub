import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Conversation {
  id: string;
  customer_phone: string;
  customer_name?: string;
  last_message: string;
  time_ago: string;
  current_stage: string;
}

interface FollowUp {
  id: string;
  customer_phone: string;
  customer_name?: string;
  follow_up_type: string;
  scheduled_time: string;
  time_remaining: string;
  status: "pending" | "overdue";
}

export const LiveDataPanels = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [loading, setLoading] = useState(true);

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getTimeRemaining = (scheduledTime: string) => {
    const scheduled = new Date(scheduledTime);
    const now = new Date();
    const diffInMinutes = Math.floor((scheduled.getTime() - now.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 0) return "Overdue";
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    return `${Math.floor(diffInMinutes / 1440)}d`;
  };

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      initial_contact: "bg-blue-100 text-blue-800",
      project_type: "bg-green-100 text-green-800", 
      budget: "bg-yellow-100 text-yellow-800",
      timeline: "bg-red-100 text-red-800",
      location: "bg-purple-100 text-purple-800",
      qualified: "bg-emerald-100 text-emerald-800",
    };
    return colors[stage] || "bg-gray-100 text-gray-800";
  };

  const fetchLiveData = async () => {
    try {
      // Fetch recent conversations (simulated from customer_leads)
      const { data: customerData } = await supabase
        .from("customer_leads")
        .select("phone_number, name, current_stage, last_message_time")
        .order("last_message_time", { ascending: false })
        .limit(10);

      if (customerData) {
        const formattedConversations = customerData.map((customer, index) => ({
          id: customer.phone_number,
          customer_phone: customer.phone_number,
          customer_name: customer.name || `Customer ${customer.phone_number.slice(-4)}`,
          last_message: "Thank you for the information. I'll get back to you soon.",
          time_ago: getTimeAgo(new Date(customer.last_message_time || Date.now() - index * 300000)),
          current_stage: customer.current_stage || "initial_contact",
        }));
        setConversations(formattedConversations);
      }

      // Fetch pending follow-ups
      const { data: followUpData } = await supabase
        .from("follow_ups")
        .select(`
          id,
          customer_phone,
          customer_name,
          follow_up_type,
          scheduled_time
        `)
        .eq("is_sent", false)
        .eq("is_active", true)
        .order("scheduled_time", { ascending: true })
        .limit(10);

      if (followUpData) {
        const formattedFollowUps = followUpData.map((followUp) => {
          const timeRemaining = getTimeRemaining(followUp.scheduled_time);
          return {
            id: followUp.id,
            customer_phone: followUp.customer_phone,
            customer_name: followUp.customer_name || `Customer ${followUp.customer_phone.slice(-4)}`,
            follow_up_type: followUp.follow_up_type,
            scheduled_time: followUp.scheduled_time,
            time_remaining: timeRemaining,
            status: timeRemaining === "Overdue" ? "overdue" as const : "pending" as const,
          };
        });
        setFollowUps(formattedFollowUps);
      }
    } catch (error) {
      console.error("Error fetching live data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();

    // Set up auto-refresh every 2 minutes
    const interval = setInterval(fetchLiveData, 2 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const ConversationItem = ({ conversation }: { conversation: Conversation }) => (
    <div className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
        {conversation.customer_name?.charAt(0) || "?"}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground truncate">
            {conversation.customer_name}
          </p>
          <span className="text-xs text-muted-foreground">{conversation.time_ago}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{conversation.last_message}</p>
        <div className="flex items-center space-x-2 mt-1">
          <Badge variant="secondary" className={`text-xs ${getStageColor(conversation.current_stage)}`}>
            {conversation.current_stage.replace(/_/g, " ")}
          </Badge>
        </div>
      </div>
    </div>
  );

  const FollowUpItem = ({ followUp }: { followUp: FollowUp }) => (
    <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center text-white font-semibold text-xs">
          {followUp.customer_name?.charAt(0) || "?"}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{followUp.customer_name}</p>
          <p className="text-xs text-muted-foreground">{followUp.customer_phone}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center space-x-2">
          <Badge 
            variant={followUp.status === "overdue" ? "destructive" : "secondary"}
            className="text-xs"
          >
            {followUp.follow_up_type}
          </Badge>
          <span className={`text-xs font-medium ${
            followUp.status === "overdue" ? "text-red-600" : "text-muted-foreground"
          }`}>
            {followUp.time_remaining}
          </span>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="h-6 w-48 bg-muted animate-pulse rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted animate-pulse rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
                    <div className="h-3 w-48 bg-muted animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="h-6 w-48 bg-muted animate-pulse rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted animate-pulse rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                      <div className="h-3 w-32 bg-muted animate-pulse rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-16 bg-muted animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Conversations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Conversations
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                {conversations.length} active
              </Badge>
              <Link to="/conversations">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            {conversations.length > 0 ? (
              conversations.map((conversation) => (
                <Link 
                  key={conversation.id} 
                  to="/conversations" 
                  className="block hover:no-underline"
                >
                  <ConversationItem conversation={conversation} />
                </Link>
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No recent conversations
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Follow-up Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Upcoming Follow-ups
            <Badge variant="secondary" className="text-xs">
              {followUps.length} pending
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            {followUps.length > 0 ? (
              followUps.map((followUp) => (
                <FollowUpItem key={followUp.id} followUp={followUp} />
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No pending follow-ups
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};