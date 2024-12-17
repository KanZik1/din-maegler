'use client'

import Image from "next/image"
import Link from "next/link"
import { FavoriteButton } from './ClientWrapper'

const DEFAULT_IMAGE = '/placeholder.png'

export function PropertyCard(props: PropertyCardProps) {
    const imageUrl = props.images?.[0]?.url 
        ? props.images[0].url.startsWith('http') 
            ? props.images[0].url 
            : `https://dinmaegler.onrender.com${props.images[0].url}`
        : DEFAULT_IMAGE

    return (
        <Link href={`/boliger/${props.id}`}>
            <div className="bg-white rounded-lg overflow-hidden">
                {/* Billede container */}
                <div className="relative w-full h-[280px]">
                    <Image
                        src={imageUrl}
                        alt={props.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                    />
                    <FavoriteButton propertyId={props.id} />
                </div>

                {/* Bolig information */}
                <div className="p-4">
                    {/* Ejerudgift */}
                    <div className="text-sm text-gray-600 mb-2">
                        • Ejerudgift: {props.area}
                    </div>

                    {/* Bolig detaljer */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {props.rooms} værelser • m²
                        </div>
                    </div>

                    {/* Pris */}
                    <div className="text-right font-bold">
                        Kr. {props.price.toLocaleString('da-DK')}
                    </div>
                </div>
            </div>
        </Link>
    )
}

