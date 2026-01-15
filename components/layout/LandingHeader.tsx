"use client"

import { Bell, UserCircle, Users, User, Shield, AlertCircle, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"

export function LandingHeader() {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/10 bg-white/80 dark:bg-background/50 px-6 md:px-10 py-3 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-4 text-primary">
                    <div className="size-8">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <g clipPath="url(#clip0_6_330)">
                                <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_6_330"><rect fill="white" height="48" width="48"></rect></clipPath>
                            </defs>
                        </svg>
                    </div>
                    <h2 className="text-[#111118] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Stakeholder Mapping</h2>
                </Link>

                <nav className="hidden md:flex items-center space-x-1 lg:space-x-4 text-sm font-medium">
                    <Link href="/stakeholders" className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-primary font-bold">
                        <Users className="h-4 w-4" />
                        <span className="hidden lg:inline">Stakeholder Search</span>
                    </Link>
                    <Link href="/student/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5">
                        <User className="h-4 w-4" />
                        <span className="hidden lg:inline">Student</span>
                    </Link>
                    <Link href="/manager/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5">
                        <Shield className="h-4 w-4" />
                        <span className="hidden lg:inline">Manager</span>
                    </Link>
                    <Link href="/problems" className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5">
                        <AlertCircle className="h-4 w-4" />
                        <span className="hidden lg:inline">Problems</span>
                    </Link>
                    <Link href="/dashboard/admin" className="flex items-center gap-2 px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/5">
                        <Settings className="h-4 w-4" />
                        <span className="hidden lg:inline">Admin</span>
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-3">
                <nav className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href="/auth/signin">Log in</Link>
                    </Button>
                    <ModeToggle />
                    <Button variant="ghost" size="icon" className="h-10 w-10 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg">
                        <Bell className="w-5 h-5" />
                    </Button>
                </nav>
            </div>
        </header>
    )
}
