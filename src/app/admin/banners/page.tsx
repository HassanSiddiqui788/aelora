"use client";

import * as React from "react";
import { Plus, GripVertical, Image as ImageIcon, Settings2, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const banners = [
  {
    id: "BAN-1",
    title: "Summer Sale 2026",
    position: "Homepage Hero Slider",
    status: "Active",
    type: "Image Banner",
    preview: "/placeholders/banner1.jpg"
  },
  {
    id: "BAN-2",
    title: "New Arrivals - Silk Collection",
    position: "Homepage Secondary",
    status: "Scheduled",
    type: "Split Banner",
    preview: "/placeholders/banner2.jpg"
  },
  {
    id: "BAN-3",
    title: "Ramadan Special Offer",
    position: "Category Header",
    status: "Draft",
    type: "Promotional Banner",
    preview: "/placeholders/banner3.jpg"
  }
];

export default function AdminBannersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Banners & Sliders</h2>
          <p className="text-muted-foreground">
            Manage your homepage banners, promotional sliders, and visual campaigns.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Create Banner
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {banners.map((banner, i) => (
          <Card key={banner.id} className="overflow-hidden flex flex-col">
            <div className="aspect-[21/9] bg-muted relative group flex items-center justify-center border-b">
              {/* Dummy Image Representation */}
              <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{banner.title}</CardTitle>
                  <CardDescription className="text-xs">{banner.position}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 cursor-grab text-muted-foreground active:cursor-grabbing">
                  <GripVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex-grow">
              <div className="flex gap-2">
                {banner.status === "Active" && <Badge className="bg-green-100 text-green-700">Active</Badge>}
                {banner.status === "Scheduled" && <Badge variant="secondary" className="bg-blue-100 text-blue-700">Scheduled</Badge>}
                {banner.status === "Draft" && <Badge variant="outline">Draft</Badge>}
                <Badge variant="outline" className="text-muted-foreground">{banner.type}</Badge>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 border-t mt-auto">
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground gap-2">
                <Settings2 className="h-4 w-4" /> Manage Design
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {/* Add New Card Placeholder */}
        <Card className="flex flex-col items-center justify-center border-dashed text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors cursor-pointer min-h-[300px]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-2 border-dashed flex items-center justify-center">
              <Plus className="h-6 w-6" />
            </div>
            <p className="font-medium">Add New Banner</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
