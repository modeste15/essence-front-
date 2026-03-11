import { Moon, Sun } from "lucide-react"

export function Topbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-white border-b">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center gap-4">
        <button   className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors">
        
          Modeste KOUASSI
        </button>
      </div>
    </div>
  )
}