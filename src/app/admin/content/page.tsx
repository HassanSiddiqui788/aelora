"use client";

import * as React from "react";
import { Type, LayoutTemplate, Save, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminContentPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Website Content</h2>
          <p className="text-muted-foreground">
            Manage your store&apos;s text, typography, and page structures.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Undo className="h-4 w-4" /> Discard
          </Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="homepage" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="about">About Us</TabsTrigger>
          <TabsTrigger value="contact">Contact Page</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>
        <TabsContent value="homepage" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5 text-primary" /> Hero Text Section
              </CardTitle>
              <CardDescription>
                The primary heading array welcoming users to your site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-heading">Main Heading</Label>
                <Input id="hero-heading" defaultValue="Discover Elegance & Modesty" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-sub">Subheading</Label>
                <Textarea 
                  id="hero-sub" 
                  defaultValue="Explore our premium collection of beautifully crafted silk and cotton scarves, designed to elevate your everyday style." 
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="btn-primary">Primary Button Text</Label>
                  <Input id="btn-primary" defaultValue="Shop Now" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="btn-secondary">Secondary Button Text</Label>
                  <Input id="btn-secondary" defaultValue="View Collections" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutTemplate className="h-5 w-5 text-primary" /> Featured Sections Labeling
              </CardTitle>
              <CardDescription>
                Titles for the product carousels across the homepage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feat-1">Featured Section 1 Title</Label>
                <Input id="feat-1" defaultValue="Our Bestsellers" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feat-2">Featured Section 2 Title</Label>
                <Input id="feat-2" defaultValue="New Arrivals" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="about" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>About Us Page Content</CardTitle>
              <CardDescription>Edit the story and mission of your brand.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-title">Page Title</Label>
                <Input id="about-title" defaultValue="Our Story" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-content">Content Block</Label>
                <Textarea 
                  id="about-content" 
                  defaultValue="Aelora began with a simple idea: that modesty and modern elegance should go hand in hand." 
                  className="min-h-[200px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
