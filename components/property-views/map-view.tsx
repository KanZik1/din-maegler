'use client'

import { X } from 'lucide-react'

interface MapViewProps {
    onClose: () => void
    address: string
    coordinates?: { lat: number; lng: number }
}

export function MapView({ onClose, address, coordinates }: MapViewProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-4xl mx-4">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-300"
                >
                    <X className="w-6 h-6" />
                </button>
                <div className="h-[600px] w-full bg-gray-100">
                    {/* Her skal implementeres Google Maps eller lignende */}
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}`}
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    )
} 