"use client";

import * as React from "react";
import { 
  UploadCloud, 
  Search, 
  FolderPlus, 
  Image as ImageIcon, 
  File, 
  Trash2, 
  MoreVertical,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mediaFiles = [
  { id: 1, name: "hero-banner-spring.jpg", type: "image", size: "1.2 MB", date: "2026-07-20" },
  { id: 2, name: "product-silk-scarf-1.webp", type: "image", size: "450 KB", date: "2026-07-20" },
  { id: 3, name: "product-silk-scarf-2.webp", type: "image", size: "480 KB", date: "2026-07-19" },
  { id: 4, name: "brand-logo-dark.svg", type: "image", size: "45 KB", date: "2026-07-18" },
  { id: 5, name: "brand-logo-light.svg", type: "image", size: "45 KB", date: "2026-07-18" },
  { id: 6, name: "promo-ramadan.mp4", type: "video", size: "12.4 MB", date: "2026-07-15" },
  { id: 7, name: "winter-collection-bg.jpg", type: "image", size: "2.1 MB", date: "2026-07-10" },
  { id: 8, name: "sizing-guide.pdf", type: "document", size: "890 KB", date: "2026-07-05" },
];

export default function AdminMediaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Media Library</h2>
          <p className="text-muted-foreground">
            Manage your store's images, videos, and documents centrally.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <FolderPlus className="h-4 w-4" /> New Folder
          </Button>
          <Button className="gap-2">
            <UploadCloud className="h-4 w-4" /> Upload Files
          </Button>
        </div>
      </div>

      <Card className="flex flex-col border-0 shadow-none bg-transparent">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <div className="flex border rounded-md px-3 py-1 items-center bg-background w-full md:w-[400px]">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <Input 
              placeholder="Search media files by name..." 
              className="border-0 shadow-none focus-visible:ring-0 px-0 h-9"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="gap-2 w-full md:w-auto">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <select className="h-10 w-full md:w-40 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <option value="newest">Sort by: Newest</option>
              <option value="oldest">Sort by: Oldest</option>
              <option value="size">Sort by: Size</option>
              <option value="name">Sort by: Name A-Z</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {/* Upload Drop Zone Card */}
          <div className="col-span-2 sm:col-span-3 text-center md:col-span-4 lg:col-span-2 xl:col-span-2 aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-6 hover:bg-muted/50 transition-colors cursor-pointer text-muted-foreground hover:text-foreground">
            <div className="p-4 rounded-full bg-primary/10 text-primary mb-2">
              <UploadCloud className="h-6 w-6" />
            </div>
            <p className="font-medium text-sm">Click to upload</p>
            <p className="text-xs text-muted-foreground mt-1 text-center">or drag and drop max 10MB</p>
          </div>

          {mediaFiles.map((file) => (
            <div key={file.id} className="relative group rounded-lg border bg-background overflow-hidden aspect-square flex flex-col cursor-pointer transition-all hover:ring-2 hover:ring-primary hover:shadow-md">
              <div className="flex-1 bg-muted/30 flex items-center justify-center relative">
                {file.type === 'document' ? (
                  <File className="h-10 w-10 text-blue-400" />
                ) : (
                  <ImageIcon className="h-10 w-10 text-muted-foreground/40" />
                )}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-2 border-t text-xs flex justify-between items-center bg-background">
                <div className="truncate pr-2">
                  <p className="font-medium truncate" title={file.name}>{file.name}</p>
                  <p className="text-muted-foreground mt-0.5">{file.size}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 z-10 hover:bg-muted">
                      <MoreVertical className="h-3 w-3" />
                      <span className="sr-only">Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Copy Link</DropdownMenuItem>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
