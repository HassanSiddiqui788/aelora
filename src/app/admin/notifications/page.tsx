"use client";

import * as React from "react";
import { Mail, ShoppingCart, AlertCircle, CheckCircle2, UserPlus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const notifications = [
  {
    id: 1,
    title: "New Order Received",
    description: "Olivia Martin placed a new order (ORD-9382) for $1,999.00.",
    time: "10 minutes ago",
    type: "order",
    read: false,
  },
  {
    id: 2,
    title: "Low Stock Alert",
    description: "Magnetic Hijab Pins Set is out of stock. Please restock soon.",
    time: "1 hour ago",
    type: "alert",
    read: false,
  },
  {
    id: 3,
    title: "New Customer Registration",
    description: "Emma Davis just registered a new account.",
    time: "3 hours ago",
    type: "customer",
    read: true,
  },
  {
    id: 4,
    title: "System Update Complete",
    description: "The platform has been successfully updated to version 2.4.1.",
    time: "Yesterday, 10:00 AM",
    type: "system",
    read: true,
  },
  {
    id: 5,
    title: "Support Ticket Re-opened",
    description: "Customer #492 replied to their pending support ticket.",
    time: "Yesterday, 3:45 PM",
    type: "alert",
    read: true,
  },
];

function getIcon(type: string) {
  switch (type) {
    case "order":
      return <ShoppingCart className="h-5 w-5 text-blue-500" />;
    case "alert":
      return <AlertCircle className="h-5 w-5 text-destructive" />;
    case "customer":
      return <UserPlus className="h-5 w-5 text-green-500" />;
    case "system":
      return <CheckCircle2 className="h-5 w-5 text-primary" />;
    default:
      return <Mail className="h-5 w-5 text-muted-foreground" />;
  }
}

export default function AdminNotificationsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">
            Stay updated with the latest events and alerts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Mark All as Read</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 bg-muted/50">
          <TabsTrigger value="all" className="rounded-md">All Notifications</TabsTrigger>
          <TabsTrigger value="unread" className="rounded-md">
            Unread <Badge className="ml-2 bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center rounded-full">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="orders" className="rounded-md">Orders</TabsTrigger>
          <TabsTrigger value="system" className="rounded-md">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card className="border shadow-sm">
            <CardContent className="p-0">
              <div className="flex flex-col divide-y">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`flex items-start gap-4 p-4 md:p-6 hover:bg-muted/30 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                  >
                    <div className={`mt-0.5 p-2 rounded-full border ${!notification.read ? 'bg-background' : 'bg-muted/50'}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium leading-none ${!notification.read ? 'text-foreground' : 'text-foreground/80'}`}>
                          {notification.title}
                        </p>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.time}
                        </div>
                      </div>
                      <p className={`text-sm ${!notification.read ? 'text-muted-foreground font-medium' : 'text-muted-foreground/80'}`}>
                        {notification.description}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Intentionally left blank for other tabs - they would filter the array */}
      </Tabs>
    </div>
  );
}
