"use client"

import { RoadmapView } from "@/components/student/roadmap/RoadmapView"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminRoadmapPage() {
    return (
        <div className="container py-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Roadmap Tool Sandbox</h1>
                    <p className="text-muted-foreground">Admin utility to test and preview all roadmap tools without restrictions.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Admin Preview Mode</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-muted/30 p-4 rounded-xl border border-dashed mb-6">
                        <p className="text-sm text-muted-foreground">
                            <strong>Note:</strong> In this mode, all tools are unlocked. 
                            Data saved here is isolated to the "Admin Context" and won't affect student progress 
                            unless explicitly linked. Use this to verify tool functionality.
                        </p>
                    </div>
                    
                    <RoadmapView isAdmin={true} />
                </CardContent>
            </Card>
        </div>
    )
}
