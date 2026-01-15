"use client"

import React from 'react'

export function ThemedValueCanvas() {
    return (
        <div className="font-sans text-text-heading bg-page-bg min-h-screen">
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            <header className="flex items-center justify-between whitespace-nowrap border-b border-stroke/20 bg-white px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-4 text-primary">
                    <div className="size-6">
                        <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fillRule="evenodd"></path>
                        </svg>
                    </div>
                    <h2 className="text-text-heading text-lg font-bold leading-tight tracking-[-0.015em]">Value Canvas Tool</h2>
                </div>
                <div className="flex items-center gap-6">
                    <nav className="flex items-center gap-8 mr-4">
                        <a className="text-stroke text-sm font-medium hover:text-primary transition-colors" href="#">Dashboard</a>
                        <a className="text-stroke text-sm font-medium hover:text-primary transition-colors" href="#">Projects</a>
                        <a className="text-text-heading text-sm font-bold border-b-2 border-primary pb-1" href="#">Canvas</a>
                    </nav>
                    <div className="flex gap-3">
                        <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-canvas h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:opacity-90 transition-all">
                            <span>Save Canvas</span>
                        </button>
                        <button className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-canvas h-10 px-4 bg-[#f0f2f4] text-text-heading text-sm font-bold hover:bg-[#e5e7eb] transition-all">
                            <span>Export PDF</span>
                        </button>
                        <button className="flex items-center justify-center rounded-canvas h-10 w-10 bg-[#f0f2f4] text-text-heading hover:bg-[#e5e7eb]">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-10 py-6">
                <div className="flex items-center gap-2 mb-4">
                    <a className="text-stroke text-sm font-medium hover:text-primary" href="#">STK-402 Sustainable Urbanism</a>
                    <span className="text-stroke text-sm font-medium">/</span>
                    <span className="text-text-heading text-sm font-bold">Value Proposition Canvas</span>
                </div>
                <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-text-heading tracking-tight text-3xl font-bold leading-tight">Student Project: Sustainable Urban Mobility</h1>
                        <p className="text-stroke text-sm font-normal">Mapping the value proposition for the <span className="font-bold text-primary">&quot;Eco-Commuter&quot;</span> stakeholder segment.</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex bg-white border border-stroke/30 rounded-canvas p-1">
                            <button className="p-2 text-primary bg-primary/10 rounded-md">
                                <span className="material-symbols-outlined">near_me</span>
                            </button>
                            <button className="p-2 text-stroke hover:text-primary rounded-md">
                                <span className="material-symbols-outlined">pan_tool</span>
                            </button>
                            <button className="p-2 text-stroke hover:text-primary rounded-md">
                                <span className="material-symbols-outlined">zoom_in</span>
                            </button>
                        </div>
                        <button className="flex items-center justify-center rounded-canvas h-11 bg-primary text-white gap-2 text-sm font-bold px-5 shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                            <span className="truncate">Switch Stakeholder: Eco-Commuter</span>
                            <span className="material-symbols-outlined">expand_more</span>
                        </button>
                    </div>
                </div>

                <div className="canvas-grid">
                    <div className="bg-canvas-bg rounded-canvas border border-stroke p-8 flex flex-col gap-6 relative overflow-hidden">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-text-heading">
                                <span className="material-symbols-outlined text-primary">inventory_2</span>
                                Value Map
                            </h3>
                            <span className="text-xs font-bold uppercase tracking-wider text-stroke bg-[#F1F2FB] px-2 py-1 rounded">Value Creation</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 h-full">
                            <div className="col-span-1 row-span-2 segment-container p-4 bg-page-bg/30 flex flex-col gap-3">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-sm text-text-heading">Products &amp; Services</h4>
                                    <button className="text-primary hover:bg-primary/10 p-1 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined">add_circle</span>
                                    </button>
                                </div>
                                <div className="sticky-note p-3 bg-sticky-blue shadow-sm text-sm border-l-4 border-primary text-text-heading">
                                    Subscription-based e-bike sharing app
                                </div>
                                <div className="sticky-note p-3 bg-sticky-blue shadow-sm text-sm border-l-4 border-primary text-text-heading">
                                    Integrated multimodal transit planner
                                </div>
                            </div>
                            <div className="segment-container p-4 bg-page-bg/30 flex flex-col gap-3">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-sm text-text-heading">Gain Creators</h4>
                                    <button className="text-primary hover:bg-primary/10 p-1 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined">add_circle</span>
                                    </button>
                                </div>
                                <div className="sticky-note p-3 bg-sticky-green shadow-sm text-sm border-l-4 border-[#1EC075] text-text-heading">
                                    Reward points for CO2 reduction
                                </div>
                            </div>
                            <div className="segment-container p-4 bg-page-bg/30 flex flex-col gap-3">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-sm text-text-heading">Pain Relievers</h4>
                                    <button className="text-primary hover:bg-primary/10 p-1 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined">add_circle</span>
                                    </button>
                                </div>
                                <div className="sticky-note p-3 bg-sticky-red shadow-sm text-sm border-l-4 border-[#DC143C] text-text-heading">
                                    Real-time bike availability tracking
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-canvas-bg rounded-full border border-stroke p-12 flex flex-col gap-6 relative aspect-square items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                            <span className="material-symbols-outlined text-[300px]">person_outline</span>
                        </div>
                        <div className="z-10 w-full h-full relative">
                            <div className="absolute top-0 right-0 left-0 flex justify-center mb-4">
                                <h3 className="text-xl font-bold flex items-center gap-2 text-text-heading">
                                    <span className="material-symbols-outlined text-primary">groups</span>
                                    Stakeholder Profile
                                </h3>
                            </div>

                            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-48 segment-container p-3 bg-white/80 flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-xs uppercase text-[#1EC075]">Gains</h4>
                                    <button className="text-primary hover:bg-primary/10 p-1 rounded-full">
                                        <span className="material-symbols-outlined text-sm">add</span>
                                    </button>
                                </div>
                                <div className="sticky-note p-2 bg-sticky-green text-[11px] shadow-sm text-text-heading">Faster arrival at work</div>
                                <div className="sticky-note p-2 bg-sticky-green text-[11px] shadow-sm text-text-heading">Better physical health</div>
                            </div>

                            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-48 segment-container p-3 bg-white/80 flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-xs uppercase text-[#DC143C]">Pains</h4>
                                    <button className="text-primary hover:bg-primary/10 p-1 rounded-full">
                                        <span className="material-symbols-outlined text-sm">add</span>
                                    </button>
                                </div>
                                <div className="sticky-note p-2 bg-sticky-red text-[11px] shadow-sm text-text-heading">Bike theft risks</div>
                                <div className="sticky-note p-2 bg-sticky-red text-[11px] shadow-sm text-text-heading">Unreliable public transport</div>
                            </div>

                            <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-48 segment-container p-3 bg-white/80 flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold text-xs uppercase text-primary">Customer Jobs</h4>
                                    <button className="text-primary hover:bg-primary/10 p-1 rounded-full">
                                        <span className="material-symbols-outlined text-sm">add</span>
                                    </button>
                                </div>
                                <div className="sticky-note p-2 bg-sticky-purple text-[11px] shadow-sm text-text-heading">Daily commute to office</div>
                                <div className="sticky-note p-2 bg-sticky-purple text-[11px] shadow-sm text-text-heading">Errands within 5km radius</div>
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-full border border-primary text-primary font-bold text-xs shadow-lg">
                                ECO-COMMUTER
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-4">
                    <h4 className="text-sm font-bold text-stroke uppercase tracking-wider">Canvas Collaborators</h4>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3 overflow-hidden">
                            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" alt="User avatar profile picture 1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjDU3ei9t-DZJY0_KKF-sOWVo1QmFBih6oin3xJmHkj6Fx8lXRnW0ihuu06MkCRZ4a_bPL1uGevFVArhrvtA-w2xNRPlWnF7t5DsgKQ4E2GqPSPaSEDX6FFuMW_EJI1eQJUc5N3t0hxwTxqSL4Rt_W3RRtk9wBrAbAiDaEmzz23Ibu3TtqDnmv-YmGNaj0fixwRWWU364UmIWmCZdcoXH7-yT8nbADcLyU1a7zsaA01ckVS5lKGj6925juYyY7Idhj_FsW84gVibjO" />
                            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" alt="User avatar profile picture 2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-B4YTUwqhQKxSIBVZtxREgzg_0RQMBJH2n9VYWcChoGLLsZRtlq-EPldorbPjL47_BHsKvsr2a8GoFjgKkmdqUgX5sgOAS9zO9QGMPn9C95KssQiLm-1zl4qtbJyrh1EwFcBwO5BezhA2WQyOUK5cjnOtY7nUvVCbfaU6vHcQwx8x7H5RJhCfXEywKxCATN_qM8f9F3-ckclqTqGJ30u8sZObNbZe8Z5yZtsy6X8RJ0F1XqbOrZGCwuGaDvKVtF9c6XPvwfMvqUOw" />
                            <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" alt="User avatar profile picture 3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADXUglSTgSveLdJAIF1LQxqJZByU2MMKOkcxnOsuJ9GiI8_KmbjKv3gHsbe341wHeXZDLO4urSSZrh-fH-I25NhAFJZLlFIZPmxxX_m-PIirD67cHUJy3EHOXmki4NPQyl09glriBb_jALt-7f7U8BOCUeNuHKl-cCIllYflX6_mza7kwyjuJ6eKcaklYGmk-p8AENfpVWgC8tpfp8B96Bv1DiwHtryebhi2ZIf0MgYtyluQA853R_JMqt7UKTOfP8jFGTNTO1Si5x" />
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 ring-2 ring-white text-xs font-medium text-text-heading">+4</div>
                        </div>
                        <button className="text-primary text-sm font-semibold hover:underline">Invite others to edit</button>
                        <div className="ml-auto flex items-center gap-2 text-sm text-stroke">
                            <span className="material-symbols-outlined text-[18px]">history</span>
                            <span>Last edited 3 minutes ago by Sarah J.</span>
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-8 right-8 bg-white shadow-2xl rounded-canvas p-4 border border-stroke/20 max-w-xs transition-all hover:scale-105 z-[60]">
                <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded p-1 flex">
                        <span className="material-symbols-outlined text-[20px]">help</span>
                    </div>
                    <div>
                        <p className="font-bold text-sm mb-1 text-text-heading">Methodology Tip</p>
                        <p className="text-xs text-stroke">Remember to match your <span className="font-bold text-primary">Pain Relievers</span> directly with the <span className="font-bold text-primary">Pains</span> identified in the stakeholder profile.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
