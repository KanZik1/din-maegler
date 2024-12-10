'use client'

import { X } from 'lucide-react'
import Image from 'next/image'

interface FloorplanViewProps {
    onClose: () => void
    floorplanUrl: string
    onViewChange: (view: 'gallery' | 'floorplan' | 'map' | 'favorite') => void
    activeView: string
}

export function FloorplanView({ onClose, floorplanUrl, onViewChange, activeView }: FloorplanViewProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-4xl mx-4">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white hover:text-gray-300"
                >
                    <X className="w-6 h-6" />
                </button>
                
                {/* Plantegning */}
                <div className="relative w-full h-[600px]">
                    <Image
                        src={"/floorplanview.png"}
                        alt="Plantegning"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Navigation ikoner */}
                <div className="flex justify-center gap-10 mt-6">
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
            </div>
        </div>
    )
} 