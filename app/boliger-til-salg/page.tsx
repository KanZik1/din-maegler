import { getHomes } from '@/services/homes'
import { HomesClient } from '@/components/homes/HomesClient'
import Image from 'next/image'

export default async function BoligerTilSalgPage() {
    try {
        const initialHomes = await getHomes()
        
        return (
            <div className="min-h-screen bg-white">
                <div className="relative h-[300px] w-full">
                    <div className="absolute inset-0 bg-black/50 z-10" />
                    <Image
                        src="/kontakt-hero.jpg"
                        alt="Boliger til salg"
                        fill
                        className="object-cover"
                        priority
                    />
                    <h1 className="absolute z-20 text-white text-4xl font-bold text-center w-full top-1/2 transform -translate-y-1/2">
                        Boliger til salg
                    </h1>
                </div>

                <HomesClient initialHomes={initialHomes} />
            </div>
        )
    } catch (error) {
        console.error('Fejl ved hentning af boliger:', error)
        return <div>Der opstod en fejl ved hentning af boliger</div>
    }
} 