'use client'

import { isAuthenticated, logout } from '@/services/auth'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'

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

  if (!mounted) {
    return (
      <header className="bg-white py-4">
        <div className="container mx-auto px-16 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a href="mailto:4000@dynamicweb.com" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <Image
                src="/icons/email.png"
                alt="Email"
                width={20}
                height={20}
              />
              4000@dynamicweb.com
            </a>
            <a href="tel:+4570704000" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <Image
                src="/icons/phone.png"
                alt="Phone"
                width={20}
                height={20}
              />
              +45 7070 4000
            </a>
          </div>
          <div>
            <a href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              Log ind
            </a>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white py-4">
      <div className="container mx-auto px-16 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <a href="mailto:4000@dynamicweb.com" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <Image
              src="/icons/email.png"
              alt="Email"
              width={20}
              height={20}
            />
            4000@dynamicweb.com
          </a>
          <a href="tel:+4570704000" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <Image
              src="/icons/phone.png"
              alt="Phone"
              width={20}
              height={20}
            />
            +45 7070 4000
          </a>
        </div>
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Log ud
            </button>
          ) : (
            <a href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              Log ind
            </a>
          )}
        </div>
      </div>
    </header>
  )
}

