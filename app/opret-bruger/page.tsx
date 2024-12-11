'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SignupData {
    username: string
    email: string
    password: string
}

async function signup(data: SignupData) {
    const response = await fetch('https://dinmaegler.onrender.com/auth/local/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
        }),
    })

    if (!response.ok) {
        throw new Error('Kunne ikke oprette bruger')
    }

    return response.json()
}

export default function SignupPage() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords matcher ikke')
            return
        }

        setLoading(true)

        try {
            await signup({
                username: fullName,
                email,
                password,
            })
            router.push('/login?signup=success')
        } catch (error) {
            setError('Der skete en fejl ved oprettelse af bruger')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero sektion */}
            <div className="relative h-[200px] w-full bg-[#162A41]">
                <div className="absolute inset-0 z-10" />
                <div className="absolute z-20 w-full h-full flex flex-col items-center justify-center text-white">
                    <h1 className="text-3xl font-bold">Account Register</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span>|</span>
                    </div>
                </div>
            </div>

            {/* Signup form */}
            <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Opret bruger hos Din Mægler
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Fulde navn
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Fulde navn"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email adresse
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email adresse"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Bekræft password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Bekræft password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#162A41] text-white py-2 rounded hover:bg-[#2C4460] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Opretter bruger...' : 'Opret bruger'}
                    </button>
                </form>
            </div>
        </div>
    )
} 