import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-background p-8">{children}</main>
      </div>
    </SidebarProvider>
  )
}

