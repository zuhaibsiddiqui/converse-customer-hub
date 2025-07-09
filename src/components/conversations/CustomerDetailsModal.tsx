import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Customer } from "@/pages/Conversations";
import { CalendarDays, MapPin, DollarSign, Clock, User, Mail, Phone, Building, Palette } from "lucide-react";

interface CustomerDetailsModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerDetailsModal = ({ customer, isOpen, onClose }: CustomerDetailsModalProps) => {
  if (!customer) return null;

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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString("en-IE", {
      day: "2-digit",
      month: "short", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
              {customer.name?.charAt(0) || customer.phone_number.slice(-2)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {customer.name || `Customer ${customer.phone_number.slice(-4)}`}
              </h2>
              <p className="text-sm text-muted-foreground">{customer.phone_number}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Current Stage */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Current Stage:</span>
            <Badge className={`${getStageColor(customer.current_stage)}`}>
              {customer.current_stage.replace(/_/g, " ")}
            </Badge>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Contact Information</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{customer.phone_number}</span>
              </div>
              {customer.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{customer.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Building className="w-5 h-5" />
              <span>Project Details</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
              {customer.project_type && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Project Type:</span>
                  <p className="text-sm">{customer.project_type}</p>
                </div>
              )}
              {customer.budget_range && (
                <div className="flex items-start space-x-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Budget:</span>
                    <p className="text-sm">{customer.budget_range}</p>
                  </div>
                </div>
              )}
              {customer.timeline && (
                <div className="flex items-start space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Timeline:</span>
                    <p className="text-sm">{customer.timeline}</p>
                  </div>
                </div>
              )}
              {customer.location && (
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Location:</span>
                    <p className="text-sm">{customer.location}</p>
                  </div>
                </div>
              )}
              {customer.project_stage && (
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Project Stage:</span>
                  <p className="text-sm">{customer.project_stage}</p>
                </div>
              )}
              {customer.design_preference && (
                <div className="flex items-start space-x-2">
                  <Palette className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Design Preference:</span>
                    <p className="text-sm">{customer.design_preference}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Activity Information */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <CalendarDays className="w-5 h-5" />
              <span>Activity</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Last Message:</span>
                <p className="text-sm">{formatDate(customer.last_message_time)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Messages Sent:</span>
                <p className="text-sm">{customer.total_messages_sent || 0}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Responses:</span>
                <p className="text-sm">{customer.response_count || 0}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Conversation Active:</span>
                <p className="text-sm">{customer.conversation_active ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>

          {/* Status Flags */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Status</h3>
            <div className="flex flex-wrap gap-2">
              {customer.is_qualified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Qualified
                </Badge>
              )}
              {customer.is_interested && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Interested
                </Badge>
              )}
              {customer.follow_up_enabled && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Follow-up Enabled
                </Badge>
              )}
              {customer.appointment_booked && (
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                  Appointment Booked
                </Badge>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};