const BASE_URL = 'https://dinmaegler.onrender.com';

const homeCache = new Map()

export interface Home {
    id: number;
    title: string;
    address: string;
    type: string;
    price: number;
    rooms: number;
    size: number;
    energyLabel: string;
    images: {
        url: string;
        alternativeText: string;
    }[];
}

export async function getHomes(): Promise<Home[]> {
    const response = await fetch(`${BASE_URL}/homes`);
    if (!response.ok) throw new Error('Kunne ikke hente boliger');
    return response.json();
}

export async function getHome(id: string) {
    // Check cache først
    if (homeCache.has(id)) {
        return homeCache.get(id)
    }

    try {
        const response = await fetch(`${BASE_URL}/homes/${id}`)
        if (!response.ok) throw new Error('Kunne ikke hente bolig')
        const data = await response.json()
        
        // Gem i cache
        homeCache.set(id, data)
        return data
    } catch (error) {
        console.error(`Fejl ved hentning af bolig ${id}:`, error)
        throw error
    }
}

export async function getHomesInPriceRange(minPrice: number, maxPrice: number): Promise<Home[]> {
    const response = await fetch(
        `${BASE_URL}/homes?price_gte=${minPrice}&price_lte=${maxPrice}`
    );
    if (!response.ok) throw new Error('Kunne ikke hente boliger i prisinterval');
    return response.json();
}

export async function getHomesByType(type: string): Promise<Home[]> {
    const response = await fetch(`${BASE_URL}/homes?type=${type}`);
    if (!response.ok) throw new Error('Kunne ikke hente boliger af denne type');
    return response.json();
}

export async function getHomesCount(): Promise<number> {
    const response = await fetch(`${BASE_URL}/homes/count`);
    if (!response.ok) throw new Error('Kunne ikke hente antal boliger');
    return response.json();
} 