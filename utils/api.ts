import { getToken } from '@/services/auth'

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = getToken()

    if (!token) {
        throw new Error('Bruger er ikke logget ind')
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    }

    const response = await fetch(url, {
        ...options,
        headers,
    })

    if (response.status === 401) {
        // Token er udløbet eller ugyldig
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
        throw new Error('Session udløbet - log venligst ind igen')
    }

    return response
} 