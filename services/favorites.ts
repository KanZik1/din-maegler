import { getToken } from '@/services/auth';
const BASE_URL = 'https://dinmaegler.onrender.com';

interface FavoriteResponse {
    data: Array<{
        id: number
        attributes: {
            home: {
                data: {
                    id: number
                }
            }
        }
    }>
}

export async function getFavorites(): Promise<string[]> {
    const token = getToken();
    if (!token) return [];

    try {
        const response = await fetch(`${BASE_URL}/favorites`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error('Favorites error status:', response.status);
            const errorText = await response.text();
            console.error('Favorites error:', errorText);
            throw new Error('Kunne ikke hente favoritter');
        }

        const data = await response.json();
        console.log('Favorit data modtaget:', data);

        const favoriteIds = data.data?.map((fav: any) =>
            fav.attributes?.home?.data?.id?.toString()
        ).filter(Boolean) || [];

        console.log('Behandlede favorit IDs:', favoriteIds);
        return favoriteIds;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
}

export async function toggleFavorite(homeId: number): Promise<void> {
    const token = getToken();
    if (!token) throw new Error('Ikke logget ind');

    try {
        const { isFavorite, favoriteId } = await checkIsFavorite(homeId);

        if (isFavorite && favoriteId) {
            // Fjern favorit
            const response = await fetch(`${BASE_URL}/favorites/${favoriteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Kunne ikke fjerne favorit');
        } else {
            // Tilføj favorit
            const response = await fetch(`${BASE_URL}/favorites`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        home: homeId
                    }
                })
            });

            if (!response.ok) throw new Error('Kunne ikke tilføje favorit');
        }
    } catch (error) {
        console.error('Toggle favorite error:', error);
        throw error;
    }
}

export async function checkIsFavorite(homeId: number): Promise<{ isFavorite: boolean, favoriteId?: string }> {
    const token = getToken();
    if (!token) return { isFavorite: false };

    try {
        const response = await fetch(`${BASE_URL}/favorites`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Kunne ikke tjekke favorit status');
        }

        const data = await response.json();
        const existingFavorite = data.data?.find((fav: any) =>
            fav.attributes?.home?.data?.id === homeId
        );

        return {
            isFavorite: !!existingFavorite,
            favoriteId: existingFavorite?.id?.toString()
        };
    } catch (error) {
        console.error('Check favorite error:', error);
        return { isFavorite: false };
    }
} 