
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { IdeaCard, ConnectionRequestCard, StatCard } from "@/components/stakeholder/DashboardComponents"
import { Bell, LayoutDashboard } from "lucide-react"
import { acceptConnectionRequest, rejectConnectionRequest } from "@/actions/stakeholder"

export default async function StakeholderDashboard() {
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any).role !== 'STAKEHOLDER') {
        redirect("/auth/signin")
    }

    const userId = (session.user as any).id

    // Fetch Stakeholder Profile and related data
    const stakeholder = await prisma.stakeholderProfile.findUnique({
        where: { userId: userId },
        include: {
            problemStatements: true,
            solutions: true,
            interactions: {
                where: {
                    type: "CONNECTION_REQUEST",
                    // status: "pending" // Assuming we have status in interaction or we infer it
                },
                include: {
                    initiator: true
                }
            }
        }
    })

    if (!stakeholder) {
        return <div>Profile not found. Please contact support.</div>
    }

    return (
        <div className="container py-8 space-y-8">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold">Welcome, {stakeholder.designation}</h1>
                    <p className="text-muted-foreground mt-2">
                        {stakeholder.organization} • {stakeholder.district}
                    </p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Proposed Problems"
                    value={stakeholder.problemStatements.length}
                    iconName="Target"
                />
                <StatCard
                    title="Solutions Proposed"
                    value={stakeholder.solutions.length}
                    iconName="Lightbulb"
                />
                <StatCard
                    title="Connections"
                    value={stakeholder.interactions.length}
                    iconName="Users"
                    trend="Pending Requests"
                />
                <StatCard
                    title="Impact Score"
                    value={stakeholder.engagementScore || 0}
                    iconName="Zap"
                />
            </div>

            {/* Connection Requests Section */}
            <div className="bg-muted/10 rounded-xl p-6 border border-border">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                    <Bell className="w-5 h-5 text-primary" />
                    Connection Requests
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stakeholder.interactions.length > 0 ? (
                        stakeholder.interactions.map((interaction) => (
                            <ConnectionRequestCard
                                key={interaction.id}
                                request={interaction}
                                onAccept={async () => {
                                    "use server"
                                    await acceptConnectionRequest(interaction.id)
                                }}
                                onReject={async () => {
                                    "use server"
                                    await rejectConnectionRequest(interaction.id)
                                }}
                            />
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground col-span-full">No new connection requests.</p>
                    )}
                </div>
            </div>

            {/* Main Content: Ideas & Solutions */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <LayoutDashboard className="w-6 h-6" />
                    Proposed Ideas & Problems
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stakeholder.problemStatements.map((ps) => (
                        <IdeaCard
                            key={ps.id}
                            id={ps.id}
                            type="problem"
                            title={ps.title}
                            description={ps.description}
                            status={ps.status}
                            code={ps.code}
                        // slug={ps.slug} 
                        />
                    ))}
                    {stakeholder.solutions.map((sol) => (
                        <IdeaCard
                            key={sol.id}
                            id={sol.id}
                            type="solution"
                            title={sol.title}
                            description={sol.description}
                            status={sol.status}
                            code={sol.code}
                            slug={(sol as any).slug}
                        />
                    ))}
                    {stakeholder.problemStatements.length === 0 && stakeholder.solutions.length === 0 && (
                        <div className="text-center p-8 border rounded-lg border-dashed text-muted-foreground col-span-full">
                            No proposals linked to your profile yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
