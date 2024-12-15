'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { toggleFavorite, checkIsFavorite } from '@/services/favorites'
import { isAuthenticated } from '@/services/auth'

export function FavoriteButton({ propertyId }: { propertyId: string }) {
    const [mounted, setMounted] = useState(false)
    const [isFav, setIsFav] = useState(false)

    useEffect(() => {
        setMounted(true)
        async function checkFavorite() {
            if (isAuthenticated()) {
                const { isFavorite } = await checkIsFavorite(parseInt(propertyId))
                setIsFav(isFavorite)
            }
        }
        checkFavorite()
    }, [propertyId])

    if (!mounted) return null

    const handleFavoriteClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (!isAuthenticated()) {
            window.location.href = '/login'
            return
        }

        try {
            await toggleFavorite(parseInt(propertyId))
            setIsFav(!isFav)
        } catch (error) {
            console.error('Fejl ved håndtering af favorit:', error)
        }
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