'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Mail, Linkedin, Share2, Heart, FileText, MapPin, X } from 'lucide-react'
import { use } from 'react'
import { GalleryView } from '@/components/property-views/gallery-view'
import { FloorplanView } from '@/components/property-views/floorplan-view'
import { MapView } from '@/components/property-views/map-view'

interface PropertyDetails {
    id: string
    title: string
    address: string
    price: number
    type: string
    energyLabel: string
    images: { url: string; alt: string }[]
    floorplanUrl: string
    details: {
        size: number
        rooms: number
        built: number
        propertySize: number
        basement: number
        energyRating: string
    }
    description: string
    agent: {
        name: string
        title: string
        phone: string
        email: string
        image: string
    }
}

type ViewType = 'gallery' | 'floorplan' | 'map' | 'favorite' | null;

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params)
    const [property, setProperty] = useState<PropertyDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeView, setActiveView] = useState<ViewType>(null)

    useEffect(() => {
        setProperty({
            id: resolvedParams.id,
            title: "Klosterengen 234",
            address: "4000 Roskilde",
            price: 4567890,
            type: "Villa",
            energyLabel: "A",
            images: [
                { 
                    url: "/House1.png", 
                    alt: "Forsidebillede af Klosterengen 234" 
                },
                { 
                    url: "/House2.png", 
                    alt: "Stue" 
                },
                { 
                    url: "/House3.png", 
                    alt: "Køkken" 
                },
                { 
                    url: "/House4.png", 
                    alt: "Have" 
                }
            ],
            floorplanUrl: "/floorplan.png",
            details: {
                size: 156,
                rooms: 4,
                built: 1998,
                propertySize: 1012,
                basement: 0,
                energyRating: "A"
            },
            description: "It is a long established fact...",
            agent: {
                name: "Peter Sørensen",
                title: "Ejendomsmægler MDE",
                phone: "+45 7070 4012",
                email: "peter@dinmaegler.com",
                image: "/agent1.jpg"
            }
        })
        setLoading(false)
    }, [resolvedParams.id])

    const handleViewChange = (view: ViewType) => {
        if (activeView === view) {
            setActiveView(null) // Luk view hvis det allerede er aktivt
        } else {
            setActiveView(view)
        }
    }

    const renderActiveView = () => {
        switch (activeView) {
            case 'gallery':
                return (
                    <GalleryView 
                        images={property?.images || []}
                        onClose={() => setActiveView(null)}
                        onViewChange={handleViewChange}
                        activeView={activeView || 'gallery'}
                    />
                )
            case 'floorplan':
                return (
                    <FloorplanView
                        floorplanUrl={property?.floorplanUrl || ''}
                        onClose={() => setActiveView(null)}
                        onViewChange={handleViewChange}
                        activeView={activeView || 'floorplan'}
                    />
                )
            case 'map':
                return (
                    <MapView
                        address={property?.address || ''}
                        onClose={() => setActiveView(null)}
                    />
                )
            case 'favorite':
                // Håndter favorit funktionalitet her
                return null
            default:
                return null
        }
    }

    if (loading || !property) {
        return <div className="text-center py-10">Indlæser...</div>
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero billede */}
            <div className="relative h-[500px] w-full">
                <Image
                    src="/House1.png"
                    alt={property.title}
                    fill
                    className="object-cover"
                />
                {/* Share og favorit knapper */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white p-2 rounded-full shadow-lg">
                        <Share2 className="w-6 h-6" />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-lg">
                        <Heart className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Hoved indhold container */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Top sektion med titel, ikoner og pris */}
                <div className="flex items-start justify-between py-6 border-b border-gray-200">
                    {/* Venstre side - Titel og adresse */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-semibold text-[#162A41]">{property.title}</h1>
                        <p className="text-gray-400 mt-1">{property.address}</p>
                    </div>
                    
                    {/* Midten - Ikoner */}
                    <div className="flex-grow flex justify-center">
                        <div className="flex items-center gap-10 mx-8">
                            <button 
                                onClick={() => handleViewChange('gallery')}
                                className="flex items-center justify-center group"
                            >
                                <Image src="/icons/camera.png" alt="Se billeder" width={24} height={24} 
                                    className={`opacity-40 group-hover:opacity-100 transition-opacity ${activeView === 'gallery' ? 'opacity-100' : ''}`}
                                />
                            </button>
                            <button 
                                onClick={() => handleViewChange('floorplan')}
                                className="flex items-center justify-center group"
                            >
                                <Image src="/icons/floorplan.png" alt="Se plantegning" width={24} height={24} 
                                    className={`opacity-40 group-hover:opacity-100 transition-opacity ${activeView === 'floorplan' ? 'opacity-100' : ''}`}
                                />
                            </button>
                            <button 
                                onClick={() => handleViewChange('map')}
                                className="flex items-center justify-center group"
                            >
                                <Image src="/icons/location.png" alt="Se på kort" width={24} height={24} 
                                    className={`opacity-40 group-hover:opacity-100 transition-opacity ${activeView === 'map' ? 'opacity-100' : ''}`}
                                />
                            </button>
                            <button 
                                onClick={() => handleViewChange('heart')}
                                className="flex items-center justify-center group"
                            >
                                <Image src="/icons/heart.png" alt="Tilføj til favoritter" width={24} height={24} 
                                    className={`opacity-40 group-hover:opacity-100 transition-opacity ${activeView === 'heart' ? 'opacity-100' : ''}`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Højre side - Pris */}
                    <div className="flex-shrink-0">
                        <h2 className="text-2xl font-semibold text-[#162A41]">
                            Kr. {property.price.toLocaleString()}
                        </h2>
                    </div>
                </div>

                {/* Hoved grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Venstre side - Detaljer og beskrivelse */}
                    <div className="lg:col-span-2">
                        {/* Detalje bokse */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-[#F8F8F8] p-6 rounded">
                                <h3 className="text-sm text-gray-400">Boligareal</h3>
                                <p className="text-xl font-semibold mt-2">{property.details.size} m²</p>
                            </div>
                            <div className="bg-[#F8F8F8] p-6 rounded">
                                <h3 className="text-sm text-gray-400">Grundareal</h3>
                                <p className="text-xl font-semibold mt-2">{property.details.propertySize} m²</p>
                            </div>
                            <div className="bg-[#F8F8F8] p-6 rounded">
                                <h3 className="text-sm text-gray-400">Værelser</h3>
                                <p className="text-xl font-semibold mt-2">{property.details.rooms}</p>
                            </div>
                            <div className="bg-[#F8F8F8] p-6 rounded">
                                <h3 className="text-sm text-gray-400">Energimærke</h3>
                                <p className="text-xl font-semibold mt-2">{property.details.energyRating}</p>
                            </div>
                        </div>

                        {/* Beskrivelse sektion */}
                        <div className="mt-12">
                            <h2 className="text-xl text-[#162A41] mb-6">Beskrivelse</h2>
                            <p className="text-gray-600 leading-relaxed">{property.description}</p>
                        </div>
                    </div>

                    {/* Højre kolonne - Pris og mægler info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="p-6">
                                {/* Pris */}
                                <h2 className="text-2xl font-semibold text-[#162A41]">
                                    Kr. {property.price.toLocaleString()}
                                </h2>
                                
                                {/* Mægler sektion */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-4">Ansvarlig mægler</h3>
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={property.agent.image}
                                            alt={property.agent.name}
                                            width={80}
                                            height={80}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <p className="font-semibold">{property.agent.name}</p>
                                            <p className="text-sm text-gray-600">{property.agent.title}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <a href={`tel:${property.agent.phone}`} className="block text-blue-600">
                                            {property.agent.phone}
                                        </a>
                                        <a href={`mailto:${property.agent.email}`} className="block text-blue-600">
                                            {property.agent.email}
                                        </a>
                                    </div>
                                    <div className="flex gap-4 mt-4">
                                        <a href={`mailto:${property.agent.email}`} className="text-gray-400 hover:text-gray-600">
                                            <Mail size={20} />
                                        </a>
                                        <a href="#" className="text-gray-400 hover:text-gray-600">
                                            <Linkedin size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {renderActiveView()}
        </div>
    )
} 