import Link from "next/link"
import { Mail, Phone } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full bg-[#1B2A4E] text-white py-1">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link
            href="mailto:4000@dynamicejr.com"
            className="flex items-center hover:text-gray-200 text-sm"
          >
            <Mail className="h-4 w-4 mr-2" />
            <span>4000@dynamicejr.com</span>
          </Link>
          <Link
            href="tel:+4570704000"
            className="flex items-center hover:text-gray-200 text-sm"
          >
            <Phone className="h-4 w-4 mr-2" />
            <span>+45 7070 4000</span>
          </Link>
        </div>
        <Link
          href="/login"
          className="text-sm hover:text-gray-200"
        >
          <span>Log ind</span>
        </Link>
      </div>
    </header>
  )
}

