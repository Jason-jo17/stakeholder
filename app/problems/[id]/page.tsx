import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import { RichTextBlock } from "@/components/ui/rich-text-block"

// Force dynamic rendering since we are fetching data
export const dynamic = 'force-dynamic'

export default async function ProblemDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    // Try to find by ID (Cuid) first
    let problem = await prisma.problemStatement.findUnique({
        where: { id: params.id },
        include: {
            stakeholders: {
                include: {
                    user: true,
                    problemStatements: { select: { id: true } },
                    solutions: { select: { id: true } }
                }
            },
            solutions: true,
            sectors: true
        }
    }) as any;

    // Try to find by Code (e.g. PS_1.1)
    if (!problem) {
        problem = await prisma.problemStatement.findUnique({
            where: { code: params.id },
            include: {
                stakeholders: {
                    include: {
                        user: true,
                        problemStatements: { select: { id: true } },
                        solutions: { select: { id: true } }
                    }
                },
                solutions: true,
                sectors: true
            }
        })
    }

    // Fallback for Demo ID '1' -> PS_1.1
    if (!problem && params.id === '1') {
        problem = await prisma.problemStatement.findUnique({
            where: { code: 'PS_1.1' },
            include: {
                stakeholders: {
                    include: {
                        user: true,
                        problemStatements: { select: { id: true } },
                        solutions: { select: { id: true } }
                    }
                },
                solutions: true,
                sectors: true
            }
        })
    }

    // Check platform problems
    const { getPlatformProblem } = await import('@/lib/data/platform-problems');
    const platformProblem = getPlatformProblem(params.id);

    // Prioritize mock data if it matches the ID and has detailed info, 
    // OR if no DB problem was found.
    // NOTE: In a real scenario, we might merge them. Here we want to force the new view if available.
    if (platformProblem) {
        if (!problem || (platformProblem.what_is_the_problem)) {
            problem = platformProblem;
        }
    }

    if (!problem) {
        return notFound()
    }

    // Check if we have the "detailed" structure (blocks)
    const isDetailed = !!problem.what_is_the_problem;

    // Use a unified structure for rendering
    const problemTitle = problem.title;
    const problemSeverity = problem.severity;
    const problemDomain = problem.domain || (problem.domains ? problem.domains[0] : 'General');
    const problemCode = problem.code || params.id;
    const problemThumb = problem.thumbnail;
    const solutions = problem.solutions || [];

    // --- RENDER DETAILED VIEW ---
    if (isDetailed) {
        return (
            <div className="min-h-screen bg-[#F8F9FC] text-[#1C2A3B] font-sans pb-20">
                {/* Header */}
                <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#E2E8F0] bg-white px-6 md:px-10 py-3 shadow-sm">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3 text-[#1C2A3B] hover:opacity-80 transition-opacity">
                            <div className="size-8 text-[#786BF9]">
                                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold leading-tight tracking-tight">Platform</h2>
                        </Link>
                        <nav className="hidden md:flex items-center gap-8 ml-4">
                            <Link href="/problems" className="text-[#1C2A3B] text-sm font-semibold hover:text-[#786BF9] transition-colors border-b-2 border-transparent hover:border-[#786BF9] py-1">Problems</Link>
                            <Link href="/solutions" className="text-gray-500 text-sm font-medium hover:text-[#786BF9] transition-colors">Solutions</Link>
                        </nav>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-6 md:px-10 py-8">
                    {/* Breadcrumbs */}
                    <nav className="flex flex-wrap gap-2 mb-6 items-center">
                        <Link href="/dashboard" className="text-gray-500 text-sm font-medium hover:text-[#786BF9]">Home</Link>
                        <span className="text-gray-300 text-sm">/</span>
                        <Link href="/problems" className="text-gray-500 text-sm font-medium hover:text-[#786BF9]">Problem Statements</Link>
                        <span className="text-gray-300 text-sm">/</span>
                        <span className="text-[#1C2A3B] text-sm font-semibold truncate max-w-[200px]">{problemTitle}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Content Column */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Title Section */}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-[#1C2A3B] leading-tight mb-4">{problemTitle}</h1>

                                <div className="flex flex-wrap gap-3 mb-6">
                                    {problem.sectors?.map((s: any, i: number) => (
                                        <span key={i} className="bg-[#EEF2FF] text-[#4F46E5] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide border border-[#C7D2FE]">
                                            {typeof s === 'string' ? s : s.name}
                                        </span>
                                    ))}
                                    {problem.regions?.map((r: any, i: number) => (
                                        <span key={i} className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide border border-gray-200 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                                            {r.district}
                                        </span>
                                    ))}
                                </div>

                                {problemThumb && (
                                    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm mb-8 border border-gray-200">
                                        <img src={problemThumb} alt={problemTitle} className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                            {/* Detailed Sections */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-8 space-y-10">

                                    <section>
                                        <h3 className="text-xl font-bold text-[#1C2A3B] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                                            <span className="material-symbols-outlined text-[#786BF9]">help</span>
                                            What is the Problem?
                                        </h3>
                                        <RichTextBlock blocks={problem.what_is_the_problem?.blocks} />
                                    </section>

                                    <section>
                                        <h3 className="text-xl font-bold text-[#1C2A3B] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                                            <span className="material-symbols-outlined text-[#EF4444]">warning</span>
                                            Why is it a Problem?
                                        </h3>
                                        <RichTextBlock blocks={problem.why_is_it_a_problem?.blocks} />
                                    </section>

                                    <section>
                                        <h3 className="text-xl font-bold text-[#1C2A3B] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                                            <span className="material-symbols-outlined text-[#F59E0B]">schedule</span>
                                            When & Where?
                                        </h3>
                                        <RichTextBlock blocks={problem.when_and_where_does_problem_occur?.blocks} />
                                    </section>

                                    <section>
                                        <h3 className="text-xl font-bold text-[#1C2A3B] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                                            <span className="material-symbols-outlined text-[#10B981]">groups</span>
                                            Who is Affected?
                                        </h3>
                                        <RichTextBlock blocks={problem.who_are_facing?.blocks} />
                                    </section>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-8 space-y-10">
                                <section>
                                    <h3 className="text-xl font-bold text-[#1C2A3B] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                                        <span className="material-symbols-outlined text-gray-500">construction</span>
                                        Existing Solutions
                                    </h3>
                                    <RichTextBlock blocks={problem.existing_solution?.blocks} />
                                </section>

                                <section>
                                    <h3 className="text-xl font-bold text-[#1C2A3B] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                                        <span className="material-symbols-outlined text-[#EC4899]">record_voice_over</span>
                                        Stakeholder Complaints
                                    </h3>
                                    <RichTextBlock blocks={problem.stakeholders_complaint?.blocks} />
                                </section>

                                <section>
                                    <h3 className="text-xl font-bold text-[#1C2A3B] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                                        <span className="material-symbols-outlined text-[#3B82F6]">trending_up</span>
                                        Market Opportunity
                                    </h3>
                                    <RichTextBlock blocks={problem.market_size?.blocks} />
                                </section>
                            </div>

                            {/* Additional Info / Meta */}
                            <div className="bg-[#F8F9FC] rounded-lg p-6 border border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-4">Metadata & Classification</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Technologies</p>
                                        <div className="flex flex-wrap gap-2">
                                            {problem.technologies?.map((t: string, i: number) => (
                                                <span key={i} className="text-sm bg-white border border-gray-200 px-2 py-1 rounded text-gray-700">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Domains</p>
                                        <div className="flex flex-wrap gap-2">
                                            {problem.domains?.map((t: string, i: number) => (
                                                <span key={i} className="text-sm bg-white border border-gray-200 px-2 py-1 rounded text-gray-700">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-2">SDGs</p>
                                        <div className="flex flex-wrap gap-2">
                                            {problem.sdgs?.map((t: string, i: number) => (
                                                <span key={i} className="text-sm bg-green-50 border border-green-200 text-green-800 px-2 py-1 rounded">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stakeholders Section */}
                            <div>
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#786BF9]">groups</span>
                                    Linked Stakeholders
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {problem.stakeholders && problem.stakeholders.length > 0 ? problem.stakeholders.map((st: any, i: number) => (
                                        <Link href={`/stakeholders/${st.id}`} key={st.id || i} className="flex items-center gap-3 p-4 bg-white border border-[#E2E8F0] rounded-[0.625rem] shadow-sm hover:border-[#786BF9] transition-all">
                                            <div className="size-12 rounded-full border border-[#E2E8F0] bg-gray-50 flex items-center justify-center text-xl font-bold text-[#786BF9]">
                                                {(st.user?.name || st.organization || '?').charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-[#1C2A3B] line-clamp-1">{st.user?.name || st.organization || 'Unknown'}</p>
                                                <p className="text-xs text-gray-500 line-clamp-1">{st.organization || st.designation}</p>
                                                <div className="flex gap-2 mt-1">
                                                    <span className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded font-medium border border-purple-100">
                                                        {(st.problemStatements?.length || 0)} Problems
                                                    </span>
                                                    <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium border border-green-100">
                                                        {(st.solutions?.length || 0)} Solutions
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    )) : (
                                        <div className="col-span-full text-gray-500 italic p-4 text-center border border-dashed border-gray-200 rounded-lg">No stakeholders linked yet.</div>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-4 space-y-6">

                            {/* Actions Card */}
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                                <h3 className="font-bold text-lg mb-4">Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full py-2.5 px-4 bg-[#786BF9] hover:bg-[#6A5AE0] text-white rounded-lg font-semibold shadow-sm transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">add_circle</span>
                                        Submit Solution
                                    </button>
                                    <button className="w-full py-2.5 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">bookmark</span>
                                        Save for Later
                                    </button>
                                    <button className="w-full py-2.5 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">share</span>
                                        Share
                                    </button>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 mb-2">Last Updated</p>
                                    <p className="text-sm font-medium text-gray-700">{new Date(problem.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>

                            {/* Related Solutions */}
                            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-lg">Proposed Solutions</h3>
                                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{solutions.length}</span>
                                </div>

                                <div className="space-y-4">
                                    {solutions.length > 0 ? solutions.map((sol: any, idx: number) => (
                                        <Link href={`/solutions/${sol.id}`} key={idx} className="group block p-3 rounded-lg border border-gray-100 hover:border-[#786BF9] hover:shadow-md transition-all bg-white relative overflow-hidden">
                                            <div className="flex gap-3">
                                                <div className="size-16 rounded-md bg-gray-100 flex-shrink-0 overflow-hidden">
                                                    {sol.thumbnail ? (
                                                        <img src={sol.thumbnail} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <span className="material-symbols-outlined">image</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-sm text-[#1C2A3B] group-hover:text-[#786BF9] line-clamp-2 leading-snug mb-1">{sol.title}</h4>
                                                    <p className="text-xs text-gray-500 truncate">by {sol.author || 'Unknown'}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    )) : (
                                        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                            <p className="text-sm">No solutions yet.</p>
                                            <p className="text-xs mt-1">Be the first to solve this!</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        )
    }

    // --- RENDER ORIGINAL VIEW (Fallback) ---
    // Sort stakeholders by relevance (most problem statements + solutions)
    if (problem.stakeholders) {
        problem.stakeholders.sort((a: any, b: any) => {
            const scoreA = (a.problemStatements?.length || 0) + (a.solutions?.length || 0);
            const scoreB = (b.problemStatements?.length || 0) + (b.solutions?.length || 0);
            return scoreB - scoreA;
        });
    }

    return (
        <div className="min-h-screen bg-[#F1F2FB] text-[#1C2A3B] font-sans">
            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#8E959D]/20 bg-white px-10 py-3">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-[#1C2A3B]">
                        <div className="size-6 text-[#786BF9]">
                            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Stakeholder Platform</h2>
                    </div>
                    <div className="flex items-center gap-9">
                        <Link href="/problems" className="text-[#1C2A3B] text-sm font-medium leading-normal hover:text-[#786BF9] transition-colors">Problems</Link>
                        <Link href="/stakeholders" className="text-[#1C2A3B] text-sm font-medium leading-normal hover:text-[#786BF9] transition-colors">Stakeholders</Link>
                        <Link href="/solutions" className="text-[#1C2A3B] text-sm font-medium leading-normal hover:text-[#786BF9] transition-colors">Solutions</Link>
                        <Link href="/reports" className="text-[#1C2A3B] text-sm font-medium leading-normal hover:text-[#786BF9] transition-colors">Reports</Link>
                    </div>
                </div>
                <div className="flex flex-1 justify-end gap-6">
                    <label className="flex flex-col min-w-40 !h-10 max-w-64">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-[#8E959D]/30 overflow-hidden">
                            <div className="text-[#786BF9] flex bg-white items-center justify-center pl-3">
                                <span className="material-symbols-outlined text-xl">search</span>
                            </div>
                            <input className="form-input flex w-full min-w-0 flex-1 border-none bg-white focus:ring-0 text-sm placeholder:text-gray-400" placeholder="Search problems..." />
                        </div>
                    </label>
                    <div className="flex gap-2">
                        <button className="flex items-center justify-center rounded-lg size-10 bg-white border border-[#8E959D]/30 text-[#1C2A3B]">
                            <span className="material-symbols-outlined text-xl">notifications</span>
                        </button>
                        <button className="flex items-center justify-center rounded-lg size-10 bg-white border border-[#8E959D]/30 text-[#1C2A3B]">
                            <span className="material-symbols-outlined text-xl">settings</span>
                        </button>
                    </div>
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-[#8E959D]/30" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAPJ1I1g7Csk_zglix_l6G7JyonGyyu1q7Y43MzNqPBI2EcWSYjuejnEowV5Tfz_qgrUHL5BVxFuYrr4qmHNL8E5sjspOaIJ4wxvLoT6QjAN5PwkeLRwXw34ikLdk2xMSJIlOv__WJSvbYlGBiu6ps8IUeAono2PpGk6pVJeWBavx-B_yfk7faDnkYX0csihwJVV7lXZnTVNYxzsPT8qlJTDL-0iob2fAMOKo7enGfnFpXPh8xPsLsRUNAdLdZOXfc4WHje8VoxZp2g")' }}></div>
                </div>
            </header>

            <main className="max-w-[1280px] mx-auto px-10 py-8">
                <nav className="flex flex-wrap gap-2 mb-4">
                    <Link href="/dashboard" className="text-gray-500 text-sm font-medium leading-normal hover:text-[#786BF9]">Dashboard</Link>
                    <span className="text-gray-400 text-sm font-medium leading-normal">/</span>
                    <Link href="/problems" className="text-gray-500 text-sm font-medium leading-normal hover:text-[#786BF9]">Regional Problems</Link>
                    <span className="text-gray-400 text-sm font-medium leading-normal">/</span>
                    <span className="text-[#1C2A3B] text-sm font-medium leading-normal">Problem Details</span>
                </nav>
                <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-black leading-tight tracking-tight">{problem.title}</h1>
                            <span className={`${problem.severity === 'Critical' ? 'bg-[#DC143C]' : problem.severity === 'High' ? 'bg-orange-500' : 'bg-[#FECE0A]'} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>{problem.severity}</span>
                        </div>
                        <p className="text-gray-500 text-lg font-normal">Domain: {problemDomain} | ID: #{problemCode}</p>
                    </div>
                    <Link href="/problems">
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-[#786BF9] text-[#786BF9] rounded-lg font-bold text-sm shadow-sm hover:bg-[#786BF9]/5 transition-all">
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            <span>Back to Problems</span>
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Context Card */}
                        <div className="bg-white border border-[#8E959D] rounded-[0.625rem] overflow-hidden shadow-sm">
                            <div className="w-full h-64 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url("${problemThumb || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4Jn7RFlKtl-fKhHnDZMwBhJK6oMiYaamxaL5liRh1ETtvrTMWBQafoSW41msvDe_6TTO9Xtevr4sfZi32PvAg3GKjtno0MusYSoC2UcJv8Vep5on6KzpyGflZMglqpXDhaso8mByWOhnwR4C0JuiO8c9S71d6Cf1C7DwIVeKMhP9EBjzjVKX8hsULJWkVxW8Xt0g1fqEbxxOqNAvq0IM2Sp63g_BuqWI-x-vaXIf3z-8whg8Ax_aY82dJRHnpAsxOO31UJJKhfxVZ'}")` }}></div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-4">Context &amp; Root Causes</h3>
                                <div className="space-y-4 text-[#1C2A3B] leading-relaxed text-base">
                                    <p>{problem.description}</p>

                                    {problem.rootCauses.length > 0 && (
                                        <>
                                            <p className="font-semibold mt-4">Key contributors identified:</p>
                                            <ul className="list-disc pl-5 space-y-2 marker:text-[#786BF9]">
                                                {problem.rootCauses.map((cause: string, i: number) => (
                                                    <li key={i}>{cause}</li>
                                                ))}
                                            </ul>
                                        </>
                                    )}

                                    {problem.currentImpact && (
                                        <p className="mt-4">{problem.currentImpact}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Stakeholders Section */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#786BF9]">groups</span>
                                Linked Stakeholders
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {problem.stakeholders.length > 0 ? problem.stakeholders.map((st: any, i: number) => (
                                    <Link href={`/stakeholders/${st.id}`} key={st.id} className="flex items-center gap-3 p-4 bg-white border border-[#8E959D] rounded-[0.625rem] shadow-sm hover:border-[#786BF9] transition-all">
                                        <div className="size-12 rounded-full border border-[#8E959D]/20 bg-gray-100 flex items-center justify-center text-xl font-bold text-[#786BF9]">
                                            {(st.user?.name || st.organization || '?').charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#1C2A3B] line-clamp-1">{st.user?.name || st.organization || 'Unknown Stakeholder'}</p>
                                            <p className="text-xs text-gray-500 line-clamp-1">{st.organization || st.designation}</p>
                                            <div className="flex gap-2 mt-1">
                                                <span className="text-[10px] bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded font-medium">
                                                    {(st.problemStatements?.length || 0)} Problems
                                                </span>
                                                <span className="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium">
                                                    {(st.solutions?.length || 0)} Solutions
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                )) : (
                                    <div className="col-span-3 text-gray-500 italic">No stakeholders linked yet.</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Metrics Card */}
                        <div className="bg-white border border-[#8E959D] rounded-[0.625rem] p-6 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#786BF9]">bar_chart</span>
                                Impact Metrics
                            </h3>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="bg-[#F1F2FB]/50 p-4 rounded-lg">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Population Affected</p>
                                        <p className="text-2xl font-black text-[#1C2A3B]">{problem.affectedPopulation ? problem.affectedPopulation.toLocaleString() : 'N/A'}</p>
                                    </div>
                                    <div className="bg-[#F1F2FB]/50 p-4 rounded-lg border-l-4 border-[#786BF9]">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Districts Impacted</p>
                                        <p className="text-sm font-bold text-[#1C2A3B]">{problem.districts.join(', ') || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Solutions Card */}
                        <div className="bg-white border border-[#8E959D] rounded-[0.625rem] p-6 shadow-sm">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#786BF9]">lightbulb</span>
                                Related Solutions
                            </h3>
                            <div className="space-y-4">
                                {problem.solutions.length > 0 ? problem.solutions.map((sol: any) => (
                                    <Link href={`/solutions/${sol.id}`} key={sol.id} className="group p-4 border border-[#8E959D]/30 rounded-lg hover:border-[#786BF9] transition-all cursor-pointer block">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-sm text-[#1C2A3B] group-hover:text-[#786BF9] transition-colors">{sol.title}</h4>
                                            <span className="material-symbols-outlined text-sm text-gray-400">open_in_new</span>
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{sol.description}</p>
                                        <div className="mt-3 flex items-center gap-2">
                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#F1F2FB] text-[#1C2A3B] rounded-full">{sol.status}</span>
                                            {sol.budget && <span className="text-[10px] text-gray-400">Budget: ₹{sol.budget}</span>}
                                        </div>
                                    </Link>
                                )) : (
                                    <div className="text-gray-500 italic text-sm">No solutions linked yet.</div>
                                )}
                            </div>
                            <button className="w-full mt-6 py-3 border-2 border-dashed border-[#786BF9]/50 rounded-lg text-sm font-bold text-[#786BF9] hover:bg-[#786BF9]/5 transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                Propose New Solution
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[#8E959D]/20 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-[#786BF9] transition-colors">
                            <span className="material-symbols-outlined text-lg">share</span>
                            Share Deep-Dive
                        </button>
                        <button className="flex items-center gap-2 text-gray-500 font-bold text-sm hover:text-[#786BF9] transition-colors">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Export PDF Report
                        </button>
                    </div>
                    <p className="text-xs text-gray-400 italic">Last updated: {new Date(problem.updatedAt).toLocaleDateString()}</p>
                </div>
            </main>
        </div>
    )
}
