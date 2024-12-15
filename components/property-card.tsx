'use client'

import { Badge } from "./ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { toggleFavorite, checkIsFavorite } from '@/services/favorites'
import { isAuthenticated } from '@/services/auth'

interface PropertyCardProps {
    id: string
    title: string
    address: string
    type: string
    price: number
    rooms: number
    squareMeters: number
    energyLabel: string
    imageUrl: string
}

export function PropertyCard(props: PropertyCardProps) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleFavoriteClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isAuthenticated()) {
            window.location.href = '/login'
            return
        }

        setLoading(true)
        try {
            await toggleFavorite(props.id)
            const { isFavorite: newStatus } = await checkIsFavorite(props.id)
            setIsFavorite(newStatus)
        } catch (error) {
            console.error('Fejl ved favorit handling:', error)
        } finally {
            setLoading(false)
        }
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
                        src={props.imageUrl}
                        alt={`${props.type} på ${props.address}`}
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
                                {props.rooms} værelser · {props.squareMeters} m²
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

