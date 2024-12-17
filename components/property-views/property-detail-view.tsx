import type { Property } from '@/services/property'
import { PropertyDetailClientView } from './property-detail-client-view'

interface PropertyDetailViewProps {
    property: Property
}

export function PropertyDetailView({ property }: PropertyDetailViewProps) {
    return <PropertyDetailClientView property={property} />
}
