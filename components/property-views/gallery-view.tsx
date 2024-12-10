'use client'

import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface GalleryViewProps {
    onClose: () => void
    images: { url: string; alt: string }[]
    onViewChange: (view: 'gallery' | 'floorplan' | 'map' | 'favorite') => void
    activeView: string
}

export function GalleryView({ onClose, images, onViewChange, activeView }: GalleryViewProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    if (!images || images.length === 0) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
                <div className="relative w-full max-w-6xl mx-4">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-gray-300"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="text-white text-center">
                        Ingen billeder tilgængelige
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-6xl mx-4">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-300"
                >
                    <X className="w-6 h-6" />
                </button>
                
                <div className="relative h-[600px] w-full">
                    <Image
                        src={images[currentIndex].url}
                        alt={images[currentIndex].alt}
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="flex justify-center gap-10 mt-6 mb-4">
                    <button 
                        onClick={() => onViewChange('gallery')}
                        className="flex items-center justify-center group"
                    >
                        <Image 
                            src="/icons/camera.png" 
                            alt="Se billeder" 
                            width={24} 
                            height={24} 
                            className={`opacity-40 group-hover:opacity-100 transition-opacity ${
                                activeView === 'gallery' ? 'opacity-100' : ''
                            }`}
                        />
                    </button>
                    <button 
                        onClick={() => onViewChange('floorplan')}
                        className="flex items-center justify-center group"
                    >
                        <Image 
                            src="/icons/floorplan.png" 
                            alt="Se plantegning" 
                            width={24} 
                            height={24} 
                            className={`opacity-40 group-hover:opacity-100 transition-opacity ${
                                activeView === 'floorplan' ? 'opacity-100' : ''
                            }`}
                        />
                    </button>
                    <button 
                        onClick={() => onViewChange('map')}
                        className="flex items-center justify-center group"
                    >
                        <Image 
                            src="/icons/location.png" 
                            alt="Se på kort" 
                            width={24} 
                            height={24} 
                            className={`opacity-40 group-hover:opacity-100 transition-opacity ${
                                activeView === 'map' ? 'opacity-100' : ''
                            }`}
                        />
                    </button>
                    <button 
                        onClick={() => onViewChange('favorite')}
                        className="flex items-center justify-center group"
                    >
                        <Image 
                            src="/icons/heart.png" 
                            alt="Tilføj til favoritter" 
                            width={24} 
                            height={24} 
                            className={`opacity-40 group-hover:opacity-100 transition-opacity ${
                                activeView === 'favorite' ? 'opacity-100' : ''
                            }`}
                        />
                    </button>
                </div>

                <div className="mt-4 grid grid-cols-6 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`relative h-20 ${currentIndex === index ? 'ring-2 ring-white' : ''}`}
                        >
                            <Image
                                src={image.url}
                                alt={image.alt}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
} 