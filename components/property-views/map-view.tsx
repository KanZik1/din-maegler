'use client'

import { X } from 'lucide-react'

interface MapViewProps {
    address: string
    onClose: () => void
    onViewChange: (view: 'gallery' | 'floorplan' | 'map' | null) => void
    activeView: 'gallery' | 'floorplan' | 'map' | null
}

export function MapView({ address, onClose }: MapViewProps) {
    // Encode adressen til brug i Google Maps URL
    const encodedAddress = encodeURIComponent(address)
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`

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
                    <iframe
                        width="100%"
                        height="600"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={mapUrl}
                        allowFullScreen
                        title={`Kort over ${address}`}
                    />
                </div>
            </div>
        </div>
    )
} 