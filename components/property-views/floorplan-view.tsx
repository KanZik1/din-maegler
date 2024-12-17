'use client'

import Image from 'next/image'
import { X } from 'lucide-react'

interface FloorplanViewProps {
    floorplanUrl: string
    onClose: () => void
    onViewChange: (view: 'gallery' | 'floorplan' | 'map' | null) => void
    activeView: 'gallery' | 'floorplan' | 'map' | null
}

const DEFAULT_FLOORPLAN = '/floorplanview.png'

export function FloorplanView({ floorplanUrl, onClose }: FloorplanViewProps) {
    const imageUrl = floorplanUrl || DEFAULT_FLOORPLAN

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
            <div className="relative min-h-screen">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white p-2 hover:bg-gray-800 rounded-full"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="container mx-auto px-4 py-16">
                    <div className="relative h-[600px] w-full">
                        <Image
                            src={imageUrl}
                            alt="Plantegning"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
} 