"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Box,
  Image as ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Tag,
  Ticket,
  User,
  Users,
  Grid,
  Type,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
      { title: "Analytics", url: "/admin/analytics", icon: BarChart },
    ],
  },
  {
    title: "Catalog",
    items: [
      { title: "Products", url: "/admin/products", icon: Package },
      { title: "Categories", url: "/admin/categories", icon: Grid },
      { title: "Inventory", url: "/admin/inventory", icon: Box },
    ],
  },
  {
    title: "Sales",
    items: [
      { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
      { title: "Coupons", url: "/admin/coupons", icon: Ticket },
      { title: "Reviews", url: "/admin/reviews", icon: MessageSquare },
    ],
  },
  {
    title: "Customers",
    items: [
      { title: "Users", url: "/admin/users", icon: Users },
    ],
  },
  {
    title: "Content & Media",
    items: [
      { title: "Banners", url: "/admin/banners", icon: Tag },
      { title: "Website Content", url: "/admin/content", icon: Type },
      { title: "Media Library", url: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Settings", url: "/admin/settings", icon: Settings },
      { title: "Profile", url: "/admin/profile", icon: User },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="h-16 flex items-center justify-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Box className="w-6 h-6 text-primary" />
          <span>Aelora Admin</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {navItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
