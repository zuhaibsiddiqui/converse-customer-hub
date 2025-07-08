import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { supabase } from "@/integrations/supabase/client";
import { ConversationsList } from "@/components/conversations/ConversationsList";
import { ChatPanel } from "@/components/conversations/ChatPanel";
import { Card } from "@/components/ui/card";

export interface Customer {
  phone_number: string;
  name: string | null;
  current_stage: string;
  last_message_time: string | null;
  unread_count?: number;
}

export interface Message {
  id: string;
  sender: "bot" | "customer";
  message_text: string;
  sent_time: string;
}

const Conversations = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const fetchCustomers = async () => {
    try {
      const { data: customerData } = await supabase
        .from("customer_leads")
        .select("phone_number, name, current_stage, last_message_time")
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

  useEffect(() => {
    fetchCustomers();

    // Set up auto-refresh every 2 minutes
    const interval = setInterval(() => {
      fetchCustomers();
      if (selectedCustomer) {
        fetchMessages(selectedCustomer.phone_number);
      }
    }, 2 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedCustomer]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Conversations</h1>
              <p className="text-muted-foreground">WhatsApp Business Messages</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Card className="h-[calc(100vh-200px)] overflow-hidden">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-border">
              <ConversationsList
                customers={customers}
                selectedCustomer={selectedCustomer}
                onCustomerSelect={handleCustomerSelect}
                loading={loading}
              />
            </div>

            {/* Chat Panel */}
            <div className="flex-1">
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
    </div>
  );
};

export default Conversations;
