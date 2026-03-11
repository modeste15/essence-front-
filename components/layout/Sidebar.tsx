import Link from "next/link"
import { Home, ChartBar , Users, Calendar, DollarSign, MapPin , Map} from "lucide-react"
import { DashboardBrowsingIcon } from "@hugeicons/core-free-icons"

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r p-4 flex flex-col">
    <h1 className="text-xl font-bold mb-6">Essence Vision</h1>

      <nav className="flex-1">
        
       
        {/* Dashboard Navigation */}
        {/* <Link href="/" className="flex items-center mb-4 hover:text-blue-600">
          <ChartBar className="mr-2" /> Dashboard
        </Link> */}
        
        {/* City/Ville Navigation */}
        {/* <Link href="/ville" className="flex items-center mb-4 hover:text-blue-600">
          <MapPin className="mr-2" /> Ville
        </Link> */}

        <Link href="/" className="flex items-center mb-4 hover:text-blue-600">
          <Home className="mr-2" /> Home
        </Link>
        <Link href="/map" className="flex items-center mb-4 hover:text-blue-600">
          <Map className="mr-2" /> Map
        </Link>

      </nav>
    </div>
  )
}