"use client";

import * as React from "react";
import { Save, Store, CreditCard, Truck, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Configure your store preferences and integrations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <Save className="h-4 w-4" /> Save Settings
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Tabs defaultValue="general" className="w-full flex flex-col md:flex-row gap-6">
          <TabsList className="w-full md:w-64 flex flex-col h-auto bg-transparent space-y-1 justify-start">
            <TabsTrigger value="general" className="w-full justify-start gap-2 data-[state=active]:bg-muted">
              <Store className="h-4 w-4" /> General Store
            </TabsTrigger>
            <TabsTrigger value="payment" className="w-full justify-start gap-2 data-[state=active]:bg-muted">
              <CreditCard className="h-4 w-4" /> Payments
            </TabsTrigger>
            <TabsTrigger value="shipping" className="w-full justify-start gap-2 data-[state=active]:bg-muted">
              <Truck className="h-4 w-4" /> Shipping & Delivery
            </TabsTrigger>
            <TabsTrigger value="mail" className="w-full justify-start gap-2 data-[state=active]:bg-muted">
              <Mail className="h-4 w-4" /> Email Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="w-full justify-start gap-2 data-[state=active]:bg-muted">
              <Shield className="h-4 w-4" /> Roles & Security
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-1 w-full">
            <TabsContent value="general" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Store Details</CardTitle>
                  <CardDescription>
                    Your store's name, description, and contact information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input id="store-name" defaultValue="Aelora" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Contact Email</Label>
                    <Input id="store-email" type="email" defaultValue="support@aelora.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Contact Phone</Label>
                    <Input id="store-phone" defaultValue="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-desc">Store Description (SEO)</Label>
                    <Textarea 
                      id="store-desc" 
                      defaultValue="Premium e-commerce destination for high-quality scarves and modern modesty apparel."
                    />
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Store Currency & Formatting</CardTitle>
                  <CardDescription>Configure how prices and dates appear.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Base Currency</Label>
                      <select id="currency" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select id="timezone" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option value="UTC">UTC</option>
                        <option value="EST">Eastern Time (EST)</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payment" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Providers</CardTitle>
                  <CardDescription>Manage Stripe, PayPal, and manual payment methods.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded-lg flex items-center justify-between mb-4 bg-muted/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">Stripe</div>
                      <div>
                        <h4 className="font-medium text-sm">Stripe (Credit Cards)</h4>
                        <p className="text-xs text-muted-foreground">Accept Visa, MasterCard, and Apple Pay</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Manage Settings</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg flex items-center justify-between bg-muted/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-black rounded flex items-center justify-center text-white font-bold text-xs italic">PayPal</div>
                      <div>
                        <h4 className="font-medium text-sm">PayPal Checkout</h4>
                        <p className="text-xs text-muted-foreground">Standard PayPal Integration</p>
                      </div>
                    </div>
                    <Button variant="default" size="sm">Connect</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Zones</CardTitle>
                  <CardDescription>Manage your delivery rates and zones.</CardDescription>
                </CardHeader>
                <CardContent className="h-40 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg m-6 mt-0">
                  Shipping Provider Integrations Coming Soon
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
