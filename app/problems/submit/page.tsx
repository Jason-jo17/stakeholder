"use client"

export default function SubmitProblemPage() {
    return (
        <main className="flex flex-1 justify-center py-5 px-4 bg-[#F1F2FB] dark:bg-[#111022] min-h-screen">
            <div className="layout-content-container flex flex-col max-w-[800px] flex-1">
                <div className="bg-white dark:bg-[#1c1b31] rounded-xl shadow-xl overflow-hidden border border-[#dcdbe6] dark:border-white/5">
                    <div className="p-6 bg-[#f8f7ff] dark:bg-white/5 border-b border-[#dcdbe6] dark:border-white/5">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-6 justify-between items-center">
                                <p className="text-[#111118] dark:text-white text-base font-semibold leading-normal">Form Completion</p>
                                <p className="text-[#786cf9] text-sm font-bold leading-normal">Almost Ready</p>
                            </div>
                            <div className="rounded-full bg-[#dcdbe6] dark:bg-white/10 h-2.5 w-full overflow-hidden">
                                <div className="h-full rounded-full bg-[#786cf9]" style={{ width: "85%" }}></div>
                            </div>
                            <p className="text-[#64608a] dark:text-white/60 text-xs font-medium uppercase tracking-wider">Step 1 of 1: Problem Details</p>
                        </div>
                    </div>
                    <div className="px-8 pt-8 pb-4">
                        <h1 className="text-[#111118] dark:text-white text-3xl font-black leading-tight tracking-tight">Submit New Problem Statement</h1>
                        <p className="text-[#64608a] dark:text-white/60 text-base mt-2">Identify a challenge affecting your community or organization to begin the resolution process.</p>
                    </div>
                    <form className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="flex flex-col gap-2">
                                    <span className="text-[#111118] dark:text-white text-sm font-bold">Problem Title</span>
                                    <input className="flex w-full rounded-lg text-[#1C2A3B] dark:text-white focus:ring-2 focus:ring-[#786BF9]/50 focus:border-[#786BF9] border border-[#dcdbe6] dark:border-white/10 bg-white dark:bg-[#252440] h-12 px-4 text-base font-normal placeholder:text-[#64608a]/60" placeholder="e.g., Water Scarcity in Northern District Irrigation Channels" type="text" />
                                </label>
                            </div>
                            <div>
                                <label className="flex flex-col gap-2">
                                    <span className="text-[#111118] dark:text-white text-sm font-bold">Category</span>
                                    <select className="form-select-icon flex w-full rounded-lg text-[#1C2A3B] dark:text-white focus:ring-2 focus:ring-[#786BF9]/50 focus:border-[#786BF9] border border-[#dcdbe6] dark:border-white/10 bg-white dark:bg-[#252440] h-12 px-4 text-base font-normal">
                                        <option disabled selected value="">Select Category</option>
                                        <option value="agri">Agriculture</option>
                                        <option value="tech">Technology</option>
                                        <option value="infra">Infrastructure</option>
                                        <option value="edu">Education</option>
                                        <option value="health">Healthcare</option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label className="flex flex-col gap-2">
                                    <span className="text-[#111118] dark:text-white text-sm font-bold">Location / Region</span>
                                    <select className="form-select-icon flex w-full rounded-lg text-[#1C2A3B] dark:text-white focus:ring-2 focus:ring-[#786BF9]/50 focus:border-[#786BF9] border border-[#dcdbe6] dark:border-white/10 bg-white dark:bg-[#252440] h-12 px-4 text-base font-normal">
                                        <option disabled selected value="">Select Region</option>
                                        <option value="north">North Region</option>
                                        <option value="south">South Region</option>
                                        <option value="east">East Region</option>
                                        <option value="west">West Region</option>
                                        <option value="central">Central District</option>
                                    </select>
                                </label>
                            </div>
                            <div className="md:col-span-2">
                                <label className="flex flex-col gap-2">
                                    <span className="text-[#111118] dark:text-white text-sm font-bold">Link Stakeholder</span>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64608a] text-xl pointer-events-none">search</span>
                                        <select className="form-select-icon flex w-full rounded-lg text-[#1C2A3B] dark:text-white focus:ring-2 focus:ring-[#786BF9]/50 focus:border-[#786BF9] border border-[#dcdbe6] dark:border-white/10 bg-white dark:bg-[#252440] h-12 pl-10 pr-4 text-base font-normal">
                                            <option value="">Search stakeholder directory...</option>
                                            <option value="1">Global Food Initiative (NGO)</option>
                                            <option value="2">Department of Agriculture & Water</option>
                                            <option value="3">Tech For Good Foundation</option>
                                            <option value="4">Rural Development Bank</option>
                                            <option value="5">Dr. Sarah Jenkins (Environmental Lead)</option>
                                            <option value="6">Community Water Oversight Committee</option>
                                        </select>
                                    </div>
                                </label>
                            </div>
                            <div>
                                <label className="flex flex-col gap-2">
                                    <span className="text-[#111118] dark:text-white text-sm font-bold">Affected Population</span>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64608a] text-xl pointer-events-none">groups</span>
                                        <input className="flex w-full rounded-lg text-[#1C2A3B] dark:text-white focus:ring-2 focus:ring-[#786BF9]/50 focus:border-[#786BF9] border border-[#dcdbe6] dark:border-white/10 bg-white dark:bg-[#252440] h-12 pl-10 pr-4 text-base font-normal placeholder:text-[#64608a]/60" placeholder="Number of people" type="number" />
                                    </div>
                                </label>
                            </div>
                            <div>
                                <span className="text-[#111118] dark:text-white text-sm font-bold block mb-2">Priority Level</span>
                                <div className="flex h-12 p-1 bg-[#f0f0f5] dark:bg-[#252440] rounded-lg gap-1">
                                    <button className="flex-1 flex items-center justify-center gap-1.5 rounded-md text-sm font-bold text-white bg-[#1EC075] shadow-sm" type="button">
                                        <span className="material-symbols-outlined text-[18px]">low_priority</span>
                                        Low
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-1.5 rounded-md text-sm font-bold text-[#1C2A3B] hover:bg-white/50 transition-colors" type="button">
                                        <span className="material-symbols-outlined text-[18px]">priority_high</span>
                                        High
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-1.5 rounded-md text-sm font-bold text-[#1C2A3B] dark:text-white hover:bg-white/10 transition-colors" type="button">
                                        <span className="material-symbols-outlined text-[18px]">emergency</span>
                                        Critical
                                    </button>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="flex flex-col gap-2">
                                    <span className="text-[#111118] dark:text-white text-sm font-bold">Detailed Description</span>
                                    <textarea className="flex w-full rounded-lg text-[#1C2A3B] dark:text-white focus:ring-2 focus:ring-[#786BF9]/50 focus:border-[#786BF9] border border-[#dcdbe6] dark:border-white/10 bg-white dark:bg-[#252440] p-4 text-base font-normal placeholder:text-[#64608a]/60 resize-none" placeholder="Provide a detailed overview of the situation, its history, and current impact..." rows={5}></textarea>
                                    <span className="text-right text-[#64608a] dark:text-white/40 text-xs">Recommended: 100-500 words</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#dcdbe6] dark:border-white/10">
                            <button className="px-6 py-3 rounded-lg text-sm font-bold text-[#64608a] dark:text-white/60 hover:bg-[#F1F2FB] dark:hover:bg-white/5 transition-all" type="button">
                                Cancel
                            </button>
                            <button className="px-8 py-3 rounded-lg text-sm font-bold text-white bg-[#786cf9] hover:bg-[#786cf9]/90 shadow-lg shadow-[#786cf9]/20 transition-all flex items-center gap-2" type="submit">
                                <span className="material-symbols-outlined text-[18px]">send</span>
                                Submit Problem
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-6 flex justify-center gap-8 text-[#64608a] dark:text-white/40 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">verified_user</span>
                        Secured Submission
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        Private to Stakeholders
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">support_agent</span>
                        24/7 Review Team
                    </div>
                </div>
            </div>
        </main>
    )
}
