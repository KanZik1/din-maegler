import { Badge } from "./ui/badge"
import Image from "next/image"

interface PropertyDetails {
    id: string
    title: string
    address: string
    type: string
    area: string
    price: number
    rooms: number
    squareMeters: number
    imageUrl: string
    badgeColor: "default" | "secondary" | "destructive" | "green"
    badgeLetter: string
}

export function PropertyCard({
    title,
    address,
    type,
    area,
    price,
    rooms,
    squareMeters,
    imageUrl,
    badgeColor = "default",
    badgeLetter,
}: PropertyDetails) {
    return (
        <div className="group overflow-hidden rounded-lg border bg-white shadow-sm">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src="/House1.png"
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-600">{address}</p>
                <div className="mt-4 flex items-center gap-2">
                    <div>
                        <span className="font-semibold">{type}</span>
                        <span className="text-sm text-gray-600"> · {area}</span>
                    </div>
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <Badge variant={badgeColor} className="flex items-center gap-1">
                        <span className="font-bold">{badgeLetter}</span>
                        <span className="ml-1">
                            {rooms} værelser · {squareMeters} m²
                        </span>
                    </Badge>
                    <div className="ml-auto font-semibold">
                        Kr. {price.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    )
}

