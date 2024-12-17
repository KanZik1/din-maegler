'use client'

import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function KontaktPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero sektion */}
            <div className="relative h-[300px] w-full">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <Image
                    src="/Herobanner.png"
                    alt="Kontakt os"
                    fill
                    className="object-cover"
                />
                <h1 className="absolute z-20 text-white text-4xl font-bold text-center w-full top-1/2 transform -translate-y-1/2">
                    Kontakt os
                </h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-semibold text-[#162A41] mb-4">
                        Vi sidder klar til at besvare dine spørgsmål
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Der kan opstå tvivl om mange ting når vi taler om boligkøb og salg. Vores medarbejdere sidder altid klar til at svare på dine spørgsmål.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Venstre side - Kontaktformular */}
                    <div>
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-2">Navn</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-200 rounded"
                                        placeholder="Indtast dit navn"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 border border-gray-200 rounded"
                                        placeholder="Indtast din email"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Emne</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-200 rounded"
                                    placeholder="Indtast emne"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Besked</label>
                                <textarea
                                    rows={6}
                                    className="w-full px-4 py-2 border border-gray-200 rounded resize-none"
                                    placeholder="Indtast din besked"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="consent" className="rounded border-gray-300" />
                                <label htmlFor="consent" className="text-sm text-gray-600">
                                    Ja tak, jeg vil gerne modtage Din Mæglers nyhedsbrev
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#162A41] text-white px-8 py-2 rounded text-sm hover:bg-[#2C4460] transition-colors"
                            >
                                Send besked
                            </button>
                        </form>
                    </div>

                    {/* Højre side - Kontaktinfo */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#162A41] p-3 rounded-full">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Ring til os</h3>
                                <p className="text-gray-600">+45 7070 4000</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-[#162A41] p-3 rounded-full">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Send en mail</h3>
                                <p className="text-gray-600">4000@dinmaegler.dk</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-[#162A41] p-3 rounded-full">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Besøg butikken</h3>
                                <p className="text-gray-600">Stændertorvet 78, 4000 Roskilde</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Google Maps */}
                <div className="mt-16 h-[400px] w-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2259.6340045187837!2d12.077821377160627!3d55.64163997325836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46525fc995012f91%3A0x8c3b0041b9a23f21!2sSt%C3%A6ndertorvet%2078%2C%204000%20Roskilde!5e0!3m2!1sen!2sdk!4v1708426095171!5m2!1sen!2sdk"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    )
}
