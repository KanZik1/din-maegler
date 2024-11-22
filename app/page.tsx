import FeaturesSection from '@/components/feature-section'
import Header from '@/components/header'
import Hero from '@/components/hero'
import Navigation from '@/components/navigation'
import StatsSection from '@/components/stats-section'

export default function Home() {
  return (
    <main>

      <Header />
      <Navigation />
      <Hero />
      <StatsSection />
      <FeaturesSection />
    </main>
  )
}

