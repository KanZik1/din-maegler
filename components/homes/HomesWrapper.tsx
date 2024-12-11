'use client'

import { useState, useEffect } from 'react'
import { getHomes, getHomesInPriceRange, getHomesByType, type Home } from '@/services/homes'
import { PropertyCard } from '../property-card'

interface HomesWrapperProps {
    initialHomes?: Home[]
    showFilters?: boolean
}

export function HomesWrapper({ initialHomes = [], showFilters = true }: HomesWrapperProps) {
    const [mounted, setMounted] = useState(false)
    const [homes, setHomes] = useState<Home[]>(initialHomes)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 })
    const [selectedType, setSelectedType] = useState<string>('')

    useEffect(() => {
        setMounted(true)
        fetchHomes()
    }, [])

    const fetchHomes = async () => {
        try {
            let data: Home[]
            if (selectedType) {
                data = await getHomesByType(selectedType)
            } else if (priceRange.min > 0 || priceRange.max < 10000000) {
                data = await getHomesInPriceRange(priceRange.min, priceRange.max)
            } else {
                data = await getHomes()
            }
            setHomes(data)
        } catch (err) {
            setError('Kunne ikke hente boliger')
        } finally {
            setLoading(false)
        }
    }

    if (!mounted) return null

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>
    }

    if (loading) {
        return <div className="text-center py-10">Indlæser boliger...</div>
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-12">
            {showFilters && (
                <div className="mb-8 flex gap-4">
                    <select
                        value={selectedType}
                        onChange={(e) => {
                            setSelectedType(e.target.value)
                            fetchHomes()
                        }}
                        className="border rounded-md p-2"
                    >
                        <option value="">Alle boligtyper</option>
                        <option value="Villa">Villa</option>
                        <option value="Lejlighed">Lejlighed</option>
                        <option value="Rækkehus">Rækkehus</option>
                    </select>

                    <div className="flex gap-2 items-center">
                        <input
                            type="number"
                            placeholder="Min pris"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                            className="border rounded-md p-2 w-32"
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max pris"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                            className="border rounded-md p-2 w-32"
                        />
                        <button
                            onClick={fetchHomes}
                            className="bg-primary text-white px-4 py-2 rounded-md"
                        >
                            Søg
                        </button>
                    </div>
                </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {homes.map((home) => (
                    <PropertyCard key={home.id} {...home} />
                ))}
            </div>
        </div>
    )
} 