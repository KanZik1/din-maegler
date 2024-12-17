'use client'

import { isAuthenticated, logout } from '@/services/auth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setIsLoggedIn(isAuthenticated())
        setMounted(true)
    }, [])

    const handleLogout = () => {
        logout()
        setIsLoggedIn(false)
        router.push('/login')
    }

    if (!mounted) return null

    return (
        <header className="bg-[#162A41] py-2 text-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Venstre side - kontaktinfo */}
                    <div className="flex items-center space-x-6">
                        <a 
                            href="mailto:4000@dynamicweb.com" 
                            className="flex items-center gap-2 hover:text-gray-200"
                        >
                            <Image
                                src="/icons/Mail.png"
                                alt="Email ikon"
                                width={16}
                                height={16}
                            />
                            <span className="text-sm">4000@dynamicweb.com</span>
                        </a>
                        <a 
                            href="tel:+4570704000" 
                            className="flex items-center gap-2 hover:text-gray-200"
                        >
                            <Image
                                src="/icons/Phone.png"
                                alt="Telefon ikon"
                                width={16}
                                height={16}
                            />
                            <span className="text-sm">+45 7070 4000</span>
                        </a>
                    </div>

                    {/* Højre side - login/logout */}
                    <div>
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="text-sm hover:text-gray-200 flex items-center gap-2"
                            >
                                <Image
                                    src="/icons/User.png"
                                    alt="Bruger ikon"
                                    width={16}
                                    height={16}
                                />
                                <span>Log ud</span>
                            </button>
                        ) : (
                            <Link 
                                href="/login" 
                                className="text-sm hover:text-gray-200 flex items-center gap-2"
                            >
                                <Image
                                    src="/icons/User.png"
                                    alt="Bruger ikon"
                                    width={16}
                                    height={16}
                                />
                                <span>Log ind</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

