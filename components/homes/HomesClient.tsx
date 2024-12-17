'use client'

import { useState, useEffect } from 'react'
import { PropertyCard } from '../property-card'
import type { Property } from '@/services/property'

interface HomesClientProps {
    initialHomes: Property[]
}

export function HomesClient({ initialHomes }: HomesClientProps) {
    const [properties, setProperties] = useState<Property[]>(initialHomes)
    const [priceRange, setPriceRange] = useState(12000000)
    const [selectedType, setSelectedType] = useState<string>('all')
    const [loading, setLoading] = useState(false)

    const filterProperties = () => {
        let filtered = [...initialHomes]

        // Filtrer efter pris
        filtered = filtered.filter(property => property.price <= priceRange)

        // Filtrer efter type hvis en specifik type er valgt
        if (selectedType !== 'all') {
            filtered = filtered.filter(property => property.type === selectedType)
        }

        setProperties(filtered)
    }

    useEffect(() => {
        filterProperties()
    }, [priceRange, selectedType])

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Filter sektion */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Søg efter dit drømmehus</h2>
                
                {/* Ejendomstype dropdown */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ejendomstype
                    </label>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="all">Alle ejendomstyper</option>
                        <option value="Villa">Villa</option>
                        <option value="Rækkehus">Rækkehus</option>
                        <option value="Ejerlejlighed">Ejerlejlighed</option>
                    </select>
                </div>

                {/* Pris-interval slider */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pris-interval
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="12000000"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>0 kr</span>
                        <span>Op til {priceRange.toLocaleString('da-DK')} kr</span>
                    </div>
                </div>
            </div>

            {/* Properties grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property) => (
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
                        area={`${property.price.toLocaleString('da-DK')} kr.`}
                    />
                ))}
            </div>

            {loading && (
                <div className="text-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
            )}
        </div>
    )
} 