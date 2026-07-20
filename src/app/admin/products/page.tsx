"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Search,
  Plus,
  Image as ImageIcon,
  Edit2,
  Trash2,
  Star
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

const products = [
  {
    id: "PRD-1029",
    name: "Classic Silk Hijab",
    category: "Scarves",
    price: "$29.99",
    stock: 145,
    status: "Active",
    rating: 4.8,
  },
  {
    id: "PRD-1030",
    name: "Premium Cotton Underscarf",
    category: "Accessories",
    price: "$12.99",
    stock: 320,
    status: "Active",
    rating: 4.5,
  },
  {
    id: "PRD-1031",
    name: "Luxury Chiffon Scarf - Evening Wear",
    category: "Scarves",
    price: "$45.00",
    stock: 12,
    status: "Low Stock",
    rating: 4.9,
  },
  {
    id: "PRD-1032",
    name: "Magnetic Hijab Pins Set",
    category: "Accessories",
    price: "$15.99",
    stock: 0,
    status: "Out of Stock",
    rating: 4.7,
  },
  {
    id: "PRD-1033",
    name: "Everyday Jersey Wrap",
    category: "Scarves",
    price: "$24.99",
    stock: 89,
    status: "Active",
    rating: 4.6,
  },
  {
    id: "PRD-1034",
    name: "Limited Edition Patterned Silk",
    category: "Premium",
    price: "$65.00",
    stock: 45,
    status: "Draft",
    rating: 0,
  },
];

function getStockBadge(status: string) {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Active</Badge>;
    case "Low Stock":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">Low Stock</Badge>;
    case "Out of Stock":
      return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Out of Stock</Badge>;
    case "Draft":
      return <Badge variant="outline" className="text-gray-500 bg-gray-50 border-gray-200 hover:bg-gray-100">Draft</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function AdminProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your inventory, prices, and product variations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Import</Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex border rounded-md px-3 py-1 items-center max-w-sm w-full bg-background">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <Input 
                placeholder="Search products..." 
                className="border-0 shadow-none focus-visible:ring-0 px-0 h-8"
              />
            </div>
            <div className="flex gap-2">
              <select className="h-9 w-40 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="">All Categories</option>
                <option value="scarves">Scarves</option>
                <option value="accessories">Accessories</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[60px]"></TableHead>
                <TableHead className="min-w-[250px]">Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="pl-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted/30">
                      <ImageIcon className="h-5 w-5 text-muted-foreground/50" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium truncate max-w-[200px]">{product.name}</span>
                      <span className="text-xs text-muted-foreground">{product.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="font-medium">{product.price}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className={product.stock === 0 ? "text-red-600 font-medium" : ""}>
                        {product.stock} in stock
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStockBadge(product.status)}</TableCell>
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
                          Edit Product
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
          <div className="flex w-full items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1</strong> to <strong>6</strong> of <strong>104</strong> products.
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
