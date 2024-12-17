'use client'

import Image from 'next/image'
import { X } from 'lucide-react'
import { getValidImageUrl } from '@/services/property'

interface GalleryViewProps {
    images: Array<{
        url: string | null
        alt: string
    }>
    onClose: () => void
    onViewChange: (view: 'gallery' | 'floorplan' | 'map' | null) => void
    activeView: 'gallery' | 'floorplan' | 'map' | null
}

const DEFAULT_IMAGE = '/placeholder.png'

export function GalleryView({ images, onClose, onViewChange, activeView }: GalleryViewProps) {
    // Validerer alle billeder i galleriet og fjerner ugyldige billeder
    const validImages = images
        .map(img => ({
            url: img.url || DEFAULT_IMAGE,
            alt: img.alt || 'Bolig billede'
        }))
        .filter(img => img.url && img.url !== "")  // Fjern tomme URLs

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {validImages.map((image, index) => (
                            <div key={index} className="relative aspect-[4/3]">
                                <Image
                                    src={image.url}
                                    alt={image.alt}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 