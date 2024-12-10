export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('jwt'); // eller hvor du gemmer din token

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    };

    return fetch(url, {
        ...options,
        headers,
    });
} 