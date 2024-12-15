import FeaturesSection from '@/components/feature-section'
import Hero from '@/components/hero'
import { PropertyGrid } from '@/components/property-grid'
import StatsSection from '@/components/stats-section'
import NewsletterSection from '@/components/newsletter-section'
import TeamSection from '@/components/team-section'
import AppDownload from '@/components/AppDownload'

export default function Home() {
    return (
        <main>
            <Hero />
            <StatsSection />
            <FeaturesSection />
            <PropertyGrid limit={4} />
            <NewsletterSection />
            <TeamSection />
            <AppDownload />
        </main>
    )
}

