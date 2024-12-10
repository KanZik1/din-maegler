const BASE_URL = 'https://dinmaegler.onrender.com';

interface Agent {
    id: number;
    name: string;
    title: string;
    phone: string;
    email: string;
    image: {
        url: string;
        formats: {
            thumbnail: {
                url: string;
            }
        }
    };
    description?: string;
}

export async function getAgents(): Promise<Agent[]> {
    try {
        const response = await fetch(`${BASE_URL}/agents`);
        if (!response.ok) {
            throw new Error('Kunne ikke hente agents data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fejl ved hentning af agents:', error);
        throw error;
    }
}

export async function getAgent(id: string): Promise<Agent> {
    try {
        const response = await fetch(`${BASE_URL}/agents/${id}`);
        if (!response.ok) {
            throw new Error('Kunne ikke hente agent data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fejl ved hentning af agent:', error);
        throw error;
    }
}