import { getProperty, validateProperty } from '@/services/property'
import { PropertyDetailView } from '@/components/property-views/property-detail-view'
import { notFound } from 'next/navigation'

interface PageProps {
    params: {
        id: string
    }
}

export default async function BoligPage({ params }: PageProps) {
    try {
        const property = await getProperty(params.id)
        if (!validateProperty(property)) {
            return notFound()
        }

        return <PropertyDetailView property={property} />
    } catch (error) {
        console.error('Fejl ved hentning af bolig:', error)
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Der opstod en fejl
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Kunne ikke hente boligen. Prøv venligst igen senere.
                    </p>
                </div>
            </div>
        )
    }
} 