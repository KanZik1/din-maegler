import { getProperties } from '@/services/property'
import { HomesClient } from '@/components/homes/HomesClient'
import Image from 'next/image'

export default async function BoligerTilSalgPage() {
    try {
        const initialHomes = await getProperties()
        
        return (
            <div className="min-h-screen bg-white">
                <div className="relative h-[300px] w-full">
                    <Image
                        src="/Herobanner.png"
                        alt="Boliger til salg hero billede"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <h1 className="text-4xl font-bold text-white">
                            Boliger til salg
                        </h1>
                    </div>
                </div>

                <HomesClient initialHomes={initialHomes} />
            </div>
        )
    } catch (error) {
        console.error('Fejl ved hentning af boliger:', error)
        return <div>Der opstod en fejl ved hentning af boliger</div>
    }
} 