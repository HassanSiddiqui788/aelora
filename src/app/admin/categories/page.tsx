"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Search,
  Plus,
  FolderTree,
  Edit2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

const categories = [
  {
    id: "CAT-01",
    name: "Scarves",
    description: "Premium silk and cotton scarves",
    productsCount: 45,
    status: "Active",
    type: "Parent",
  },
  {
    id: "CAT-02",
    name: "Accessories",
    description: "Pins, under-caps, and magnets",
    productsCount: 32,
    status: "Active",
    type: "Parent",
  },
  {
    id: "CAT-03",
    name: "Silk Hijabs",
    description: "100% natural silk hijabs",
    productsCount: 15,
    status: "Active",
    type: "Sub-Category (Scarves)",
  },
  {
    id: "CAT-04",
    name: "Chiffon Hijabs",
    description: "Lightweight summer collection",
    productsCount: 22,
    status: "Active",
    type: "Sub-Category (Scarves)",
  },
  {
    id: "CAT-05",
    name: "Premium Collection",
    description: "High-end luxury items",
    productsCount: 8,
    status: "Hidden",
    type: "Parent",
  },
];

export default function AdminCategoriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">
            Organize your products into categories and sub-categories.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex border rounded-md px-3 py-1 items-center max-w-sm w-full bg-background">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <Input 
                placeholder="Search categories..." 
                className="border-0 shadow-none focus-visible:ring-0 px-0 h-8"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <FolderTree className="h-4 w-4" />
                Sort Tree View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[300px] px-6">Category Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="px-6">
                    <div className="flex flex-col">
                      <span className="font-medium">{cat.name}</span>
                      <span className="text-xs text-muted-foreground">{cat.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{cat.type}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{cat.productsCount} items</Badge>
                  </TableCell>
                  <TableCell>
                    {cat.status === "Active" ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Hidden</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit2 className="mr-2 h-4 w-4 text-muted-foreground" />
                          Edit Category
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
            <div>Showing 5 categories</div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
