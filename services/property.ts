const BASE_URL = 'https://dinmaegler.onrender.com'
const CACHE_TIME = 5 * 60 * 1000 // 5 minutter

// Cache objekt
const cache = {
    properties: new Map<string, { data: any; timestamp: number }>(),
}

export interface Property {
    id: string;
    title: string;
    address1: string;
    address2?: string;
    price: number;
    livingspace: number;
    lotsize: number;
    rooms: number;
    built: number;
    remodel?: number;
    energylabel: string;
    basement?: string;
    description: string;
    images: Array<{
        url: string;
        alt?: string;
    }>;
    agent: {
        name: string;
        title: string;
        image: {
            url: string;
        };
        phone: string;
        email: string;
    };
    gross: number;
    netto: number;
    payment: number;
}

// Hjælpefunktion til at validere billede URL
export function getValidImageUrl(url: string | null | undefined, fallback: string): string {
    if (!url || url === "") return fallback
    return url
}

// Hjælpefunktion til at validere property data
export function validateProperty(property: any): Property {
    // Sikrer at images er et array og har korrekte felter
    const validatedImages = Array.isArray(property.images) 
        ? property.images.map((img: any) => ({
            url: img?.url || null,
            alt: img?.alt || `${property.title} - ${property.address}`
        }))
        : []

    // Sikrer at agent har alle nødvendige felter
    const validatedAgent = {
        name: property.agent?.name || 'Unavailable',
        title: property.agent?.title || 'Ejendomsmægler',
        email: property.agent?.email || '',
        phone: property.agent?.phone || '',
        image: property.agent?.image || null
    }

    return {
        id: property.id || '',
        title: property.title || '',
        address1: property.address1 || '',
        address2: property.address2 || '',
        price: property.price || 0,
        livingspace: property.livingspace || 0,
        lotsize: property.lotsize || 0,
        rooms: property.rooms || 0,
        built: property.built || 0,
        remodel: property.remodel || 0,
        energylabel: property.energylabel || '',
        basement: property.basement || '',
        description: property.description || '',
        images: validatedImages,
        agent: validatedAgent,
        gross: property.gross || 0,
        netto: property.netto || 0,
        payment: property.payment || 0,
    }
}

export async function getProperties(): Promise<Property[]> {
    // Check cache
    const cached = cache.properties.get('all')
    if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
        return cached.data.map(validateProperty)
    }

    const response = await fetch(`${BASE_URL}/homes`)
    if (!response.ok) throw new Error('Kunne ikke hente boliger')
    
    const rawData = await response.json()
    const validatedData = rawData.map(validateProperty)
    
    // Gem i cache
    cache.properties.set('all', { 
        data: validatedData, 
        timestamp: Date.now() 
    })
    
    return validatedData
}

export async function getProperty(id: string): Promise<Property | null> {
    // Check cache først
    const cached = cache.properties.get(id)
    if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
        return validateProperty(cached.data)
    }

    try {
        const response = await fetch(`${BASE_URL}/homes/${id}`)
        if (!response.ok) {
            if (response.status === 404) {
                return null
            }
            throw new Error('Kunne ikke hente bolig')
        }

        const rawData = await response.json()
        const validatedData = validateProperty(rawData)
        
        // Gem i cache
        cache.properties.set(id, { 
            data: validatedData, 
            timestamp: Date.now() 
        })
        
        return validatedData
    } catch (error) {
        console.error('Error fetching property:', error)
        throw error
    }
}

export async function getPropertiesByType(type: string): Promise<Property[]> {
    const response = await fetch(`${BASE_URL}/homes?type=${type}`)
    if (!response.ok) throw new Error('Kunne ikke hente boliger af denne type')
    const rawData = await response.json()
    return rawData.map(validateProperty)
} 