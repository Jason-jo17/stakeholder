import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"

export function ProblemCard({ problem }: { problem: any }) {
    const severityColor = {
        'Critical': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
        'High': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
        'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
        'Low': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
    }[problem.severity as string] || 'bg-gray-100 text-gray-800'

    return (
        <Card className="hover:shadow-lg transition-shadow bg-blue-50/20 border-blue-100 dark:bg-blue-900/10 dark:border-blue-800/50">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">{problem.code}</Badge>
                            <Badge className={severityColor}>{problem.severity}</Badge>
                        </div>
                        <CardTitle className="text-xl leading-tight">{problem.title}</CardTitle>
                    </div>
                </div>
                <CardDescription className="line-clamp-2 mt-2">
                    {problem.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
                <Badge variant="secondary" className="mb-2">{problem.domain}</Badge>

                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {problem.districts && (
                        <div className="flex items-center gap-2 col-span-2">
                            <MapPin className="h-4 w-4 text-primary shrink-0" />
                            <span className="truncate">{problem.districts.join(', ')}</span>
                        </div>
                    )}
                    {problem.affectedPopulation && (
                        <div className="flex items-center gap-2 col-span-2">
                            <Users className="h-4 w-4 text-primary shrink-0" />
                            <span>{problem.affectedPopulation.toLocaleString()} affected</span>
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                    <Link href={`/problems/${problem.id}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
