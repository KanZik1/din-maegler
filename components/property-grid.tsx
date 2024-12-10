import { PropertyCard } from "./property-card"

const properties = [
    {
        id: "1",
        title: "Klosterengen 234",
        address: "4000 Roskilde",
        type: "Villa",
        area: "Ejerudgift: 4.567 kr.",
        price: 4567890,
        rooms: 4,
        squareMeters: 156,
        imageUrl: "/House1.png",
        badgeColor: "green" as const,
        badgeLetter: "A"
    },
    {
        id: "2",
        title: "Lønbjergparken 22 · Vindinge",
        address: "4000 Roskilde",
        type: "Villa",
        area: "Ejerudgift: 4.567 kr.",
        price: 4567890,
        rooms: 4,
        squareMeters: 156,
        imageUrl: "/House2.png",
        badgeColor: "secondary" as const,
        badgeLetter: "B"
    },
    {
        id: "fjordvege-234",
        title: "Fjordvege 234 · Gevninge",
        address: "4000 Roskilde",
        type: "Villa",
        area: "Ejerudgift: 4.567 kr.",
        price: 4567890,
        rooms: 4,
        squareMeters: 156,
        imageUrl: "/House3.png",
        badgeColor: "default" as const,
        badgeLetter: "C"
    },
    {
        id: "solvejvej-123",
        title: "Solvejvej 123 · Veddelev",
        address: "4000 Roskilde",
        type: "Villa",
        area: "Ejerudgift: 4.567 kr.",
        price: 4567890,
        rooms: 4,
        squareMeters: 156,
        imageUrl: "/House4.png",
        badgeColor: "destructive" as const,
        badgeLetter: "D"
    },
    {
        id: "5",
        title: "Himmelev Bygade 42",
        address: "4000 Roskilde",
        type: "Villa",
        area: "Ejerudgift: 4.567 kr.",
        price: 4567890,
        rooms: 4,
        squareMeters: 156,
        imageUrl: "/House1.png",
        badgeColor: "default" as const,
        badgeLetter: "C"
    },
    {
        id: "6",
        title: "Sønderlundsvej 58",
        address: "4000 Roskilde",
        type: "Villa",
        area: "Ejerudgift: 4.567 kr.",
        price: 4567890,
        rooms: 4,
        squareMeters: 156,
        imageUrl: "/House2.png",
        badgeColor: "secondary" as const,
        badgeLetter: "B"
    },
    {
        id: "7",
        title: "Sønderlundsvej 58",
        address: "4000 Roskilde",
        type: "Villa",
        area: "Ejerudgift: 4.567 kr.",
        price: 4567890,
        rooms: 4,
        squareMeters: 156,
        imageUrl: "/House2.png",
        badgeColor: "secondary" as const,
        badgeLetter: "B"
    },
    {
        id: "8",
        title: "Sønderlundsvej 58",
        address: "4000 Roskilde",
        type: "Villa",
        area: "Ejerudgift: 4.567 kr.",
        price: 4567890,
        rooms: 4,
        squareMeters: 156,
        imageUrl: "/House2.png",
        badgeColor: "secondary" as const,
        badgeLetter: "B"
    },

    
]

interface PropertyGridProps {
    limit?: number;
    showTitle?: boolean;
    title?: string;
    description?: string;
}

export function PropertyGrid({ 
    limit = 4, 
    showTitle = true,
    title = "Udvalgte Boliger",
    description = "There are many variations of passages of Lorem Ipsum available but the in majority have suffered alteration in some"
}: PropertyGridProps) {
    return (
        <div className="mx-auto max-w-7xl px-4 py-12">
            {showTitle && (
                <div className="text-center">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="mt-2 text-gray-600">
                        {description}
                    </p>
                </div>
            )}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {properties.slice(0, limit).map((property) => (
                    <PropertyCard key={property.id} {...property} />
                ))}
            </div>
            <div className="mt-12 text-center">
                <button className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90">
                    Se alle boliger
                </button>
            </div>
        </div>
    )
}

