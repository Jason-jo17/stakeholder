"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Settings, Database, Activity, AlertCircle } from "lucide-react"
import { AddStakeholderDialog } from "@/components/stakeholders/AddStakeholderDialog"

import Link from "next/link"

export default function AdminDashboard() {
    return (
        <div className="container py-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Admin Console</h1>
                    <p className="text-muted-foreground">System overview and management</p>
                </div>
                <div className="flex gap-2">
                    <AddStakeholderDialog mode="admin" />
                    <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Button>
                    <Link href="/dashboard/admin/roadmap">
                        <Button>
                            <Database className="mr-2 h-4 w-4" />
                            Tool Sandbox
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+20% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Stakeholders</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">215</div>
                        <p className="text-xs text-muted-foreground">Verified profiles</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Problem Statements</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">36</div>
                        <p className="text-xs text-muted-foreground">Across 12 sectors</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Transcripts</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">142</div>
                        <p className="text-xs text-muted-foreground">Processed by AI</p>
                    </CardContent>
                </Card>
            </div>

            {/* Management Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Verification Queue</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-2 border rounded">
                            <div>
                                <div className="font-medium">New Stakeholder Request</div>
                                <div className="text-xs text-muted-foreground">Submitted 2 hours ago</div>
                            </div>
                            <Button size="sm">Review</Button>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                            <div>
                                <div className="font-medium">Solution Submission</div>
                                <div className="text-xs text-muted-foreground">Submitted 1 day ago</div>
                            </div>
                            <Button size="sm">Review</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>System Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span>Database Status</span>
                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Operational</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>AI Engine (OpenAI)</span>
                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Connected</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Vector DB (Pinecone)</span>
                            <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Latency High</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
