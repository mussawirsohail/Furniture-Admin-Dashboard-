"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type SidebarContextType = {
  isOpen: boolean
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)

  return <SidebarContext.Provider value={{ isOpen, toggle }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()
  return <aside className={`bg-gray-800 text-white w-64 min-h-screen p-4 ${isOpen ? "" : "hidden"}`}>{children}</aside>
}

export function SidebarHeader({ children }: { children: React.ReactNode }) {
  return <div className="mb-4">{children}</div>
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <nav>{children}</nav>
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <div className="mb-2">{children}</div>
}

export function SidebarMenuButton({
  children,
  asChild,
  ...props
}: { children: React.ReactNode; asChild?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  if (asChild) {
    return <>{children}</>
  }
  return (
    <button className="w-full text-left hover:bg-gray-700 p-2 rounded" {...props}>
      {children}
    </button>
  )
}

