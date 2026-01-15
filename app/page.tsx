import { LandingHeader } from "@/components/layout/LandingHeader"
import { HeroSearch } from "@/components/home/HeroSearch"
import { LandingFooter } from "@/components/layout/LandingFooter"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <LandingHeader />
      <HeroSearch />
      <LandingFooter />
    </div>
  )
}
