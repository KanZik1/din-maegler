'use client';

import { getAgents } from '@/services/agents';
import { useEffect, useState } from 'react';
import { Mail, Linkedin } from 'lucide-react';
import NextImage from 'next/image';
import Link from 'next/link'

interface Agent {
    name: string;
    title: string;
    phone: string;
    email: string;
    image: {
        url: string;
    };
}

export default function TeamSection() {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const fetchAgents = async () => {
            try {
                const data = await getAgents();
                // Cast to unknown first to avoid type error
                setAgents((data as unknown) as Agent[]);
            } catch (error) {
                console.error('Fejl ved indlæsning af agents:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);

    // Undgå hydration mismatch ved at vente med at rendere indtil component er mounted
    if (!mounted) return null;

    if (loading) {
        return <div className="text-center py-10">Indlæser...</div>;
    }

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {agents?.slice(0, 3).map((agent, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden text-center group">
                            <div className="relative w-full aspect-[4/3]">
                                {agent.image?.url && (
                                    <NextImage
                                        src={agent.image.url}
                                        alt={agent.name || ''}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover"
                                        priority
                                    />
                                )}
                            </div>
                            <div className="p-6 border border-gray-100">
                                <h3 className="text-lg font-semibold text-[#162A41]">
                                    {agent.name}
                                </h3>
                                <p className="text-gray-600 text-sm mt-1">
                                    {agent.title}
                                </p>
                                <div className="flex justify-center space-x-4 mt-4">
                                    <a
                                        href={`mailto:${agent.email}`}
                                        className="text-gray-400 hover:text-[#162A41] transition-colors"
                                        aria-label="Send email"
                                    >
                                        <Mail size={20} />
                                    </a>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-[#162A41] transition-colors"
                                        aria-label="LinkedIn profil"
                                    >
                                        <Linkedin size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    
                    <Link href="/maeglere">
                        <button className="bg-[#162A41] text-white px-8 py-3 rounded hover:bg-[#2C4460] transition-colors">
                            Se alle mæglere
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}