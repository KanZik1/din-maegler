'use client'

import { useState, useEffect } from 'react'
import { Search, Heart } from 'lucide-react'
import { PropertyCard } from '@/components/property-card'
import { properties } from '@/data/properties'

export function FavoriteButton({ propertyId }: { propertyId: string }) {
    const [mounted, setMounted] = useState(false)
    const [isFav, setIsFav] = useState(false)

    useEffect(() => {
        setMounted(true)
        setIsFav(isFavorite(propertyId))
    }, [propertyId])

    if (!mounted) return null

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault()
        toggleFavorite(propertyId)
        setIsFav(!isFav)
    }

    return (
        <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label={isFav ? 'Fjern fra favoritter' : 'Tilføj til favoritter'}
        >
            <Heart
                className={`w-5 h-5 ${isFav ? 'fill-current text-red-500' : 'text-gray-600'}`}
            />
        </button>
    )
}

export function FavoritesList() {
    const [mounted, setMounted] = useState(false)
    const [favoriteProperties, setFavoriteProperties] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        setMounted(true)
        const favorites = getFavorites()
        const favProperties = properties.filter(property =>
            favorites.includes(property.id)
        )
        setFavoriteProperties(favProperties)
    }, [])

    if (!mounted) {
        return null
    }

    const filteredProperties = favoriteProperties.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                    type="text"
                    placeholder="Søg i favoritter"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="space-y-6">
                {filteredProperties.map((property) => (
                    <div key={property.id} className="relative">
                        <PropertyCard {...property} />
                        <FavoriteButton propertyId={property.id} />
                    </div>
                ))}

                {filteredProperties.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">
                            {searchTerm ? 'Ingen favoritter matcher din søgning' : 'Du har ingen favoritboliger endnu'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
} 