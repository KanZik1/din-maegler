'use client'

import { useEffect, useState, use } from 'react'
import Image from 'next/image'
import { Mail, Phone, MapPin, Heart, Instagram, Linkedin, Search } from 'lucide-react'
import { getAgent } from '@/services/agents'

interface Agent {
    id: number
    name: string
    title: string
    phone: string
    email: string
    image: {
        url: string
        formats: {
            thumbnail: {
                url: string
            }
        }
    }
    description?: string
}

export default function AgentPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params)
    const [agent, setAgent] = useState<Agent | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const data = await getAgent(resolvedParams.id)
                setAgent(data)
            } catch (error) {
                console.error('Fejl ved hentning af mægler:', error)
                setError('Kunne ikke hente mægler information')
            } finally {
                setLoading(false)
            }
        }

        fetchAgent()
    }, [resolvedParams.id])

    if (loading) return <div className="text-center py-10">Indlæser...</div>
    if (error) return <div className="text-center py-10 text-red-600">{error}</div>
    if (!agent) return <div className="text-center py-10">Mægler ikke fundet</div>

    return (
        <div className="min-h-screen bg-white">
            {/* Hero sektion */}
            <div className="relative h-[300px] w-full">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <Image
                    src="/kontakt-hero.jpg"
                    alt="Kontakt os hero"
                    fill
                    className="object-cover"
                />
                <h1 className="absolute z-20 text-white text-4xl font-bold text-center w-full top-1/2 transform -translate-y-1/2">
                    Kontakt en medarbejder
                </h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Venstre side */}
                    <div className="lg:col-span-2">
                        {/* Mægler info sektion */}
                        <div className="border rounded-lg p-8 mb-12">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="relative aspect-square md:aspect-[4/3]">
                                    <Image
                                        src={agent.image.url}
                                        alt={agent.name}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-2xl font-semibold text-[#162A41]">{agent.name}</h2>
                                            <p className="text-gray-600">{agent.title}</p>
                                        </div>
                                        <button className="text-blue-600">
                                            <Heart className="w-6 h-6" />
                                        </button>
                                    </div>
                                    
                                    <div className="mt-8 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <Phone className="text-[#162A41] w-5 h-5" />
                                            <p className="text-gray-600">{agent.phone}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Mail className="text-[#162A41] w-5 h-5" />
                                            <p className="text-gray-600">{agent.email}</p>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="font-semibold mb-4">Om {agent.name}</h3>
                                        <p className="text-gray-600">
                                            {agent.description || 'Ingen beskrivelse tilgængelig'}
                                        </p>
                                    </div>

                                    <div className="mt-8 flex gap-4">
                                        <a href="#" className="text-gray-400 hover:text-[#162A41]">
                                            <Instagram className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="text-gray-400 hover:text-[#162A41]">
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kontaktformular */}
                        <div className="border rounded-lg p-8">
                            <h2 className="text-xl font-semibold text-[#162A41] mb-6 border-b pb-4">
                                Kontakt {agent.name}
                            </h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm mb-2">
                                            Navn
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-200 rounded"
                                            placeholder="Indtast navn"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-4 py-2 border border-gray-200 rounded"
                                            placeholder="Indtast email"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">
                                        Emne
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-200 rounded"
                                        placeholder="Hvad drejer din henvendelse sig om?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">
                                        Besked
                                    </label>
                                    <textarea
                                        rows={6}
                                        className="w-full px-4 py-2 border border-gray-200 rounded resize-none"
                                        placeholder="Skriv din besked her..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-[#162A41] text-white px-8 py-2 rounded text-sm hover:bg-[#2C4460] transition-colors"
                                >
                                    Send besked
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Højre side */}
                    <div className="space-y-8">
                        {/* Søgefelt */}
                        <div className="bg-[#F8F8F8] p-6 rounded-lg">
                            <h3 className="text-lg font-semibold mb-4">Search Property</h3>
                            <div className="relative">
                                <input
                                    type="search"
                                    placeholder="Search"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Search className="w-5 h-5 text-gray-400" />
                                </span>
                            </div>
                        </div>

                        {/* Kontakt info boks */}
                        <div className="bg-[#162A41] text-white p-8 rounded-lg">
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold mb-2">Find The Best</h3>
                                <h4 className="text-xl mb-2">Property</h4>
                                <p className="mb-6">For Rent Or Buy</p>
                                
                                <div className="mb-4">
                                    <p className="text-sm">Call Us Now</p>
                                    <p className="text-xl font-bold">+00 123 456 789</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 