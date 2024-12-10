const BASE_URL = 'https://dinmaegler.onrender.com';

interface Agent {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image: string;
    title: string;
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