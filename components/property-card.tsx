'use client'

import { Badge } from "./ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toggleFavorite, checkIsFavorite } from '@/services/favorites'
import { isAuthenticated } from '@/services/auth'
import { useRouter } from 'next/navigation'

interface PropertyImage {
    url: string
    alternativeText?: string
}

interface PropertyDetails {
    id: number
    title: string
    address: string
    type: string
    price: number
    rooms: number
    size: number
    energyLabel: string
    images?: PropertyImage[]
}

export function PropertyCard(props: PropertyDetails) {
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setMounted(true)
        async function checkFavoriteStatus() {
            if (isAuthenticated()) {
                const { isFavorite } = await checkIsFavorite(props.id)
                setIsFavorite(isFavorite)
            }
        }

        checkFavoriteStatus()
    }, [props.id])

    const handleFavoriteClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isAuthenticated()) {
            // Redirect til login hvis ikke logget ind
            window.location.href = '/login'
            return
        }

        setLoading(true)
        try {
            await toggleFavorite(props.id)
            setIsFavorite(!isFavorite)
        } catch (error) {
            console.error('Fejl ved favorit handling:', error)
        } finally {
            setLoading(false)
        }
    }

    // Sikker håndtering af billeder med fallbacks
    const defaultImage = '/placeholder.png'
    const imageUrl = props.images && props.images.length > 0 && props.images[0]?.url ? props.images[0].url : defaultImage
    const imageAlt = props.images && props.images.length > 0 && props.images[0]?.alternativeText
        ? props.images[0].alternativeText
        : `${props.type} på ${props.address}`

    if (!mounted) {
        return null
    }

    return (
        <Link href={`/boliger/${props.id}`} className="block group">
            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                <div className="relative h-48 w-full overflow-hidden">
                    <button
                        onClick={handleFavoriteClick}
                        className={`absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md 
                            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} 
                            transition-colors`}
                        disabled={loading}
                    >
                        <Heart
                            className={`w-5 h-5 ${isFavorite ? 'fill-current text-red-500' : 'text-gray-600'}`}
                        />
                    </button>
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{props.title}</h3>
                    <p className="text-sm text-gray-600">{props.address}</p>
                    <div className="mt-4 flex items-center gap-2">
                        <div>
                            <span className="font-semibold">{props.type}</span>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                        <Badge
                            variant={props.energyLabel === 'A' ? 'green' : 'default'}
                            className="flex items-center gap-1"
                        >
                            <span className="font-bold">{props.energyLabel}</span>
                            <span className="ml-1">
                                {props.rooms} værelser · {props.size} m²
                            </span>
                        </Badge>
                        <div className="ml-auto font-semibold">
                            Kr. {props.price.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

