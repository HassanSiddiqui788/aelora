"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Search,
  ArrowDownToLine,
  ArrowUpFromLine,
  Box,
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
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const inventory = [
  {
    id: "PRD-1029",
    sku: "SKU-SLK-01",
    name: "Classic Silk Hijab",
    stock: 145,
    capacity: 200,
    status: "In Stock",
  },
  {
    id: "PRD-1030",
    sku: "SKU-ACC-05",
    name: "Premium Cotton Underscarf",
    stock: 320,
    capacity: 500,
    status: "In Stock",
  },
  {
    id: "PRD-1031",
    sku: "SKU-CHF-09",
    name: "Luxury Chiffon Scarf - Evening Wear",
    stock: 12,
    capacity: 100,
    status: "Low Stock",
  },
  {
    id: "PRD-1032",
    sku: "SKU-PIN-02",
    name: "Magnetic Hijab Pins Set",
    stock: 0,
    capacity: 150,
    status: "Out of Stock",
  },
  {
    id: "PRD-1033",
    sku: "SKU-JER-04",
    name: "Everyday Jersey Wrap",
    stock: 89,
    capacity: 100,
    status: "In Stock",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "In Stock":
      return "bg-green-500";
    case "Low Stock":
      return "bg-yellow-500";
    case "Out of Stock":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export default function AdminInventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
          <p className="text-muted-foreground">
            Monitor stock levels and manage restocks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <ArrowUpFromLine className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2">
            <ArrowDownToLine className="h-4 w-4" /> Receive Items
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <Box className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <Box className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex border rounded-md px-3 py-1 items-center max-w-sm w-full bg-background">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <Input 
                placeholder="Search inventory by SKU or product..." 
                className="border-0 shadow-none focus-visible:ring-0 px-0 h-8"
              />
            </div>
            <div className="flex gap-2">
              <select className="h-9 w-40 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="">All Statuses</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[300px] px-6">Product / SKU</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[300px]">Stock Level</TableHead>
                <TableHead className="text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => {
                const percentage = (item.stock / item.capacity) * 100;
                return (
                <TableRow key={item.id}>
                  <TableCell className="px-6">
                    <div className="flex flex-col">
                      <span className="font-medium truncate">{item.name}</span>
                      <span className="text-xs font-mono text-muted-foreground">{item.sku}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.status === "In Stock" && <Badge variant="outline" className="text-green-600 border-green-200">In Stock</Badge>}
                    {item.status === "Low Stock" && <Badge variant="outline" className="text-yellow-600 border-yellow-200">Low Stock</Badge>}
                    {item.status === "Out of Stock" && <Badge variant="outline" className="text-red-600 border-red-200">Out of Stock</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Progress value={percentage} className={`h-2 ${getStatusColor(item.status)}`} />
                      <span className="text-sm font-medium w-12">{item.stock}</span>
                    </div>
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
                          Adjust Quantity
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          View Purchase History
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
            <div>Showing 5 products</div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
