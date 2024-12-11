'use client'

import { useState, useEffect } from 'react'
import { getHomesInPriceRange, getHomesByType, type Home } from '@/services/homes'
import { PropertyCard } from '../property-card'

interface HomesClientProps {
    initialHomes: Home[]
}

export function HomesClient({ initialHomes }: HomesClientProps) {
    const [mounted, setMounted] = useState(false)
    const [homes, setHomes] = useState<Home[]>(initialHomes)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 })
    const [selectedType, setSelectedType] = useState<string>('')

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleFilter = async () => {
        setLoading(true)
        setError(null)
        try {
            let filteredHomes: Home[]
            if (selectedType) {
                filteredHomes = await getHomesByType(selectedType)
            } else if (priceRange.min > 0 || priceRange.max < 10000000) {
                filteredHomes = await getHomesInPriceRange(priceRange.min, priceRange.max)
            } else {
                filteredHomes = initialHomes
            }
            setHomes(filteredHomes)
        } catch (err) {
            setError('Kunne ikke filtrere boliger')
        } finally {
            setLoading(false)
        }
    }

    if (!mounted) {
        // Return server-rendered version
        return (
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    {initialHomes.map((home) => (
                        <PropertyCard key={home.id} {...home} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="mb-8 flex gap-4 flex-wrap">
                <select
                    value={selectedType}
                    onChange={(e) => {
                        setSelectedType(e.target.value)
                        handleFilter()
                    }}
                    className="border rounded-md p-2"
                >
                    <option value="">Alle boligtyper</option>
                    <option value="Villa">Villa</option>
                    <option value="Lejlighed">Lejlighed</option>
                    <option value="Rækkehus">Rækkehus</option>
                </select>

                <div className="flex gap-2 items-center flex-wrap">
                    <input
                        type="number"
                        placeholder="Min pris"
                        value={priceRange.min || ''}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                        className="border rounded-md p-2 w-32"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        placeholder="Max pris"
                        value={priceRange.max || ''}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                        className="border rounded-md p-2 w-32"
                    />
                    <button
                        onClick={handleFilter}
                        className="bg-primary text-white px-4 py-2 rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Søger...' : 'Søg'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="text-red-600 mb-4">{error}</div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {homes.map((home) => (
                    <PropertyCard key={home.id} {...home} />
                ))}
            </div>
        </div>
    )
} 