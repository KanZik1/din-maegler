'use client'

import { useEffect, useState } from 'react'
import { PropertyCard } from "./property-card"
import { getProperties } from '@/services/property'
import type { Property } from '@/services/property'

interface PropertyGridProps {
    limit?: number
    showTitle?: boolean
    title?: string
    description?: string
}

export function PropertyGrid({
    limit = 4,
    showTitle = true,
    title = "Udvalgte Boliger",
    description = "There are many variations of passages of Lorem Ipsum available but the in majority have suffered alteration in some"
}: PropertyGridProps) {
    const [properties, setProperties] = useState<Property[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true)
                const data = await getProperties()
                // Tilføj base URL til billeder hvis nødvendigt
                const propertiesWithImages = data.map(property => ({
                    ...property,
                    images: property.images?.map(img => ({
                        ...img,
                        url: img.url?.startsWith('http') 
                            ? img.url 
                            : `https://dinmaegler.onrender.com${img.url}`
                    }))
                }))
                setProperties(propertiesWithImages)
            } catch (err) {
                setError('Kunne ikke hente boliger')
                console.error('Fejl ved hentning af boliger:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProperties()
    }, [])

    if (loading) {
        return <div className="text-center py-10">Indlæser boliger...</div>
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>
    }

    const displayProperties = limit ? properties.slice(0, limit) : properties

    return (
        <div className="container mx-auto px-4 py-16">
            {showTitle && (
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-semibold mb-4">{title}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {displayProperties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        id={property.id}
                        title={property.title}
                        address={property.address}
                        type={property.type}
                        price={property.price}
                        rooms={property.rooms}
                        squareMeters={property.size}
                        energyLabel={property.energyLabel}
                        images={property.images}
                    />
                ))}
            </div>
        </div>
    )
}

