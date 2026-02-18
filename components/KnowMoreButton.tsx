'use client'

import { Button } from '@/components/ui/button'

export function KnowMoreButton() {
    const scrollToExecutiveSummary = () => {
        console.log("Button clicked")
        const element = document.getElementById('executive-summary')
        console.log("Element found:", element)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })

            // Add flash effect
            element.classList.add('bg-yellow-100', 'transition-colors', 'duration-500', 'dark:bg-yellow-900/30')
            setTimeout(() => {
                element.classList.remove('bg-yellow-100', 'transition-colors', 'duration-500', 'dark:bg-yellow-900/30')
            }, 2000)
        } else {
            console.error("Executive summary element not found!")
        }
    }

    return (
        <Button
            onClick={scrollToExecutiveSummary}
            className="w-full h-14 bg-primary text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
            Know more about proposed solution
        </Button>
    )
}
