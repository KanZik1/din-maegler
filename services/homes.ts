const BASE_URL = 'https://dinmaegler.onrender.com';

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

export async function getHome(id: string | number) {
    console.log('Forsøger at hente bolig med ID:', id);
    try {
        // Konverter ID til string og fjern eventuelle whitespace
        const cleanId = String(id).trim();
        console.log('Renset ID:', cleanId);

        const url = `${BASE_URL}/homes/${cleanId}`;
        console.log('Fetching fra URL:', url);

        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API fejl status:', response.status);
            console.error('API fejl tekst:', errorText);
            throw new Error(`Kunne ikke hente bolig (${response.status})`);
        }

        const data = await response.json();

        // Konverter data til det korrekte format
        return {
            id: data.id,
            title: data.title,
            address: data.address,
            type: data.type,
            price: data.price,
            rooms: data.rooms,
            size: data.size,
            energyLabel: data.energyLabel,
            images: data.images || []
        };
    } catch (error) {
        console.error('Detaljeret fejl ved hentning af bolig:', error);
        throw new Error('Kunne ikke hente bolig');
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