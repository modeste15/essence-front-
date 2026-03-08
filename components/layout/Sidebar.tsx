import Link from "next/link"
import { Users, Calendar, DollarSign, MapPin } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">Essence App</h1>

      <nav className="flex-1">
        <Link href="/" className="flex items-center mb-4 hover:text-blue-600">
          <Users className="mr-2" /> Dashboard
        </Link>
        <Link href="/map" className="flex items-center mb-4 hover:text-blue-600">
          <MapPin className="mr-2" /> Map
        </Link>

      </nav>
    </div>
  )
}