import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Customer, Message } from "@/pages/Conversations";

interface ChatPanelProps {
  customer: Customer | null;
  messages: Message[];
  loading: boolean;
  onSendMessage: (message: string) => void;
}

export const ChatPanel = ({ customer, messages, loading, onSendMessage }: ChatPanelProps) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-IE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-IE", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && customer) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const MessageBubble = ({ message }: { message: Message }) => {
    const isBot = message.sender === "bot";
    
    return (
      <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isBot 
            ? "bg-muted text-foreground rounded-bl-none" 
            : "bg-primary text-primary-foreground rounded-br-none"
        }`}>
          <p className="text-sm">{message.message_text}</p>
          <p className={`text-xs mt-1 ${
            isBot ? "text-muted-foreground" : "text-primary-foreground/70"
          }`}>
            {formatTime(message.sent_time)}
          </p>
        </div>
      </div>
    );
  };

  if (!customer) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <svg
              className="w-12 h-12 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            Select a conversation
          </h3>
          <p className="text-muted-foreground">
            Choose a customer from the list to view their messages
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
            {customer.name?.charAt(0) || customer.phone_number.slice(-2)}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">
              {customer.name || `Customer ${customer.phone_number.slice(-4)}`}
            </h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">{customer.phone_number}</p>
              <Badge variant="secondary" className="text-xs">
                {customer.current_stage.replace(/_/g, " ")}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-background">
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                <Skeleton className={`h-16 ${i % 2 === 0 ? "w-48" : "w-40"} rounded-lg`} />
              </div>
            ))}
          </div>
        ) : messages.length > 0 ? (
          <>
            {messages.map((message, index) => {
              const showDate = index === 0 || 
                formatDate(message.sent_time) !== formatDate(messages[index - 1].sent_time);
              
              return (
                <div key={message.id}>
                  {showDate && (
                    <div className="flex justify-center mb-4">
                      <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {formatDate(message.sent_time)}
                      </span>
                    </div>
                  )}
                  <MessageBubble message={message} />
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">No messages yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start a conversation with {customer.name || "this customer"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <Input
                placeholder={`Message ${customer.name || "customer"}...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                size="icon"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </Button>
            </div>
             <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send • Shift + Enter for new line
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
