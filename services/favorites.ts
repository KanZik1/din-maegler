import { getToken, getUser } from '@/services/auth';
const BASE_URL = 'https://dinmaegler.onrender.com';

export async function getFavorites(): Promise<string[]> {
    const token = getToken();
    const user = getUser();
    if (!token || !user) return [];

    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Kunne ikke hente favoritter');
        }

        const data = await response.json();
        return data.homes || [];
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
}

export async function toggleFavorite(homeId: string): Promise<void> {
    const token = getToken();
    const user = getUser();
    if (!token || !user) throw new Error('Ikke logget ind');

    try {
        // Hent nuværende favoritter
        const currentFavorites = await getFavorites();

        // Tjek om boligen allerede er favorit
        const isFavorite = currentFavorites.includes(homeId);

        // Opdater listen af favoritter
        const newFavorites = isFavorite
            ? currentFavorites.filter(id => id !== homeId)
            : [...currentFavorites, homeId];

        // Send opdateret liste til API'en
        const response = await fetch(`${BASE_URL}/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                homes: newFavorites
            })
        });

        if (!response.ok) {
            throw new Error('Kunne ikke opdatere favoritter');
        }
    } catch (error) {
        console.error('Toggle favorite error:', error);
        throw error;
    }
}

export async function checkIsFavorite(homeId: string): Promise<{ isFavorite: boolean }> {
    try {
        const favorites = await getFavorites();
        return { isFavorite: favorites.includes(homeId) };
    } catch (error) {
        console.error('Check favorite error:', error);
        return { isFavorite: false };
    }
} 