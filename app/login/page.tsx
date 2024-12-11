'use client'

import { login } from '@/services/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            await login(email, password)
            router.push('/mine-favoritter')
        } catch (error) {
            setError('Forkert email eller password')
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="relative h-[300px] w-full">
                <div className="absolute inset-0 bg-[#162841]" />
                <h1 className="absolute text-white text-4xl font-bold text-center w-full top-1/2 transform -translate-y-1/2">
                    Account Login
                </h1>
            </div>

            <div className="max-w-md mx-auto mt-8 p-6">
                <h2 className="text-2xl font-semibold mb-6 text-center">Log ind på din konto</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#162841] text-white py-2 rounded hover:bg-[#1e3557]"
                    >
                        Log ind
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Har du ikke en konto?{' '}
                        <a href="/opret" className="text-blue-600 hover:underline">
                            Opret bruger
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
} 