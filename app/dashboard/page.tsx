import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/auth/signin")
    }

    const role = (session.user as any).role

    if (role === "STUDENT") {
        redirect("/student/dashboard")
    }

    if (role === "MANAGER") {
        redirect("/manager/dashboard")
    }

    if (role === "ADMIN") {
        redirect("/dashboard/admin")
    }

    // Fallback if role is undefined or unknown
    return (
        <div className="container py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Account Setup Required</h1>
            <p className="text-muted-foreground">Please contact your administrator to assign a role to your account.</p>
        </div>
    )
}
