"use client";

import * as React from "react";
import { Plus, Search, Tag, MoreHorizontal, Edit, Trash2 } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const coupons = [
  {
    code: "SUMMER20",
    type: "Percentage",
    discount: "20%",
    status: "Active",
    usage: "450 / Unlimited",
    expiry: "2026-08-31",
  },
  {
    code: "FREESHIP",
    type: "Free Shipping",
    discount: "Shipping",
    status: "Active",
    usage: "1,200 / Unlimited",
    expiry: "No Expiry",
  },
  {
    code: "WELCOME10",
    type: "Fixed Amount",
    discount: "$10.00",
    status: "Active",
    usage: "89 / 1000",
    expiry: "2026-12-31",
  },
  {
    code: "FLASH50",
    type: "Percentage",
    discount: "50%",
    status: "Expired",
    usage: "500 / 500",
    expiry: "2026-06-30",
  },
  {
    code: "VIPMEMBER",
    type: "Percentage",
    discount: "15%",
    status: "Draft",
    usage: "0 / Unlimited",
    expiry: "2026-12-31",
  },
];

export default function AdminCouponsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Coupons & Discounts</h2>
          <p className="text-muted-foreground">
            Manage promotional codes, automatic discounts, and free shipping offers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Create Coupon
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex border rounded-md px-3 py-1 items-center max-w-sm w-full bg-background">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <Input 
                placeholder="Search coupon codes..." 
                className="border-0 shadow-none focus-visible:ring-0 px-0 h-8"
              />
            </div>
            <div className="flex gap-2">
              <select className="h-9 w-40 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[200px] px-6">Coupon Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Discount Value</TableHead>
                <TableHead>Usage Limit</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.code}>
                  <TableCell className="px-6">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono font-medium">{coupon.code}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{coupon.type}</TableCell>
                  <TableCell className="font-medium text-green-600">{coupon.discount}</TableCell>
                  <TableCell className="text-sm">{coupon.usage}</TableCell>
                  <TableCell className="text-sm">{coupon.expiry}</TableCell>
                  <TableCell>
                    {coupon.status === "Active" && <Badge className="bg-green-100 text-green-700">Active</Badge>}
                    {coupon.status === "Expired" && <Badge variant="secondary">Expired</Badge>}
                    {coupon.status === "Draft" && <Badge variant="outline">Draft</Badge>}
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
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4 text-muted-foreground" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
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
            <div>Showing 5 coupons</div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
