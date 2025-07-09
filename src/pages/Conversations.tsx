import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { supabase } from "@/integrations/supabase/client";
import { ConversationsList } from "@/components/conversations/ConversationsList";
import { ChatPanel } from "@/components/conversations/ChatPanel";
import { CustomerDetailsModal } from "@/components/conversations/CustomerDetailsModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowLeft, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";



export interface Customer {
  phone_number: string;
  name: string | null;
  current_stage: string;
  last_message_time: string | null;
  unread_count?: number;
  email?: string | null;
  project_type?: string | null;
  budget_range?: string | null;
  timeline?: string | null;
  location?: string | null;
  project_stage?: string | null;
  design_preference?: string | null;
  total_messages_sent?: number | null;
  response_count?: number | null;
  conversation_active?: boolean | null;
  is_qualified?: boolean | null;
  is_interested?: boolean | null;
  follow_up_enabled?: boolean | null;
  appointment_booked?: boolean | null;
}

export interface Message {
  id: string;
  sender: "bot" | "customer";
  message_text: string;
  sent_time: string;
}

const Conversations = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  const fetchCustomers = async () => {
    try {
      const { data: customerData } = await supabase
        .from("customer_leads")
        .select(`
          phone_number, 
          name, 
          current_stage, 
          last_message_time,
          email,
          project_type,
          budget_range,
          timeline,
          location,
          project_stage,
          design_preference,
          total_messages_sent,
          response_count,
          conversation_active,
          is_qualified,
          is_interested,
          follow_up_enabled,
          appointment_booked
        `)
        .order("last_message_time", { ascending: false });

      if (customerData) {
        setCustomers(customerData);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (customerPhone: string) => {
    setMessagesLoading(true);
    try {
      const { data: messageData } = await supabase
        .from("n8n_chat_histories")
        .select("*")
        .eq("session_id", customerPhone)
        .order("id", { ascending: true });

      if (messageData) {
        const formattedMessages: Message[] = messageData.map((msg) => {
          const message = msg.message as any; // Type assertion for JSON structure
          return {
            id: msg.id.toString(),
            sender: message?.type === "human" ? "customer" : "bot",
            message_text: message?.content || "",
            sent_time: new Date().toISOString(), // n8n_chat_histories doesn't have timestamp
          };
        });
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    fetchMessages(customer.phone_number);
  };

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await fetchCustomers();
    if (selectedCustomer) {
      await fetchMessages(selectedCustomer.phone_number);
    }
    setLastRefresh(new Date());
    setRefreshing(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  useEffect(() => {
    fetchCustomers();

    // Set up auto-refresh every 2 minutes
    const interval = setInterval(() => {
      fetchCustomers();
      if (selectedCustomer) {
        fetchMessages(selectedCustomer.phone_number);
      }
      setLastRefresh(new Date());
    }, 2 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedCustomer]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center space-x-3">
              {/* Back Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">Conversations</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">WhatsApp Business Messages</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              {/* Last Refresh Time */}
              <div className="text-xs sm:text-sm text-muted-foreground">
                Last refresh: {formatTime(lastRefresh)}
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* View Details Button */}
                {selectedCustomer && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCustomerDetails(true)}
                    className="flex items-center space-x-2"
                  >
                    <Info className="h-4 w-4" />
                    <span className="hidden sm:inline">View Details</span>
                  </Button>
                )}

                {/* Manual Refresh Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleManualRefresh}
                  disabled={refreshing}
                  className="flex items-center space-x-2"
                >
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>

                {/* Live Status */}
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-muted-foreground">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <Card className="h-[calc(100vh-140px)] sm:h-[calc(100vh-200px)] overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-border h-1/2 md:h-full">
              <ConversationsList
                customers={customers}
                selectedCustomer={selectedCustomer}
                onCustomerSelect={handleCustomerSelect}
                loading={loading}
              />
            </div>

            {/* Chat Panel */}
            <div className="flex-1 h-1/2 md:h-full">
              <ChatPanel
                customer={selectedCustomer}
                messages={messages}
                loading={messagesLoading}
                onSendMessage={(message) => {
                  // Handle sending message (placeholder)
                  console.log("Send message:", message);
                }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        customer={selectedCustomer}
        isOpen={showCustomerDetails}
        onClose={() => setShowCustomerDetails(false)}
      />
    </div>
  );
};

export default Conversations;
