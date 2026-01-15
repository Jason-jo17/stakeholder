"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, Building } from "lucide-react"

export function WorkTab({ stakeholder }: { stakeholder: any }) {
    // Mock work history if not present
    const workHistory = [
        {
            id: 1,
            role: stakeholder.designation,
            organization: stakeholder.organization,
            period: "2018 - Present",
            current: true,
            description: "Leading research and implementation of sustainable agricultural practices."
        },
        {
            id: 2,
            role: "Senior Research Fellow",
            organization: "Indian Council of Agricultural Research",
            period: "2010 - 2018",
            current: false,
            description: "Conducted extensive field studies on pest management."
        }
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Professional Experience</CardTitle>
                    <CardDescription>Career history and roles</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2.5 before:h-full before:w-0.5 before:bg-border before:translate-y-2">
                        {workHistory.map((job) => (
                            <div key={job.id} className="relative flex gap-4 pl-8">
                                <div className={`absolute left-0 mt-1.5 h-5 w-5 rounded-full border-4 border-background ${job.current ? 'bg-green-500' : 'bg-gray-400'}`} />
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-lg">{job.role}</h4>
                                        {job.current && <Badge variant="secondary" className="text-xs">Current</Badge>}
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground gap-3">
                                        <div className="flex items-center">
                                            <Building className="mr-1 h-3 w-3" />
                                            {job.organization}
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {job.period}
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">{job.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Key Projects</CardTitle>
                    <CardDescription>Major initiatives and contributions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Sustainable Coffee Initiative</h4>
                            <p className="text-sm text-muted-foreground mb-3">Implemented shade-grown coffee practices in 50+ hectares.</p>
                            <Badge variant="outline">Agriculture</Badge>
                        </div>
                        <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Farmer Education Program</h4>
                            <p className="text-sm text-muted-foreground mb-3">Trained 200+ local farmers in modern irrigation techniques.</p>
                            <Badge variant="outline">Education</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
