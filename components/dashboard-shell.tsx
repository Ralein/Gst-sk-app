import type { ReactNode } from "react"
import { ModeToggle } from "@/components/mode-toggle"

interface DashboardShellProps {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b glass sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">GST Return Filing</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground mr-2">FY 2024-25</span>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-4 md:py-8">{children}</main>
    </div>
  )
}
