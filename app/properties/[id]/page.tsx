import { PropertyDetailView } from '@/components/property-views/property-detail-view'

interface PageProps {
    params: {
        id: string
    }
}

export default async function PropertyPage({ params }: PageProps) {
    const response = await fetch(`https://dinmaegler.onrender.com/homes/${params.id}`)
    const property = await response.json()

    return <PropertyDetailView property={property} />
} 