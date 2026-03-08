// app/page.tsx
import DashboardLayout from "@/components/layout/DashboardLayout"
import { DashboardCards } from "@/components/dashboard/DashboardCard"
import { EvolutionPrix } from "@/components/dashboard/EvolutionPrix"


export default function Page() {
  return (
    <DashboardLayout>
      <DashboardCards />
      <EvolutionPrix />
    </DashboardLayout>
  )
}