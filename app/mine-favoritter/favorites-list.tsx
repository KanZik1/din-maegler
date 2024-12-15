'use client'

import { useEffect, useState } from 'react'
import { getFavorites } from '@/services/favorites'
import { getHome } from '@/services/homes'
import { PropertyCard } from '@/components/property-card'
import { isAuthenticated } from '@/services/auth'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function FavoritesList() {
    const [properties, setProperties] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    useEffect(() => {
        async function fetchFavorites() {
            if (!isAuthenticated()) {
                router.push('/login')
                return
            }

            try {
                setLoading(true)
                setError(null)
                const favoriteIds = await getFavorites()
                console.log('Hentede favorit IDs:', favoriteIds)

                const favoriteProperties = await Promise.all(
                    favoriteIds.map(async (id) => {
                        try {
                            return await getHome(id)
                        } catch (error) {
                            console.error(`Kunne ikke hente bolig med id ${id}:`, error)
                            return null
                        }
                    })
                )

                const validProperties = favoriteProperties.filter(Boolean)
                setProperties(validProperties)
            } catch (error) {
                console.error('Fejl ved hentning af favoritter:', error)
                setError('Der opstod en fejl ved hentning af dine favoritter')
            } finally {
                setLoading(false)
            }
        }

        fetchFavorites()
    }, [router])

    const filteredProperties = properties.filter(property => {
        if (!property) return false
        const title = property.title || ''
        const address = property.address || ''
        const searchTermLower = searchTerm.toLowerCase()
        return title.toLowerCase().includes(searchTermLower) ||
            address.toLowerCase().includes(searchTermLower)
    })

    if (loading) {
        return <div className="text-center py-8">Indlæser favoritter...</div>
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Søg i favoritter"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {filteredProperties.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600">
                        {searchTerm
                            ? 'Ingen favoritter matcher din søgning'
                            : 'Du har ingen favoritboliger endnu'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {filteredProperties.map((property) => (
                        <div key={property.id} className="flex flex-col h-full">
                            <PropertyCard {...property} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}