"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Download,
  Eye,
  FileEdit,
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const orders = [
  {
    id: "ORD-9382",
    customer: "Olivia Martin",
    email: "olivia@email.com",
    date: "2026-07-20",
    total: "$1,999.00",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "ORD-9381",
    customer: "Jackson Lee",
    email: "jackson@email.com",
    date: "2026-07-19",
    total: "$39.00",
    status: "Processing",
    payment: "Paid",
  },
  {
    id: "ORD-9380",
    customer: "Isabella Nguyen",
    email: "isabella@email.com",
    date: "2026-07-19",
    total: "$299.00",
    status: "Shipped",
    payment: "Paid",
  },
  {
    id: "ORD-9379",
    customer: "William Kim",
    email: "will@email.com",
    date: "2026-07-18",
    total: "$99.00",
    status: "Processing",
    payment: "Pending",
  },
  {
    id: "ORD-9378",
    customer: "Sofia Davis",
    email: "sofia.davis@email.com",
    date: "2026-07-18",
    total: "$39.00",
    status: "Cancelled",
    payment: "Refunded",
  },
  {
    id: "ORD-9377",
    customer: "Michael Scott",
    email: "mscott@dundermifflin.com",
    date: "2026-07-17",
    total: "$149.00",
    status: "Delivered",
    payment: "Paid",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Delivered":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Delivered</Badge>;
    case "Processing":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">Processing</Badge>;
    case "Shipped":
      return <Badge variant="outline" className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200">Shipped</Badge>;
    case "Cancelled":
      return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getPaymentBadge(status: string) {
  switch (status) {
    case "Paid":
      return <Badge variant="outline" className="text-green-600 border-green-200">Paid</Badge>;
    case "Pending":
      return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Pending</Badge>;
    case "Refunded":
      return <Badge variant="outline" className="text-gray-500 border-gray-200">Refunded</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function AdminOrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            Manage your store's orders and track their delivery status.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2">Create Order</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex border rounded-md px-3 py-1 items-center max-w-sm w-full bg-background">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <Input 
                placeholder="Search orders..." 
                className="border-0 shadow-none focus-visible:ring-0 px-0 h-8"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[100px] px-6">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium px-6">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{order.customer}</span>
                      <span className="text-xs text-muted-foreground">{order.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="font-medium">{order.total}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getPaymentBadge(order.payment)}</TableCell>
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
                          <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileEdit className="mr-2 h-4 w-4 text-muted-foreground" />
                          Edit Order
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Order
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
              Showing <strong>1</strong> to <strong>6</strong> of <strong>24</strong> orders.
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
