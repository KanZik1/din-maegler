'use client'

import Image from "next/image"
import { toggleFavorite } from '@/services/favorites'

interface FavoritePropertyCardProps {
    id: string
    title: string
    address: string
    type: string
    price: number
    rooms: number
    squareMeters: number
    imageUrl: string
    onRemove?: () => void
}

export function FavoritePropertyCard(props: FavoritePropertyCardProps) {
    const handleRemove = async (e: React.MouseEvent) => {
        e.preventDefault()
        try {
            await toggleFavorite(props.id)
            props.onRemove?.()
        } catch (error) {
            console.error('Fejl ved fjernelse af favorit:', error)
        }
    }

    return (
        <div className="flex items-center justify-between bg-white p-4 border rounded-lg">
            {/* Venstre side med billede */}
            <div className="flex items-center gap-6">
                <div className="relative w-[200px] h-[150px]">
                    <Image
                        src={props.imageUrl}
                        alt={props.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
                
                {/* Bolig information */}
                <div>
                    <h3 className="text-xl font-semibold">{props.title}</h3>
                    <p className="text-gray-500 mt-1">{props.address}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span>{props.type}</span>
                        <span className="text-gray-500">• Ejerudgift: 4.567 kr.</span>
                    </div>
                </div>
            </div>

            {/* Højre side */}
            <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-2">
                    <span className="bg-green-500 text-white px-2 py-1 rounded">A</span>
                    <span>{props.rooms} værelser • {props.squareMeters} m²</span>
                </div>
                <div className="text-xl font-semibold">
                    Kr. {props.price.toLocaleString('da-DK')}
                </div>
                <button
                    onClick={handleRemove}
                    className="bg-[#162A41] text-white px-6 py-2 rounded hover:bg-[#2C4460] transition-colors"
                >
                    Fjern fra favoritter
                </button>
            </div>
        </div>
    )
} 