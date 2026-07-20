import * as React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { Header } from "@/components/admin/header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-theme min-h-screen bg-background text-foreground flex flex-col relative z-0">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 overflow-x-hidden p-6 md:p-8 bg-muted/20">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
