'use client'

import { useState, useEffect, useCallback } from 'react'
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
    const [priceRange, setPriceRange] = useState(12000000)
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
            } else if (priceRange > 0) {
                filteredHomes = await getHomesInPriceRange(0, priceRange)
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

    const handlePriceChange = useCallback(async (value: number) => {
        setLoading(true)
        try {
            if (value >= 12000000) {
                setHomes(initialHomes)
            } else {
                const filteredHomes = initialHomes.filter(home => home.price <= value)
                setHomes(filteredHomes)
            }
        } catch (err) {
            setError('Kunne ikke filtrere boliger')
        } finally {
            setLoading(false)
        }
    }, [initialHomes])

    if (!mounted) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    {initialHomes.map((home) => (
                        <PropertyCard
                            key={home.id}
                            id={home.id.toString()}
                            title={home.title}
                            address={home.address}
                            type={home.type}
                            price={home.price}
                            rooms={home.rooms}
                            squareMeters={home.size}
                            energyLabel={home.energyLabel}
                            imageUrl={home.images?.[0]?.url || '/placeholder.png'}
                        />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-12">
            <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Søg efter dit drømmehus</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ejendomstype
                        </label>
                        <select
                            value={selectedType}
                            onChange={(e) => {
                                setSelectedType(e.target.value)
                                handleFilter()
                            }}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Alle ejendomstyper</option>
                            <option value="Villa">Villa</option>
                            <option value="Lejlighed">Lejlighed</option>
                            <option value="Rækkehus">Rækkehus</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pris: Op til {priceRange.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} kr
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="12000000"
                            step="100000"
                            value={priceRange}
                            onChange={(e) => {
                                const value = Number(e.target.value)
                                setPriceRange(value)
                                handlePriceChange(value)
                            }}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                                [&::-webkit-slider-thumb]:appearance-none 
                                [&::-webkit-slider-thumb]:h-4 
                                [&::-webkit-slider-thumb]:w-4 
                                [&::-webkit-slider-thumb]:rounded-full 
                                [&::-webkit-slider-thumb]:bg-[#162A41] 
                                [&::-webkit-slider-thumb]:cursor-pointer
                                [&::-moz-range-thumb]:h-4 
                                [&::-moz-range-thumb]:w-4 
                                [&::-moz-range-thumb]:rounded-full 
                                [&::-moz-range-thumb]:bg-[#162A41] 
                                [&::-moz-range-thumb]:border-0
                                [&::-moz-range-track]:bg-gray-200 
                                [&::-moz-range-track]:rounded-lg"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span>{0..toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} kr</span>
                            <span>{12000000..toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} kr</span>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="text-red-600 mb-4">{error}</div>
            )}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {homes.map((home) => (
                    <PropertyCard
                        key={home.id}
                        id={home.id.toString()}
                        title={home.title}
                        address={home.address}
                        type={home.type}
                        price={home.price}
                        rooms={home.rooms}
                        squareMeters={home.size}
                        energyLabel={home.energyLabel}
                        imageUrl={home.images?.[0]?.url || '/placeholder.png'}
                    />
                ))}
            </div>
        </div>
    )
} 