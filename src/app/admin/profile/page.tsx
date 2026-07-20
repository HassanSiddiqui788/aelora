"use client";

import * as React from "react";
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminProfilePage() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Profile</h2>
          <p className="text-muted-foreground">
            Manage your personal account settings and security.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
                  <AvatarImage src="/avatars/01.png" alt="@admin" />
                  <AvatarFallback className="text-2xl">A</AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardTitle>Admin User</CardTitle>
            <CardDescription>Super Administrator</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>admin@aelora.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>New York, USA</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" defaultValue="Admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" defaultValue="User" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="admin@aelora.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="EST">Eastern Time (EST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save Updates</Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password to stay secure.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-w-xl">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="text-primary border-primary hover:bg-primary/5">Update Password</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
