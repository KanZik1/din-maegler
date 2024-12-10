'use client'

import { useEffect, useState } from 'react'
import { getAgents } from '@/services/agents'
import { Mail, Linkedin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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

function AgentCard({ agent }: { agent: Agent }) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {/* Billede sektion - klikbar */}
            <Link href={`/maeglere/${agent.id}`}>
                <div className="relative aspect-[4/3]">
                    <Image
                        src={agent.image.url}
                        alt={agent.name}
                        fill
                        className="object-cover"
                    />
                </div>
            </Link>

            {/* Info sektion */}
            <div className="p-6 text-center">
                {/* Navn og titel - klikbar */}
                <Link href={`/maeglere/${agent.id}`}>
                    <h3 className="text-lg font-semibold text-[#162A41] hover:text-[#2C4460]">
                        {agent.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                        {agent.title}
                    </p>
                </Link>

                {/* Kontakt ikoner */}
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            window.location.href = `mailto:${agent.email}`
                        }}
                        className="text-gray-400 hover:text-[#162A41] transition-colors"
                        aria-label="Send email"
                    >
                        <Mail size={20} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            // Håndter LinkedIn klik
                        }}
                        className="text-gray-400 hover:text-[#162A41] transition-colors"
                        aria-label="LinkedIn profil"
                    >
                        <Linkedin size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function MaeglerePage() {
    const [agents, setAgents] = useState<Agent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const data = await getAgents()
                console.log('Fetched agents:', data)
                setAgents(data)
            } catch (error) {
                console.error('Detaljeret fejl:', error)
                setError('Kunne ikke hente mæglere')
            } finally {
                setLoading(false)
            }
        }

        fetchAgents()
    }, [])

    if (error) {
        return <div className="text-center py-10 text-red-600">{error}</div>
    }

    if (loading) {
        return <div className="text-center py-10">Indlæser mæglere...</div>
    }

    if (!agents || agents.length === 0) {
        return <div className="text-center py-10">Ingen mæglere fundet</div>
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero sektion */}
            <div className="relative h-[300px] w-full">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <Image
                    src="/maegler-hero.jpg"
                    alt="Mæglere hero"
                    fill
                    className="object-cover"
                />
                <h1 className="absolute z-20 text-white text-4xl font-bold text-center w-full top-1/2 transform -translate-y-1/2">
                    Medarbejdere i Roskilde
                </h1>
            </div>

            {/* Mægler grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {agents.map((agent) => (
                        <AgentCard key={agent.id} agent={agent} />
                    ))}
                </div>
            </div>
        </div>
    )
} 