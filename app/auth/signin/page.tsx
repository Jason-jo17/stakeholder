"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInPage() {
    const router = useRouter()
    const [selectedRole, setSelectedRole] = useState<'student' | 'manager' | 'admin'>('student')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // Using provided colors from user snippet as inline styles or Tailwind arbitrary values
    // provided config: primary: #6b6bfa, text-main: #1c2a3b

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const result = await signIn("credentials", {
                email,
                password,
                role: selectedRole, // Passing role to backend if supported, or logic handled there
                redirect: false,
            })

            if (result?.error) {
                // Handle error
                console.error("Login failed", result.error)
                alert("Login failed: " + result.error)
            } else {
                // Redirect based on role
                if (selectedRole === 'student') router.push('/student/dashboard')
                else if (selectedRole === 'manager') router.push('/manager/dashboard')
                else if (selectedRole === 'admin') router.push('/dashboard/admin')
                else router.push('/')
            }
        } catch (error) {
            console.error("Login error", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col lg:flex-row bg-[#f1f2fb] dark:bg-[#0f0f23] text-[#1c2a3b] dark:text-white transition-colors font-sans">
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            {/* Left Hero Section: Branding/Visual */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-white dark:bg-[#0f0f23] border-r border-[#dbdbe6] dark:border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#6b6bfa] rounded-lg text-white">
                        <span className="material-symbols-outlined block">account_balance_wallet</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">Stakeholder Platform</h2>
                </div>
                <div className="max-w-md">
                    <div
                        className="w-full h-64 bg-center bg-no-repeat bg-cover rounded-xl mb-8 shadow-2xl shadow-[#6b6bfa]/20"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCTNekzFmPBIAbT_a7G2S1coJFnKKuKb6K0v6AAlggNNuJIwnbz110GlX8-LoCRBs_lrpZzdfmbhuk-UOSznkb4llc_0T_yAuEQkO1btKjEOxsS72LTGJU3aX4QcknKm1XHcH1SNsQrBVBxbaPT9dFK5-brrVdU0MsdGHjPV5zl7XH4bVZlxRWKHhBbjMwDuWEpBJenOgXuKC4G2OdusmgsoIUJmqcayn3dAwd8u8O1y8o8Uctg9BAqKEiBWalE1M8T-3Y5J96MpHyD")' }}
                    >
                    </div>
                    <h1 className="text-4xl font-black leading-tight mb-4 text-[#1c2a3b] dark:text-white">
                        Empowering Stakeholders with Precision.
                    </h1>
                    <p className="text-lg text-[#5f5f8c] dark:text-gray-400">
                        A professional-grade environment for managing roles, assets, and strategic data across your organization.
                    </p>
                </div>
                <div className="text-sm text-[#5f5f8c]">
                    © 2024 Stakeholder Platform Inc. All rights reserved.
                </div>
            </div>

            {/* Right Section: Login Interaction */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-[480px] bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-xl p-8 lg:p-10 border border-[#f0f0f5] dark:border-gray-800">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                        <p className="text-[#5f5f8c] dark:text-gray-400">Please select your role and enter your credentials.</p>
                    </div>

                    {/* Role Selection */}
                    <div className="mb-8">
                        <p className="text-sm font-semibold mb-3 text-[#1c2a3b] dark:text-gray-300">Select your workspace</p>
                        <div className="grid grid-cols-3 gap-3">
                            <label className={`relative flex flex-col items-center justify-center p-3 cursor-pointer rounded-xl border transition-all hover:bg-gray-50 dark:hover:bg-gray-800 
                                ${selectedRole === 'student'
                                    ? 'border-[#6b6bfa] bg-[#6b6bfa]/5 ring-2 ring-[#6b6bfa]'
                                    : 'border-[#dbdbe6] dark:border-gray-700 bg-white dark:bg-transparent'
                                }`}
                                onClick={() => setSelectedRole('student')}
                            >
                                <input className="sr-only" name="role" type="radio" value="student" checked={selectedRole === 'student'} readOnly />
                                <span className={`material-symbols-outlined mb-1 ${selectedRole === 'student' ? 'text-[#6b6bfa]' : 'text-gray-400'}`}>person_outline</span>
                                <span className="text-[10px] sm:text-xs font-medium text-center">Student</span>
                            </label>

                            <label className={`relative flex flex-col items-center justify-center p-3 cursor-pointer rounded-xl border transition-all hover:bg-gray-50 dark:hover:bg-gray-800 
                                ${selectedRole === 'manager'
                                    ? 'border-[#6b6bfa] bg-[#6b6bfa]/5 ring-2 ring-[#6b6bfa]'
                                    : 'border-[#dbdbe6] dark:border-gray-700 bg-white dark:bg-transparent'
                                }`}
                                onClick={() => setSelectedRole('manager')}
                            >
                                <input className="sr-only" name="role" type="radio" value="manager" checked={selectedRole === 'manager'} readOnly />
                                <span className={`material-symbols-outlined mb-1 ${selectedRole === 'manager' ? 'text-[#6b6bfa]' : 'text-gray-400'}`}>business_center</span>
                                <span className="text-[10px] sm:text-xs font-medium text-center">Manager</span>
                            </label>

                            <label className={`relative flex flex-col items-center justify-center p-3 cursor-pointer rounded-xl border transition-all hover:bg-gray-50 dark:hover:bg-gray-800 
                                ${selectedRole === 'admin'
                                    ? 'border-[#6b6bfa] bg-[#6b6bfa]/5 ring-2 ring-[#6b6bfa]'
                                    : 'border-[#dbdbe6] dark:border-gray-700 bg-white dark:bg-transparent'
                                }`}
                                onClick={() => setSelectedRole('admin')}
                            >
                                <input className="sr-only" name="role" type="radio" value="admin" checked={selectedRole === 'admin'} readOnly />
                                <span className={`material-symbols-outlined mb-1 ${selectedRole === 'admin' ? 'text-[#6b6bfa]' : 'text-gray-400'}`}>admin_panel_settings</span>
                                <span className="text-[10px] sm:text-xs font-medium text-center">Admin</span>
                            </label>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-semibold mb-2 text-[#1c2a3b] dark:text-gray-300">Email Address</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">alternate_email</span>
                                <input
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#dbdbe6] dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6b6bfa] focus:border-transparent transition-all text-sm"
                                    placeholder="name@company.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-sm font-semibold text-[#1c2a3b] dark:text-gray-300">Password</label>
                                <a className="text-xs font-medium text-[#6b6bfa] hover:underline" href="#">Forgot?</a>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
                                <input
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#dbdbe6] dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6b6bfa] focus:border-transparent transition-all text-sm"
                                    placeholder="••••••••"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input className="w-4 h-4 rounded text-[#6b6bfa] focus:ring-[#6b6bfa] border-gray-300" id="remember" type="checkbox" />
                            <label className="text-xs text-[#5f5f8c] dark:text-gray-400" htmlFor="remember">Remember this device for 30 days</label>
                        </div>
                        <button
                            className="w-full bg-[#6b6bfa] hover:bg-[#6b6bfa]/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#6b6bfa]/20 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
                            type="submit"
                            disabled={isLoading}
                        >
                            <span>{isLoading ? "Authenticating..." : "Login to Dashboard"}</span>
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-10 pt-6 border-t border-[#f0f0f5] dark:border-gray-800 text-center">
                        <p className="text-sm text-[#5f5f8c] dark:text-gray-400">
                            Don&apos;t have an account?
                            <Link href="#" className="text-[#6b6bfa] font-bold hover:underline ml-1">Request Access</Link>
                        </p>
                    </div>
                </div>

                {/* Mobile Footer Only */}
                <div className="lg:hidden mt-8 text-center px-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="size-6 bg-[#6b6bfa] rounded-md flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-[14px]">account_balance_wallet</span>
                        </div>
                        <h2 className="text-[#111118] dark:text-white font-bold text-sm">Stakeholder Platform</h2>
                    </div>
                    <p className="text-xs text-[#5f5f8c]">© 2024 Stakeholder Platform Inc.</p>
                </div>
            </div>
        </div>
    )
}
