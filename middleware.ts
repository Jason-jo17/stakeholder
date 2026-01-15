import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const path = req.nextUrl.pathname

        // If not authenticated, the default behavior of checks will handle the redirect to signin
        // This middleware function is only called if authorized callback returns true (which we ensure below)

        // Check for role-based access
        const userRole = token?.role as string | undefined

        // Common pattern: if user is logged in but tries to access a role-protected route they don't have access to
        if (path.startsWith("/student") && userRole !== "STUDENT" && userRole !== "ADMIN") {
            // Allow Admin to see everything or restrict strict? Assuming strict for now or admin access.
            // Usually Admin might want to access everything, but let's stick to strict role first or redirect to their dashboard
            return NextResponse.redirect(new URL("/unauthorized", req.url))
        }

        if (path.startsWith("/manager") && userRole !== "MANAGER" && userRole !== "ADMIN") {
            return NextResponse.redirect(new URL("/unauthorized", req.url))
        }

        if (path.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
            return NextResponse.redirect(new URL("/unauthorized", req.url))
        }
    },
    {
        callbacks: {
            // By default, only allow if token exists. 
            // This callback determines if the middleware function above should run.
            authorized: ({ token }) => !!token
        },
    }
)

export const config = {
    matcher: [
        "/student/:path*",
        "/manager/:path*",
        "/dashboard/admin/:path*"
    ]
}
