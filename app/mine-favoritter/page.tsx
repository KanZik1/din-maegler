'use client'

import { useEffect, useState } from 'react'
import { FavoritePropertyCard } from '@/components/favorite-property-card'
import { getFavorites } from '@/services/favorites'
import Image from 'next/image'
import FavoritesList from './favorites-list'

interface Property {
    id: number
    title: string
    address: string
    type: string
    price: number
    size: number
    rooms: number
    images: { url: string; alternativeText?: string }[]
}

export default function FavoritesPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero sektion */}
            <div className="relative h-[300px] w-full">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <Image
                    src="/Herobanner.png"
                    alt="Favoritboliger hero billede - oversigt over dine gemte boliger"
                    fill
                    className="object-cover"
                />
                <h1 className="absolute z-20 text-white text-4xl font-bold text-center w-full top-1/2 transform -translate-y-1/2">
                    Mine favoritboliger
                </h1>
            </div>

            {/* Client component wrapper */}
            <div className="container mx-auto px-4 py-8">
                <FavoritesList />
            </div>
        </div>
    )
} 