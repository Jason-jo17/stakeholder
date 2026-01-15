"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, MapPin, Briefcase, FileText, Plus, Upload } from "lucide-react"

interface DirectoryHeroProps {
    onSearch: (query: string) => void
}

export function DirectoryHero({ onSearch }: DirectoryHeroProps) {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 text-white p-10 mb-10 shadow-2xl border border-white/5">
            {/* Abstract Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="absolute top-6 right-6 flex gap-3 z-10">
                <Button variant="outline" size="sm" className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 text-white hover:text-white transition-all shadow-sm" asChild>
                    <Link href="/stakeholders/add">
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Link>
                </Button>
                <Button variant="outline" size="sm" className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 text-white hover:text-white transition-all shadow-sm" asChild>
                    <Link href="/stakeholders/import">
                        <Upload className="mr-2 h-4 w-4" /> Import
                    </Link>
                </Button>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center mt-6">
                <h1 className="text-5xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                    Find the Right Partners
                </h1>
                <p className="text-lg text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Connect with key stakeholders, experts, and organizations across Dakshina Karnataka to solve regional challenges together.
                </p>

                <div className="relative max-w-2xl mx-auto group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative">
                        <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Search by name, organization, expertise, or problem..."
                            className="pl-12 h-14 w-full text-base bg-white/95 backdrop-blur-md border-0 rounded-xl shadow-xl text-gray-900 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-blue-500/50"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center mt-8">
                    {["Agriculture", "Healthcare", "Kodagu District", "Coffee Issues"].map((tag) => (
                        <Button
                            key={tag}
                            variant="secondary"
                            size="sm"
                            className="bg-white/10 hover:bg-white/20 text-blue-50 border border-white/5 backdrop-blur-sm rounded-full px-4 transition-all hover:scale-105"
                            onClick={() => onSearch(tag.split(" ")[0])}
                        >
                            {tag === 'Kodagu District' ? <MapPin className="mr-1.5 h-3.5 w-3.5 opacity-70" /> :
                                tag === 'Coffee Issues' ? <FileText className="mr-1.5 h-3.5 w-3.5 opacity-70" /> :
                                    <Briefcase className="mr-1.5 h-3.5 w-3.5 opacity-70" />}
                            {tag}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
