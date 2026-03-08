import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function DashboardCards() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Stations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">150</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Prix</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">$2</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tendance Prix</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">85%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Attendance Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">85%</p>
        </CardContent>
      </Card>
    </div>
  )
}