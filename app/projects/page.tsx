import { FolderKanban, Plus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProjectsPage() {
    return (
        <div className="container py-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Active Projects</h1>
                    <p className="text-muted-foreground">Manage ongoing initiatives and strategy implementations.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Mock Project 1 */}
                <div className="rounded-xl border bg-card text-card-foreground shadow hover:shadow-md transition-shadow cursor-pointer">
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <FolderKanban className="h-6 w-6" />
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Dakshina Kannada Water Initiative</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">Comprehensive integrated water resource management plan for the coastal belt.</p>
                        </div>
                        <div className="pt-4 border-t flex items-center justify-between text-xs text-muted-foreground font-medium">
                            <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                Updated 2 days ago
                            </div>
                            <span>12 Stakeholders</span>
                        </div>
                    </div>
                </div>

                {/* Mock Project 2 */}
                <div className="rounded-xl border bg-card text-card-foreground shadow hover:shadow-md transition-shadow cursor-pointer">
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <FolderKanban className="h-6 w-6" />
                            </div>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Planning</Badge>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">Rural Education Digital Access</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">Infrastructure development for remote school connectivity in Mysuru district.</p>
                        </div>
                        <div className="pt-4 border-t flex items-center justify-between text-xs text-muted-foreground font-medium">
                            <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                Updated 5 days ago
                            </div>
                            <span>8 Stakeholders</span>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                <div className="rounded-xl border border-dashed bg-muted/10 flex flex-col items-center justify-center p-6 min-h-[200px] text-center space-y-4 hover:bg-muted/20 transition-colors cursor-pointer text-muted-foreground">
                    <div className="p-4 bg-muted rounded-full">
                        <Plus className="h-6 w-6" />
                    </div>
                    <p className="font-medium">Create New Project</p>
                </div>
            </div>
        </div>
    )
}
