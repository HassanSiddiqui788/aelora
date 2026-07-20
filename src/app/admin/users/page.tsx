"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Search,
  UserPlus,
  ShieldAlert,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  {
    id: "USR-001",
    name: "James Wilson",
    email: "j.wilson@example.com",
    role: "Customer",
    status: "Active",
    joined: "2025-11-20",
    avatar: "/avatars/06.png",
    initials: "JW",
  },
  {
    id: "USR-002",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    role: "Admin",
    status: "Active",
    joined: "2024-03-12",
    avatar: "/avatars/07.png",
    initials: "ED",
  },
  {
    id: "USR-003",
    name: "Noah Martinez",
    email: "noah.m@example.com",
    role: "Customer",
    status: "Inactive",
    joined: "2026-01-05",
    avatar: "/avatars/08.png",
    initials: "NM",
  },
  {
    id: "USR-004",
    name: "Sophia Anderson",
    email: "sophia.a@example.com",
    role: "Customer",
    status: "Active",
    joined: "2026-05-18",
    avatar: "/avatars/09.png",
    initials: "SA",
  },
  {
    id: "USR-005",
    name: "Lucas Taylor",
    email: "lucas.taylor@example.com",
    role: "Manager",
    status: "Blocked",
    joined: "2025-08-22",
    avatar: "/avatars/10.png",
    initials: "LT",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "Active":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Active</Badge>;
    case "Inactive":
      return <Badge variant="secondary" className="text-gray-600 bg-gray-100 border-gray-200 hover:bg-gray-100">Inactive</Badge>;
    case "Blocked":
      return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Blocked</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage your customers and staff members.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex border rounded-md px-3 py-1 items-center max-w-sm w-full bg-background">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <Input 
                placeholder="Search users by name or email..." 
                className="border-0 shadow-none focus-visible:ring-0 px-0 h-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[280px] px-6">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-6">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt="Avatar" />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.role === "Admin" || user.role === "Manager" ? (
                      <Badge variant="outline" className="border-primary text-primary bg-primary/5">{user.role}</Badge>
                    ) : (
                      user.role
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.joined}</TableCell>
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
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-yellow-600">
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          Suspend User
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
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
            <div>Showing 5 users</div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
