import { fetchWithAuth } from '@/utils/api';
const BASE_URL = 'https://dinmaegler.onrender.com';

interface User {
    id: number
    username: string
    email: string
}

export async function login(email: string, password: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email, password }),
    })

    if (!response.ok) throw new Error('Login fejlede')
    
    const data = await response.json()
    localStorage.setItem('token', data.jwt)
    localStorage.setItem('user', JSON.stringify(data.user))
}

export function isAuthenticated(): boolean {
    return !!getToken()
}

export function getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
}

export function getUser(): User | null {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
}

export function logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
} 