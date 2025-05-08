import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
  title: "Hobby Tracker - Supplies",
  description: "Supply Tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="-ml-1 rounded-none" />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}
