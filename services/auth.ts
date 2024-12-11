import { fetchWithAuth } from '@/utils/api';
const BASE_URL = 'https://dinmaegler.onrender.com';

interface AuthResponse {
    jwt: string;
    user: {
        id: number;
        username: string;
        email: string;
    }
}

export interface AuthState {
    token: string | null;
    user: {
        id: number;
        username: string;
        email: string;
    } | null;
}

// Login
export async function login(email: string, password: string): Promise<void> {
    try {
        console.log('Forsøger at logge ind med:', { email })

        const response = await fetch(`${BASE_URL}/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier: email,
                password,
            }),
        })

        console.log('Response status:', response.status)

        if (!response.ok) {
            const errorData = await response.text()
            console.error('Login error response:', errorData)
            throw new Error('Login fejlede')
        }

        const data = await response.json()
        console.log('Login successful, token modtaget')
        localStorage.setItem('token', data.jwt)
        localStorage.setItem('user', JSON.stringify(data.user))
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}

// Register
export async function register(username: string, email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/local/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message?.[0]?.messages?.[0]?.message || 'Registrering fejlede');
    }

    const data = await response.json();
    return data;
}

// Tjek om bruger er logget ind
export function isAuthenticated(): boolean {
    return !!getToken();
}

// Hent token
export function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
}

// Hent bruger
export function getUser(): { id: number; username: string; email: string } | null {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
}

// Logout
export function logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
} 