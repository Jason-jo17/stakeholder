"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { LayoutDashboard, Users, User, Shield, AlertCircle, Settings, LogOut } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
    const pathname = usePathname()
    const { data: session } = useSession()

    // Hide global header on homepage as it has its own custom design
    if (pathname === "/") return null

    let routes = [
        {
            href: "/stakeholders",
            label: "Stakeholder Search",
            icon: Users,
            active: pathname.startsWith("/stakeholders"),
            public: true
        },
        {
            href: "/problems",
            label: "Problems",
            icon: AlertCircle,
            active: pathname.startsWith("/problems"),
            public: true
        }
    ]

    if (session?.user) {
        const role = (session.user as any).role

        if (role === "STUDENT") {
            routes.push({
                href: "/student/dashboard",
                label: "Student Dashboard",
                icon: User,
                active: pathname.startsWith("/student"),
                public: false
            })
        } else if (role === "MANAGER") {
            routes.push({
                href: "/manager/dashboard",
                label: "Manager Dashboard",
                icon: Shield,
                active: pathname.startsWith("/manager"),
                public: false
            })
        } else if (role === "ADMIN") {
            routes.push({
                href: "/dashboard/admin",
                label: "Admin Console",
                icon: Settings,
                active: pathname.startsWith("/dashboard/admin"),
                public: false
            })
        } else if (role === "STAKEHOLDER") {
            routes.push({
                href: "/stakeholder/dashboard",
                label: "My Dashboard",
                icon: LayoutDashboard,
                active: pathname.startsWith("/stakeholder"),
                public: false
            })
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <LayoutDashboard className="h-6 w-6" />
                        <span className="hidden font-bold sm:inline-block">
                            Stakeholder Platform
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-1 lg:space-x-4 text-sm font-medium">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-md transition-all hover:bg-primary/5",
                                    route.active
                                        ? "text-primary bg-primary/10 font-bold"
                                        : "text-muted-foreground hover:text-primary"
                                )}
                            >
                                <route.icon className="h-4 w-4" />
                                <span className="hidden lg:inline">{route.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-end gap-4">
                    <form
                        action="/stakeholders"
                        method="GET"
                        className="hidden md:flex relative max-w-sm w-full group"
                    >
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            name="q"
                            className="w-full bg-secondary/50 border-none rounded-md pl-10 pr-20 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
                            placeholder="Search directory..."
                            suppressHydrationWarning
                        />
                        <button
                            type="submit"
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-white text-[10px] font-black uppercase px-2.5 py-1.5 rounded-md shadow-sm transition-all active:scale-95"
                            suppressHydrationWarning
                        >
                            Search
                        </button>
                    </form>
                    <nav className="flex items-center gap-2">
                        {session?.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full" suppressHydrationWarning>
                                        <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                                            {session.user.name?.[0]?.toUpperCase() || "U"}
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {session.user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => signOut()}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                                <Button variant="ghost" size="sm" asChild suppressHydrationWarning>
                                <Link href="/auth/signin">Log in</Link>
                            </Button>
                        )}
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
