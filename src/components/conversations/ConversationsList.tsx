import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { useState } from "react";
import { Customer } from "@/pages/Conversations";

interface ConversationsListProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onCustomerSelect: (customer: Customer) => void;
  loading: boolean;
}

export const ConversationsList = ({
  customers,
  selectedCustomer,
  onCustomerSelect,
  loading,
}: ConversationsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone_number.includes(searchTerm)
  );

  const getTimeAgo = (dateString: string | null) => {
    if (!dateString) return "No messages";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
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

  const CustomerItem = ({ customer }: { customer: Customer }) => (
    <div
      className={`p-4 cursor-pointer transition-colors border-b border-border hover:bg-muted/50 ${
        selectedCustomer?.phone_number === customer.phone_number
          ? "bg-muted border-r-2 border-r-primary"
          : ""
      }`}
      onClick={() => onCustomerSelect(customer)}
    >
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
          {customer.name?.charAt(0) || customer.phone_number.slice(-2)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-foreground truncate">
              {customer.name || `Customer ${customer.phone_number.slice(-4)}`}
            </h3>
            <span className="text-xs text-muted-foreground">
              {getTimeAgo(customer.last_message_time)}
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground mb-2 truncate">
            {customer.phone_number}
          </p>
          
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className={`text-xs ${getStageColor(customer.current_stage)}`}>
              {customer.current_stage.replace(/_/g, " ")}
            </Badge>
            {customer.unread_count && customer.unread_count > 0 && (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {customer.unread_count}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="h-full flex flex-col">
        {/* Search Bar Skeleton */}
        <div className="p-4 border-b border-border">
          <Skeleton className="h-10 w-full" />
        </div>
        
        {/* Customer List Skeleton */}
        <div className="flex-1 overflow-y-auto">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="p-4 border-b border-border">
              <div className="flex items-start space-x-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">
            Messages ({filteredCustomers.length})
          </h2>
        </div>
      </div>

      {/* Customer List */}
      <div className="flex-1 overflow-y-auto">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <CustomerItem key={customer.phone_number} customer={customer} />
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            {searchTerm ? "No conversations found" : "No conversations yet"}
          </div>
        )}
      </div>
    </div>
  );
};