"use client"

import dynamic from 'next/dynamic'
import { StakeholderProfile } from "@/types"

const StakeholderMap = dynamic(() => import('./StakeholderMap'), {
    loading: () => <div className="h-[600px] w-full bg-muted animate-pulse rounded-lg" />,
    ssr: false
})

interface StakeholderMapWrapperProps {
    stakeholders: StakeholderProfile[]
}

export default function StakeholderMapWrapper({ stakeholders }: StakeholderMapWrapperProps) {
    return <StakeholderMap stakeholders={stakeholders} />
}
