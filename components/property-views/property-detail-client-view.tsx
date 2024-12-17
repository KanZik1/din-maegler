'use client'

import Image from 'next/image'
import type { Property } from '@/services/property'

interface PropertyDetailClientViewProps {
    property: Property
}

export function PropertyDetailClientView({ property }: PropertyDetailClientViewProps) {
    // Hjælpefunktion til konsistent talformatering
    const formatNumber = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    return (
        <main className="flex flex-col justify-center items-center mb-[10rem]">
            <div className="w-full h-[45rem] relative">
                <Image 
                    src={property.images[0].url}
                    alt="house image"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex items-center justify-center my-[1rem]">
                <div className="border-b-[0.01rem] border-[#D3DEE8] w-[75rem] flex justify-between items-center pb-5 mt-8 text-[#162A41]">
                    <address className="flex flex-col font-semibold text-[1.2rem]">
                        <span>{property.address1}</span>
                        <span>{property.address2}</span>
                    </address>
                    <div className="flex w-[25%] justify-evenly items-center">
                        {/* Ikoner fjernet midlertidigt */}
                    </div>
                    <span className="font-semibold text-[2rem]">Kr. {formatNumber(property.price)}</span>
                </div>
            </div>

            <div className="flex justify-between w-[75rem]">
                <div className="flex flex-col w-[25%]">
                    <div className="flex justify-between">
                        <span className="font-semibold">Sagsnummer:</span>
                        <span className="w-[35%]">1234567898</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Boligareal:</span>
                        <span className="w-[35%]">{property.livingspace} m²</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Grundareal:</span>
                        <span className="w-[35%]">{property.lotsize} m²</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Rum/værelser:</span>
                        <span className="w-[35%]">{property.rooms}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Antal Plan:</span>
                        <span className="w-[35%]">-</span>
                    </div>
                </div>

                <div className="flex flex-col w-[25%]">
                    <div className="flex justify-between">
                        <span className="font-semibold">Kælder:</span>
                        <span className="w-[35%]">{property.basement || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Byggeår:</span>
                        <span className="w-[35%]">{property.built}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Ombygget:</span>
                        <span className="w-[35%]">{property.remodel}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Energimærke:</span>
                        <span className="w-[35%]">{property.energylabel}</span>
                    </div>
                </div>

                <div className="flex flex-col w-[20%]">
                    <div className="flex justify-between">
                        <span className="font-semibold">Udbetaling:</span>
                        <span className="w-[35%]">Kr. {formatNumber(property.price)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Brutto ex ejerudgift:</span>
                        <span className="w-[35%]">Kr. {formatNumber(property.gross)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Netto ex ejerudgift:</span>
                        <span className="w-[35%]">Kr. {formatNumber(property.netto)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Ejerudgifter:</span>
                        <span className="w-[35%]">Kr. {formatNumber(property.payment)}</span>
                    </div>
                </div>
            </div>

            <section className="w-[79%] flex justify-items-center mt-[3rem]">
                <div className="w-[60%] mr-[3rem]">
                    <h3 className="font-semibold text-[1.4rem] mb-[1rem]">Beskrivelse</h3>
                    <p className="w-[100%]">{property.description}</p>
                </div>
                <div className="w-[80%]">
                    <h3 className="font-semibold text-[1.4rem] mb-[1rem]">Ansvarlige mægler</h3>
                    <div>
                        <article className="border-[#D3DEE8] border-[1.95px] flex p-[2rem] w-full">
                            <div className="relative w-[15rem] h-[15rem]">
                                <Image 
                                    src={property.agent.image.url}
                                    alt={property.agent.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="w-[50%] ml-[1rem]">
                                <h2 className="font-semibold text-[1.3rem]">{property.agent.name}</h2>
                                <p className="text-[#7B7B7B]">{property.agent.title}</p>
                                <div className="border-b-[2px] border-[#D3DEE8] w-[3rem] my-[1rem]"></div>
                                <address className="not-italic">
                                    <div className="flex items-center">
                                        <a className="hover:text-orange-400" href={`tel:${property.agent.phone}`}>{property.agent.phone}</a>
                                    </div>
                                    <div className="flex items-center mt-[0.8rem]">
                                        <a className="hover:text-orange-400" href={`mailto:${property.agent.email}`}>{property.agent.email}</a>
                                    </div>
                                </address>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    )
} 