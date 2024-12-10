import FeaturesSection from '@/components/feature-section'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Navigation from '@/components/navigation'
import { PropertyGrid } from '@/components/property-grid'
import StatsSection from '@/components/stats-section'
import NewsletterSection from '@/components/newsletter-section'
import TeamSection from '@/components/team-section'
import AppDownload from '@/components/AppDownload'
import Footer from '@/components/Footer'
export default function Home() {
  return (
    <main>

      <Header />
      <Navigation />
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <PropertyGrid limit={4} />
      <NewsletterSection />
      <TeamSection />
      <AppDownload />
      <Footer />
    </main>
  )
}

