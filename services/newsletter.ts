const BASE_URL = 'https://dinmaegler.onrender.com';

interface NewsletterSubscription {
    email: string;
}

export async function subscribeToNewsletter(email: string): Promise<void> {
    try {
        const response = await fetch(`${BASE_URL}/subscribers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error('Kunne ikke tilmelde nyhedsbrev');
        }
    } catch (error) {
        console.error('Fejl ved tilmelding til nyhedsbrev:', error);
        throw error;
    }
} 