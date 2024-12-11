'use client'

import { useEffect, useState } from 'react'
import { PropertyCard } from "./property-card"
import { getHomes } from '@/services/homes'
import type { Home } from '@/services/homes'

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
    const [mounted, setMounted] = useState(false)
    const [homes, setHomes] = useState<Home[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setMounted(true)
        const fetchHomes = async () => {
            try {
                const data = await getHomes()
                setHomes(data)
            } catch (error) {
                setError('Kunne ikke hente boliger')
            } finally {
                setLoading(false)
            }
        }

        fetchHomes()
    }, [])

    if (!mounted) return null

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>
    }

    if (loading) {
        return <div className="text-center py-10">Indlæser boliger...</div>
    }

    const displayHomes = limit ? homes.slice(0, limit) : homes

    return (
        <div className="mx-auto max-w-7xl px-4 py-12">
            {showTitle && (
                <div className="text-center">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="mt-2 text-gray-600">
                        {description}
                    </p>
                </div>
            )}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {displayHomes.map((home) => (
                    <PropertyCard key={home.id} {...home} />
                ))}
            </div>
            <div className="mt-12 text-center">
                <button className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
                    Se alle boliger
                </button>
            </div>
        </div>
    )
}

