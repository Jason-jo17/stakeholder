import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lightbulb, MapPin, Users, IndianRupee } from "lucide-react"
import Link from "next/link"

export function SolutionCard({ solution }: { solution: any }) {
    return (
        <Card className="hover:shadow-lg transition-shadow bg-blue-50/50 border-blue-100 dark:bg-blue-950/10 dark:border-blue-900/50">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{solution.title}</CardTitle>
                    <Badge className="capitalize">{solution.implementationStatus}</Badge>
                </div>
                <CardDescription className="line-clamp-2">
                    {solution.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{solution.primarySector}</Badge>
                    <Badge variant="outline">{solution.solutionType}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    {solution.districts && (
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{solution.districts.join(', ')}</span>
                        </div>
                    )}
                    {solution.beneficiariesTargeted && (
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>{solution.beneficiariesTargeted}</span>
                        </div>
                    )}
                    {solution.estimatedBudget && (
                        <div className="flex items-center gap-2">
                            <IndianRupee className="h-4 w-4 text-primary" />
                            <span>{solution.estimatedBudget.toLocaleString()}</span>
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter>
                <Button className="w-full" variant="outline" asChild>
                    <Link href={`/solutions/${solution.id}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
