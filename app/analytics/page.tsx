import { BarChart3, TrendingUp, Users } from "lucide-react"

export default function AnalyticsPage() {
    return (
        <div className="container py-8 max-w-7xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Analytics Overview</h1>
                <p className="text-muted-foreground">Platform usage metrics and engagement statistics.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Stakeholders</h3>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center pt-2">
                        <div className="text-2xl font-bold">250</div>
                        <p className="text-xs text-muted-foreground ml-2">+12% from last month</p>
                    </div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Active Strategy Maps</h3>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center pt-2">
                        <div className="text-2xl font-bold">14</div>
                        <p className="text-xs text-muted-foreground ml-2">+3 new this week</p>
                    </div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Problem Coverage</h3>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center pt-2">
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground ml-2">Sectors mapped</p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow min-h-[400px] flex items-center justify-center bg-muted/10">
                <div className="text-center space-y-4">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                        <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Detailed Analytics Coming Soon</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                        We are currently aggregating historical data to provide deeper insights into stakeholder relationships and impact metrics.
                    </p>
                </div>
            </div>
        </div>
    )
}
